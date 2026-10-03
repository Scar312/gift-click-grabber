import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type User = {
  id: string;
  accountId: string;
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  homeAddress?: string;
  avatarPath?: string;
  avatarUrl?: string;
  planId?: string;
  planName?: string;
  planType?: string;
  planStatus?: string;
  planUpdatedAt?: string;
  referralCode: string;
  walletBalance: number;
  balanceActive: boolean;
  referralCount: number;
  accountActivated: boolean;
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountName?: string;
  createdAt: string;
};

export type Referral = {
  id: string;
  accountId: string;
  fullName: string;
  joinedAt: string;
  planName?: string;
  planStatus?: string;
  walletBalance: number;
  balanceActive: boolean;
};

const PHONE_DOMAIN = "@phone.thv.local";
export function isEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }
export function phoneDigits(v: string) {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("0") && d.length === 11) d = "234" + d.slice(1);
  return d;
}
/** Phone accounts sign in with an internal address derived from the number. */
export function loginIdFor(identifier: string) {
  return isEmail(identifier) ? identifier.trim().toLowerCase() : `${phoneDigits(identifier)}${PHONE_DOMAIN}`;
}

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
    .select("account_id, full_name, phone, date_of_birth, home_address, avatar_path, created_at, current_plan_id, current_plan_name, current_plan_type, plan_status, plan_updated_at, referral_code, wallet_balance, balance_active, account_activated, email, bank_name, bank_account_number, bank_account_name")
    .eq("id", user.id)
    .maybeSingle();
  if (profileError || !profile) return null;
  const avatarUrl = profile.avatar_path ? await signedUrl("profile-images", profile.avatar_path) : undefined;
  const { count } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("referred_by", user.id)
    .eq("balance_active", true)
    .gt("wallet_balance", 0);
  return {
    id: user.id,
    accountId: profile.account_id,
    fullName: profile.full_name,
    email: profile.email ?? (user.email?.endsWith(PHONE_DOMAIN) ? "" : user.email ?? ""),
    phone: profile.phone ?? undefined,
    dateOfBirth: profile.date_of_birth ?? undefined,
    homeAddress: profile.home_address ?? undefined,
    avatarPath: profile.avatar_path ?? undefined,
    avatarUrl,
    planId: profile.current_plan_id ?? undefined,
    planName: profile.current_plan_name ?? undefined,
    planType: profile.current_plan_type ?? undefined,
    planStatus: profile.plan_status ?? undefined,
    planUpdatedAt: profile.plan_updated_at ?? undefined,
    referralCode: profile.referral_code ?? profile.account_id.replace("-", ""),
    walletBalance: Number(profile.wallet_balance ?? 0),
    balanceActive: Boolean(profile.balance_active),
    referralCount: count ?? 0,
    accountActivated: Boolean(profile.account_activated),
    bankName: profile.bank_name ?? undefined,
    bankAccountNumber: profile.bank_account_number ?? undefined,
    bankAccountName: profile.bank_account_name ?? undefined,
    createdAt: profile.created_at,
  };
}

export const auth = {
  current: loadCurrentUser,
  async signup(input: { fullName: string; identifier: string; password: string; phone?: string; referralCode?: string }) {
    const byEmail = isEmail(input.identifier);
    const phone = byEmail ? (input.phone ?? "") : input.identifier.trim();
    return supabase.auth.signUp({
      email: loginIdFor(input.identifier),
      password: input.password,
      options: {
        data: {
          full_name: input.fullName,
          phone,
          referral_code: (input.referralCode ?? "").trim(),
          ...(byEmail ? {} : { contact_email: "" }),
        },
      },
    });
  },
  async verifyEmailCode(email: string, token: string) {
    const code = token.replace(/\s+/g, "");
    const types = ["signup", "email", "magiclink"] as const;
    let last = await supabase.auth.verifyOtp({ email, token: code, type: types[0] });
    for (const type of types.slice(1)) {
      if (!last.error) return last;
      last = await supabase.auth.verifyOtp({ email, token: code, type });
    }
    return last;
  },
  async resendCode(email: string) {
    return supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/verify` },
    });
  },
  async login(identifier: string, password: string) {
    return supabase.auth.signInWithPassword({ email: loginIdFor(identifier), password });
  },
  async logout() {
    await supabase.auth.signOut();
  },
  async changePassword(currentPassword: string, newPassword: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) throw new Error("Please sign in again.");
    const { error: checkError } = await supabase.auth.signInWithPassword({ email: user.email, password: currentPassword });
    if (checkError) throw new Error("Your current password is incorrect.");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  },
  async referrals(): Promise<Referral[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const { data, error } = await supabase
      .from("profiles")
      .select("id, account_id, full_name, created_at, current_plan_name, plan_status, wallet_balance, balance_active")
      .eq("referred_by", user.id)
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map((r) => ({
      id: r.id,
      accountId: r.account_id,
      fullName: r.full_name,
      joinedAt: r.created_at,
      planName: r.current_plan_name ?? undefined,
      planStatus: r.plan_status ?? undefined,
      walletBalance: Number(r.wallet_balance ?? 0),
      balanceActive: Boolean(r.balance_active),
    }));
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
  async updateProfile(input: { fullName: string; phone?: string; dateOfBirth?: string; homeAddress?: string; bankName?: string; bankAccountNumber?: string; bankAccountName?: string; avatar?: File }) {
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
    const changes: {
      full_name: string;
      phone: string | null;
      date_of_birth: string | null;
      home_address: string | null;
      bank_name: string | null;
      bank_account_number: string | null;
      bank_account_name: string | null;
      avatar_path?: string;
    } = {
      full_name: input.fullName,
      phone: input.phone || null,
      date_of_birth: input.dateOfBirth || null,
      home_address: input.homeAddress || null,
      bank_name: input.bankName || null,
      bank_account_number: input.bankAccountNumber || null,
      bank_account_name: input.bankAccountName || null,
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
