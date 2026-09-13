import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Send, Landmark } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

type PaymentChoice = { id: string; name: string; price: number; type: "installment" | "outright" };

export function PaymentDialog({ choice, onClose }: { choice: PaymentChoice | null; onClose: () => void }) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [proof, setProof] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  if (!choice) return null;
  const amount = choice.type === "installment" ? choice.price / 5 : choice.price;

  async function submit() {
    if (loading) return;
    if (!user) { navigate("/signup"); return; }
    if (!proof) { setError("Please upload your payment proof."); return; }
    if (!proof.type.startsWith("image/") && proof.type !== "application/pdf") { setError("Upload an image or PDF proof."); return; }
    setSending(true);
    setError("");
    const extension = proof.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${user.id}/${choice.id}-${Date.now()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from("payment-proofs").upload(path, proof);
    if (uploadError) { setError(uploadError.message); setSending(false); return; }
    const { error: recordError } = await supabase.from("payment_submissions").insert({
      user_id: user.id,
      plan_id: choice.id,
      plan_name: choice.name,
      payment_type: choice.type,
      amount,
      proof_path: path,
    });
    if (recordError) { setError(recordError.message); setSending(false); return; }
    const message = `Payment proof submitted%0AAccount ID: ${encodeURIComponent(user.accountId)}%0ARank: ${encodeURIComponent(choice.name)}%0APayment: ${choice.type}%0AAmount: ₦${amount.toLocaleString()}`;
    window.location.href = `https://wa.link/0ek13k?text=${message}`;
  }

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="border-gold/15 bg-card text-foreground sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-gradient-gold">{choice.name}</DialogTitle>
          <DialogDescription>{choice.type === "installment" ? "Five monthly payments" : "One full payment"}</DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          <div className="rounded-xl border border-gold/20 bg-gold/5 p-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Amount to pay</div>
            <div className="mt-1 font-display text-3xl text-gradient-gold">₦{amount.toLocaleString()}</div>
            {choice.type === "installment" && <div className="mt-1 text-xs text-muted-foreground">per month for 5 months · ₦{choice.price.toLocaleString()} total</div>}
          </div>
          <div className="flex gap-3 rounded-xl border border-border p-4 text-sm">
            <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <div><strong>Ecobank</strong><br />Account Number: 2070058281<br />Account Name: Treasure hunt ventures</div>
          </div>
          {user && <div className="text-sm">Account ID: <span className="font-mono text-gold">{user.accountId}</span></div>}
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gold/40 p-4 text-sm text-gold hover:bg-gold/5">
            <Upload className="h-4 w-4" /> {proof ? proof.name : "Upload payment proof"}
            <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setProof(e.target.files?.[0] ?? null)} />
          </label>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button onClick={() => void submit()} disabled={sending} className="w-full rounded-full bg-gradient-gold text-navy-deep">
            <Send className="mr-2 h-4 w-4" /> {sending ? "Submitting..." : user ? "Submit & Continue to WhatsApp" : "Sign Up to Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}