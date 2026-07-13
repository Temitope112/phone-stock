type VersionBadgeProps = {
  compact?: boolean;
};

export default function VersionBadge({
  compact = false,
}: VersionBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 font-black uppercase tracking-[0.2em] text-cyan-300 ${
        compact
          ? "px-2.5 py-1 text-[9px]"
          : "px-4 py-2 text-[11px]"
      }`}
    >
      PhoneStock V1
    </span>
  );
}