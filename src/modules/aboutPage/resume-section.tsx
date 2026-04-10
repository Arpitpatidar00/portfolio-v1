import { motion } from "framer-motion";

const EDUCATION_DATA = [
  {
    degree: "B.Tech in Computer Science",
    school: "Chameli Devi Group of Institutions",
    details: "CGPA: 7.49",
    period: "Aug 2021 – Jun 2025",
    location: "Indore, India"
  },
  {
    degree: "Class 12th",
    school: "Indian Public Higher Secondary School",
    details: "Score: 79.6%",
    period: "2019",
    location: "M.P., India"
  },
  {
    degree: "Class 10th",
    school: "Indian Public Higher Secondary School",
    details: "Score: 82.4%",
    period: "2017",
    location: "M.P., India"
  }
];

const SKILLS_DATA = [
  { category: "Languages", items: ["JavaScript", "TypeScript"] },
  { category: "Frontend", items: ["React.js", "Next.js", "Redux", "Context API", "MUI", "ShadCn"] },
  { category: "Backend", items: ["Node.js", "Express.js", "REST", "WebSocket", "GraphQL", "MVC"] },
  { category: "Database", items: ["MongoDB", "SuperBase"] },
  { category: "DevOps", items: ["AWS EC2", "S3"] },
  { category: "Tools", items: ["Nx Monorepo", "Git", "GitHub", "Stripe", "RazorPay", "NodeMailer", "npm", "pnpm", "Postman"] },
  { category: "Auth", items: ["JWT", "OAuth", "Session Auth"] }
];

const AWARDS_DATA = [
  "Winner – Code Hunter 2024",
  "3rd Place – Web Dev Hackathon 2024"
];

const EXPERIENCE_DATA = [
  {
    role: "Software Engineer – Full-Stack",
    company: "Metaverse Ventures Pvt. Ltd.",
    type: "Remote",
    period: "Aug 2025 – Present",
    desc: [
      "Built a production-ready cross-chain payments treasury platform supporting Swap, Bridge, Yield, Pay-in/Pay-out, and stablecoin operations.",
      "Implemented Privy-based authentication with embedded wallets, external wallet linking, and secure session management.",
      "Designed virtual account infrastructure for users to manage multi-chain balances, external accounts, and automated fund routing.",
      "Integrated third-party Bridge/Swap/Yield APIs to enable real-time execution across chains with unified quote and settlement services.",
    ]
  },
  {
    role: "Associate Software Developer",
    company: "Amenses Innovation Pvt Ltd",
    type: "Indore, India",
    period: "July 2024 – Aug 2025",
    desc: [
      "Architected a scalable monorepo using Turborepo, enabling shared packages for types, utils, and service logic.",
      "Developed backend services using Node.js + TypeScript with layered MVC design + global error handling.",
      "Built reusable UI components in Next.js + MUI, enforcing global design consistency.",
      "Reduced query latency 30% using MongoDB indexes + aggregation pipelines + TanStack Query caching.",
    ]
  },
  {
    role: "Software Developer Intern",
    company: "Amenses Innovation Pvt Ltd",
    type: "Indore, India",
    period: "Apr 2024 – July 2024",
    desc: [
      "Completed 2+ MERN full-stack products individually + collaboratively.",
      "Led sprint planning + code reviews + Git-based workflows.",
      "Integrated NodeMailer + SendGrid automating 2K+ password + verification flows monthly.",
      "Designed backend using clean MVC + service pattern reducing redundancy 40%."
    ]
  }
];

const PROJECTS_DATA = [
  {
    name: "Ubuntu Interior",
    tech: "Next.js + TypeScript + Node.js + MongoDB + AWS",
    period: "2024",
    desc: [
      "Independently built and delivered a full-stack e-commerce platform end-to-end.",
      "Architected scalable monorepo with multi-package structure for maintainability and growth.",
      "Led all client interactions, product decisions, and technical direction.",
      "Implemented S3-based media pipeline and optimized bulk-order transaction workflows.",
      "Ensured production readiness with performance, scalability, and deployment strategies."
    ]
  },
  {
    name: "Stable Coin",
    tech: "Next.js + NestJS + Supabase + TypeScript",
    period: "2024",
    desc: [
      "Solely developed full-stack application from backend architecture to frontend delivery.",
      "Designed and implemented booking APIs, vendor modules, and core business logic.",
      "Improved backend reliability through structured error handling and system refactoring.",
      "Built and optimized UI for better usability and performance."
    ]
  },
  {
    name: "Stable Link",
    tech: "Next.js + NestJS + Supabase + TypeScript",
    period: "2024",
    desc: [
      "Engineered REST APIs and frontend modules for institution collaboration and event workflows.",
      "Designed scalable data flow and optimized Redux state management.",
      "Implemented lazy loading and performance optimizations to reduce initial load time."
    ]
  }
];

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: easeOutQuint } }
} as const;

const popIn = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 350, damping: 25 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 }
  }
};

const fastStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

