const SOCIALS = [
  {
    name: "LinkedIn",
    href: "#",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  },
  {
    name: "X",
    href: "#",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    )
  },
  {
    name: "Instagram",
    href: "#",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    )
  },
];

export const Footer = () => {
  return (
    <footer className="relative w-full bg-[#050505] py-20 md:py-32 overflow-hidden font-sans">

      {/* 1. Main Content Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

        {/* Social Pillar */}
        <div className="flex flex-col gap-8">
          <span className="text-white/40 text-sm tracking-widest uppercase font-bold">
            Find me at:
          </span>
          <div className="flex items-center gap-12">
            {SOCIALS.map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label={social.name}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        {/* Credit Pillar */}
        <div className="max-w-[300px] text-right ml-auto">
          <p className="text-white/60 text-sm md:text-base leading-relaxed tracking-tight">
            Thankyou for visiting my portfolio!<br />
            It has been Designed & Developed by<br />
            me with Love &lt;3
          </p>
        </div>

      </div>

      {/* 2. Massive Branded Backdrop */}
      <div className="relative mt-20 select-none pointer-events-none">
        <h2 className="text-[25vw] leading-[0.75] font-heading font-black uppercase text-[#FF6B00] tracking-tighter opacity-100 whitespace-nowrap translate-y-[20%]">
          Arpit
        </h2>
      </div>

    </footer>
  );
};
