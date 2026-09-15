import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type User = {
  id: string;
  accountId: string;
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  avatarPath?: string;
  avatarUrl?: string;
  planName?: string;
  planType?: string;
  planStatus?: string;
  planUpdatedAt?: string;
  createdAt: string;
};

export type AuthState = { user: User | null; loading: boolean };

export async function signedUrl(bucket: string, path: string, seconds = 60 * 60) {
  const { data } = await supabase.storage.from(bucket).createSignedUrl(path, seconds);
  return data?.signedUrl;
}

async function loadCurrentUser(): Promise<User | null> {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("account_id, full_name, phone, date_of_birth, avatar_path, created_at, current_plan_name, current_plan_type, plan_status, plan_updated_at")
    .eq("id", user.id)
    .single();
  if (profileError || !profile) return null;
  const avatarUrl = profile.avatar_path ? await signedUrl("profile-images", profile.avatar_path) : undefined;
  return {
    id: user.id,
    accountId: profile.account_id,
    fullName: profile.full_name,
    email: user.email ?? "",
    phone: profile.phone ?? undefined,
    dateOfBirth: profile.date_of_birth ?? undefined,
    avatarPath: profile.avatar_path ?? undefined,
    avatarUrl,
    planName: profile.current_plan_name ?? undefined,
    planType: profile.current_plan_type ?? undefined,
    planStatus: profile.plan_status ?? undefined,
    planUpdatedAt: profile.plan_updated_at ?? undefined,
    createdAt: profile.created_at,
  };
}

export const auth = {
  current: loadCurrentUser,
  async signup(input: { fullName: string; email: string; password: string; phone?: string }) {
    return supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: input.fullName, phone: input.phone ?? "" },
      },
    });
  },
  async verifyEmailCode(email: string, token: string) {
    const code = token.replace(/\s+/g, "");
    const first = await supabase.auth.verifyOtp({ email, token: code, type: "signup" });
    if (!first.error) return first;
    return supabase.auth.verifyOtp({ email, token: code, type: "email" });
  },
  async resendCode(email: string) {
    return supabase.auth.resend({ type: "signup", email, options: { emailRedirectTo: window.location.origin } });
  },
  async login(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },
  async logout() {
    await supabase.auth.signOut();
  },
  async setPlan(input: { planId: string; planName: string; planType: string; status?: string }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Please sign in again.");
    const { error } = await supabase.from("profiles").update({
      current_plan_id: input.planId,
      current_plan_name: input.planName,
      current_plan_type: input.planType,
      plan_status: input.status ?? "Pending confirmation",
      plan_updated_at: new Date().toISOString(),
    }).eq("id", user.id);
    if (error) throw error;
  },
  async updateProfile(input: { fullName: string; phone?: string; dateOfBirth?: string; avatar?: File }) {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Please sign in again.");
    let avatarPath: string | undefined;
    if (input.avatar) {
      if (!input.avatar.type.startsWith("image/")) throw new Error("Please choose an image file.");
      const extension = input.avatar.name.split(".").pop()?.toLowerCase() || "jpg";
      avatarPath = `${user.id}/avatar-${Date.now()}.${extension}`;
      const { error: uploadError } = await supabase.storage.from("profile-images").upload(avatarPath, input.avatar);
      if (uploadError) throw uploadError;
    }
    const changes: { full_name: string; phone: string | null; date_of_birth: string | null; avatar_path?: string } = {
      full_name: input.fullName,
      phone: input.phone || null,
      date_of_birth: input.dateOfBirth || null,
    };
    if (avatarPath) changes.avatar_path = avatarPath;
    const { error } = await supabase.from("profiles").update(changes).eq("id", user.id);
    if (error) throw error;
  },
};

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });
  useEffect(() => {
    let active = true;
    const refresh = async () => {
      const user = await loadCurrentUser();
      if (active) setState({ user, loading: false });
    };
    void refresh();
    const { data: listener } = supabase.auth.onAuthStateChange(() => { void refresh(); });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);
  return state;
}