export const ResumeSection = () => {
  return (
    <section className="px-6 md:px-10 lg:px-16 py-16 md:py-24 text-foreground border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 md:gap-24">

        {/* LEFT COLUMN: Education, Skills, Awards */}
        <motion.div
          className="flex-1 space-y-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >

          {/* Education */}
          <motion.div className="space-y-10" variants={fadeUp}>
            <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter capitalize drop-shadow-sm">Education</h2>
            <div className="space-y-8">
              {EDUCATION_DATA.map((item, i) => (
                <div key={i} className="flex flex-col space-y-1">
                  <span className="text-accent text-sm font-bold tracking-wider mb-1">{item.period}</span>
                  <h3 className="text-xl md:text-2xl font-bold font-sans opacity-90 leading-tight">{item.school}</h3>
                  <p className="text-muted-foreground text-sm italic font-medium">{item.degree} · {item.details}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technical Skills */}
          <motion.div className="space-y-8" variants={fadeUp}>
            <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter capitalize drop-shadow-sm">Software</h2>
            <div className="flex flex-col gap-6">
              {SKILLS_DATA.map((skill, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="text-xs text-muted-foreground uppercase font-black tracking-[0.2em]">{skill.category}</h4>
                  <motion.div
                    className="flex flex-wrap gap-2 pt-1"
                    variants={fastStagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {skill.items.map((item, j) => (
                      <motion.span
                        key={j}
                        variants={popIn}
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
                        className="px-3 py-1.5 text-xs font-semibold border border-white/10 rounded-md bg-white/5 text-white/90 shadow-sm transition-colors select-none cursor-default"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Awards */}
          <motion.div className="space-y-8 pb-16 lg:pb-0" variants={fadeUp}>
            <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter capitalize drop-shadow-sm">Awards</h2>
            <div className="space-y-4">
              {AWARDS_DATA.map((aw, i) => (
                <motion.div key={i} className="flex gap-4 items-center" variants={fadeUp}>
                  <motion.div variants={popIn} className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(255,94,65,0.8)]" />
                  <span className="text-lg font-medium opacity-90">{aw}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* RIGHT COLUMN: Experience, Projects */}
        <motion.div
          className="flex-[1.2] space-y-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >

          {/* Experience */}
          <motion.div className="space-y-10" variants={fadeUp}>
            <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter capitalize drop-shadow-sm">Experience</h2>

            <div className="relative border-l border-white/10 ml-[11px] md:ml-[15px] space-y-12 pb-4">
              {EXPERIENCE_DATA.map((exp, i) => (
                <motion.div key={i} className="relative pl-8 md:pl-12 group" variants={fadeUp}>
                  {/* Timeline Node */}
                  <motion.div
                    variants={popIn}
                    className="absolute w-[22px] h-[22px] md:w-[30px] md:h-[30px] bg-accent rounded-full -left-[12px] md:-left-[16px] top-0 border-[4px] md:border-[6px] border-[#111] flex items-center justify-center shadow-[0_0_12px_rgba(255,94,65,0.5)] transition-transform duration-300 group-hover:scale-125"
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full opacity-80" />
                  </motion.div>

                  {/* Content */}
                  <div className="-mt-1.5 md:-mt-2 flex flex-col space-y-3">
                    <div>
                      <span className="text-accent text-sm font-bold tracking-wider">{exp.period}</span>
                      <h3 className="text-2xl md:text-3xl font-bold font-sans mt-2 mb-1">{exp.company}</h3>
                      <p className="text-muted-foreground text-sm md:text-base font-semibold">{exp.role} <span className="opacity-50 mx-2">|</span> {exp.type}</p>
                    </div>

                    {/* Description List */}
                    <ul className="space-y-2 pt-2">
                      {exp.desc.map((d, j) => (
                        <li key={j} className="text-sm md:text-base text-foreground/70 leading-relaxed flex items-start hover:text-white transition-colors duration-300">
                          <span className="text-white/20 mr-3 mt-0.5 select-none">›</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Projects */}
          <motion.div className="space-y-10 pt-4" variants={fadeUp}>
            <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter capitalize drop-shadow-sm">Projects</h2>
            <motion.div
              className="space-y-12"
              variants={staggerContainer}
            >
              {PROJECTS_DATA.map((proj, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-col space-y-3 bg-white/5 p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.08] hover:shadow-2xl transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 pb-3 border-b border-white/10">
                    <h3 className="text-2xl md:text-3xl font-bold font-sans group-hover:text-accent transition-colors">{proj.name}</h3>
                    <span className="text-white/50 text-sm font-bold tracking-wider">{proj.period}</span>
                  </div>
                  <p className="text-accent text-xs md:text-sm font-mono tracking-widest uppercase py-1">{proj.tech}</p>
                  <ul className="space-y-2 pt-2">
                    {proj.desc.map((d, j) => (
                      <li key={j} className="text-sm md:text-base text-foreground/70 leading-relaxed flex items-start">
                        <span className="text-white/20 mr-3 mt-0.5 select-none">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
