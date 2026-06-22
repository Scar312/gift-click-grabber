import logoUrl from "@/assets/thv-logo.png";

export function Logo({ size = 40, withWordmark = true }: { size?: number; withWordmark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={logoUrl}
        alt="Treasure Hunt Ventures"
        width={size}
        height={size}
        className="object-contain drop-shadow-[0_4px_12px_rgba(230,176,66,0.35)]"
        style={{ width: size, height: size }}
      />
      {withWordmark && (
        <div className="leading-none">
          <div className="font-display text-[0.95rem] font-bold tracking-wide text-gradient-gold">
            TREASURE HUNT
          </div>
          <div className="font-display text-[0.6rem] tracking-[0.35em] text-gold/80">
            VENTURES
          </div>
        </div>
      )}
    </div>
  );
}