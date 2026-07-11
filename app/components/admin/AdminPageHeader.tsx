type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function AdminPageHeader({
  eyebrow,
  title,
  description,
}: AdminPageHeaderProps) {
  return (
    <div>
      <p className="text-sm font-semibold text-cyan-300">{eyebrow}</p>

      <h1 className="mt-2 text-3xl font-black md:text-4xl">
        {title}
      </h1>

      <p className="mt-3 max-w-3xl leading-7 text-white/50">
        {description}
      </p>
    </div>
  );
}