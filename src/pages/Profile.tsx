import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { SiteLayout } from "@/components/brand/SiteLayout";
import { Button } from "@/components/ui/button";
import { auth, useAuth } from "@/lib/auth";
import { Camera, Save } from "lucide-react";

export default function Profile() {
  const { user, loading } = useAuth();
  const [form, setForm] = useState({ fullName: "", phone: "", dateOfBirth: "" });
  const [avatar, setAvatar] = useState<File | undefined>();
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (user) setForm({ fullName: user.fullName, phone: user.phone ?? "", dateOfBirth: user.dateOfBirth ?? "" });
  }, [user]);
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");
    try {
      await auth.updateProfile({ ...form, avatar });
      setStatus("Profile updated.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to update profile.");
    }
  };
  return (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
        <h1 className="font-display text-3xl sm:text-5xl">Your <span className="text-gradient-gold">Profile</span></h1>
        <p className="mt-2 font-mono text-sm text-gold">Account #{user.accountId}</p>
        <form onSubmit={save} className="mt-10 space-y-5 rounded-2xl border border-gold/15 bg-card/60 p-6 sm:p-8">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-gold"><Camera className="h-5 w-5" /> Choose profile picture<input type="file" accept="image/*" className="hidden" onChange={(e) => setAvatar(e.target.files?.[0])} /></label>
          {avatar && <p className="text-xs text-muted-foreground">{avatar.name}</p>}
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Full Name<input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="mt-1.5 w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm text-foreground outline-none" /></label>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Email<input disabled value={user.email} className="mt-1.5 w-full rounded-xl border border-border bg-input/20 px-4 py-3 text-sm text-foreground/60" /></label>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5 w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm text-foreground outline-none" /></label>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Date of Birth<input type="date" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} className="mt-1.5 w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm text-foreground outline-none" /></label>
          {status && <p className="text-sm text-muted-foreground">{status}</p>}
          <Button className="w-full rounded-full bg-gradient-gold text-navy-deep"><Save className="mr-2 h-4 w-4" /> Save Profile</Button>
        </form>
      </section>
    </SiteLayout>
  );
}