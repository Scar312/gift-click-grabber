import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { SiteLayout } from "@/components/brand/SiteLayout";
import { Button } from "@/components/ui/button";
import { auth, useAuth } from "@/lib/auth";
import { Camera, Save, KeyRound, Users } from "lucide-react";

export default function Profile() {
  const { user, loading } = useAuth();
  const [form, setForm] = useState({ fullName: "", phone: "", dateOfBirth: "", homeAddress: "" });
  const [avatar, setAvatar] = useState<File | undefined>();
  const [status, setStatus] = useState("");
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [pwdStatus, setPwdStatus] = useState("");

  useEffect(() => {
    if (user) setForm({
      fullName: user.fullName,
      phone: user.phone ?? "",
      dateOfBirth: user.dateOfBirth ?? "",
      homeAddress: user.homeAddress ?? "",
    });
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

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd.next.length < 6) return setPwdStatus("New password must be at least 6 characters.");
    if (pwd.next !== pwd.confirm) return setPwdStatus("New passwords do not match.");
    setPwdStatus("Updating...");
    try {
      await auth.changePassword(pwd.current, pwd.next);
      setPwd({ current: "", next: "", confirm: "" });
      setPwdStatus("Password updated.");
    } catch (error) {
      setPwdStatus(error instanceof Error ? error.message : "Could not update password.");
    }
  };

  const field = "mt-1.5 w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm text-foreground outline-none focus:border-gold/60";

  return (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
        <h1 className="font-display text-3xl sm:text-5xl">Your <span className="text-gradient-gold">Profile</span></h1>
        <p className="mt-2 font-mono text-sm text-gold">Account #{user.accountId}</p>

        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex-1 rounded-2xl border border-gold/20 bg-gold/5 p-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Users className="h-4 w-4 text-gold" /> Qualified referrals</div>
            <div className="mt-1 font-display text-3xl text-gradient-gold">{user.referralCount}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">Counted after a referral signs up, funds their account and their balance is active.</div>
          </div>
          <div className="flex-1 rounded-2xl border border-border p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Referral code</div>
            <div className="mt-1 font-mono text-lg text-gold">{user.referralCode}</div>
          </div>
        </div>

        <form onSubmit={save} className="mt-6 space-y-5 rounded-2xl border border-gold/15 bg-card/60 p-6 sm:p-8">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-gold"><Camera className="h-5 w-5" /> Choose profile picture<input type="file" accept="image/*" className="hidden" onChange={(e) => setAvatar(e.target.files?.[0])} /></label>
          {avatar && <p className="text-xs text-muted-foreground">{avatar.name}</p>}
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Full Name<input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className={field} /></label>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Email<input disabled value={user.email} className="mt-1.5 w-full rounded-xl border border-border bg-input/20 px-4 py-3 text-sm text-foreground/60" /></label>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} /></label>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Date of Birth<input type="date" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} className={field} /></label>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Home Address<textarea rows={3} value={form.homeAddress} onChange={(e) => setForm({ ...form, homeAddress: e.target.value })} placeholder="Street, city, state" className={field} /></label>
          {status && <p className="text-sm text-muted-foreground">{status}</p>}
          <Button className="w-full rounded-full bg-gradient-gold text-navy-deep"><Save className="mr-2 h-4 w-4" /> Save Profile</Button>
        </form>

        <form onSubmit={savePassword} className="mt-6 space-y-5 rounded-2xl border border-gold/15 bg-card/60 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><KeyRound className="h-4 w-4 text-gold" /> Update password</div>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Current Password<input type="password" required value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} className={field} /></label>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">New Password<input type="password" required minLength={6} value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })} className={field} /></label>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Confirm New Password<input type="password" required minLength={6} value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })} className={field} /></label>
          {pwdStatus && <p className="text-sm text-muted-foreground">{pwdStatus}</p>}
          <Button className="w-full rounded-full border border-gold/40 bg-transparent text-gold hover:bg-gold/10">Update Password</Button>
        </form>
      </section>
    </SiteLayout>
  );
}
