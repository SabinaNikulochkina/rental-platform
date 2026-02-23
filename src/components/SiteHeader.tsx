import Image from "next/image";

type NavItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  brand: string;
  brandClassName?: string;
  logoSrc?: string;
  navItems?: NavItem[];
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
};

export default function SiteHeader({
  brand,
  brandClassName,
  logoSrc,
  navItems,
  cta,
  secondaryCta,
  className,
}: SiteHeaderProps) {
  return (
    <header className={`flex items-center justify-between gap-6 ${className ?? ""}`}>
      <a className="flex items-center gap-3" href="/">
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt={`${brand} logo`}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-[#1b2333]" />
        )}
        <span className={`text-xl font-semibold ${brandClassName ?? ""}`}>
          {brand}
        </span>
      </a>
      {navItems && navItems.length > 0 && (
        <nav className="hidden items-center gap-8 text-base font-medium text-white/80 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="transition hover:text-white"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
      <div className="flex items-center gap-3">
        {secondaryCta && (
          <a
            className="rounded-full border border-[#c9724a] px-5 py-2.5 text-base font-semibold text-[#7a3e2f] transition hover:bg-[#ff8a3d] hover:text-[#1b2333]"
            href={secondaryCta.href}
          >
            {secondaryCta.label}
          </a>
        )}
        {cta && (
          <a
            className="inline-flex items-center justify-center rounded-full border border-[#c9724a] bg-[#ff8a3d] px-6 py-3 text-base font-semibold text-[#1b2333] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#ff8a3d]"
            href={cta.href}
          >
            {cta.label}
          </a>
        )}
      </div>
    </header>
  );
}
