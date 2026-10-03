import { useState } from "react";
import { Copy, Check } from "lucide-react";

/** Click-to-copy THV ID. Keeps the caller's styling via className. */
export function CopyId({ id, prefix = "", className = "" }: { id: string; prefix?: string; className?: string }) {
  const [done, setDone] = useState(false);
  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(id);
    } catch {
      const t = document.createElement("textarea");
      t.value = id; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 1500);
  };
  return (
    <button type="button" onClick={copy} title="Copy THV ID" aria-label={`Copy THV ID ${id}`} className={`inline-flex items-center gap-1 ${className}`}>
      {prefix}{id}
      {done ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3 opacity-60" />}
      {done && <span className="text-[10px] opacity-80">Copied</span>}
    </button>
  );
}
