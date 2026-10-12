"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PROJECTS } from "@/constants/projects";

const popIn = {
   hidden: { opacity: 0, scale: 0.85, y: 80, filter: "blur(10px)" },
   visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 200, damping: 20, mass: 1 } }
};

/** Builds the winding dashed path; amplitude is narrower on mobile. */
const buildPath = (count: number, narrowX: number, wideX: number) => {
   if (count === 0) return "";
   const gap = 100 / count;
   let path = `M 50 0`;
   for (let i = 0; i < count; i++) {
      const yStart = i * gap;
      const yEnd = yStart + gap;
      const ctrlX = i % 2 === 0 ? narrowX : wideX;
      path += ` C ${ctrlX} ${yStart + gap * 0.25}, ${ctrlX} ${yEnd - gap * 0.25}, 50 ${yEnd}`;
   }
   return path;
};

// Both variants are rendered and toggled with CSS, so server and client HTML
// match (reading window.innerWidth during render caused hydration mismatches).
const DESKTOP_PATH = buildPath(PROJECTS.length, 5, 95);
const MOBILE_PATH = buildPath(PROJECTS.length, 30, 70);

/** Real <a> links (not window.open) so crawlers and keyboard users can follow them. */
const CardWrapper = ({
   link,
   className,
   children,
}: {
   link: string;
   className: string;
   children: React.ReactNode;
}) =>
   link ? (
      <a
         href={link}
         target="_blank"
         rel="noopener noreferrer"
         className={className}
      >
         {children}
         <span className="sr-only">(opens in a new tab)</span>
      </a>
   ) : (
      <div className={className}>{children}</div>
   );

export const ZigZagTimeline = () => {
   // SVG Path computations for the long winding dashed line tying the blocks together
   // We use vector-effect="non-scaling-stroke" to maintain consistent dash arrays regardless of squishing.
   return (
      <div className="relative w-full pb-32">

         {/* Background Curving Dashed Line */}
         <div className="absolute left-1/2 top-10 transform -translate-x-1/2 w-[90%] md:w-[70%] lg:w-[60%] h-[92%] pointer-events-none opacity-40 md:opacity-70 z-0 select-none drop-shadow-sm">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
               <path
                  d={MOBILE_PATH}
                  className="md:hidden"
                  fill="none"
                  stroke="url(#dash-gradient)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray="4, 6"
               />
               <path
                  d={DESKTOP_PATH}
                  className="hidden md:block"
                  fill="none"
                  stroke="url(#dash-gradient)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray="4, 6"
               />
               <defs>
                  <linearGradient id="dash-gradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                     <stop offset="5%" stopColor="#ffffff" stopOpacity="0.8" />
                     <stop offset="95%" stopColor="#ffffff" stopOpacity="0.8" />
                     <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
               </defs>
            </svg>
         </div>

         <div className="flex flex-col gap-12 md:gap-8 lg:gap-12 relative z-10 max-w-5xl mx-auto items-center">
            {PROJECTS.map((proj, idx) => {
               const isEven = idx % 2 === 0;
               return (
                  <CardWrapper
                     key={proj.id}
                     link={proj.link}
                     // Vertical overlap so the zig zag looks tightly packed rather than isolated blocks
                     className={`w-full flex ${isEven ? 'justify-start' : 'justify-end'} px-4 md:px-0 ${idx > 0 ? '-mt-[8%] md:-mt-[6%]' : ''}`}
                  >
                     <motion.div
                        variants={popIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        className={`
                      relative w-full max-w-[320px] md:max-w-[400px] lg:max-w-[460px] 
                      bg-card rounded-[32px] p-4 md:p-6 shadow-[0_30px_60px_rgba(0,0,0,0.8)]
                      ${proj.rotation} 
                      ${isEven ? 'md:ml-[5%] lg:ml-[2%]' : 'md:mr-[5%] lg:mr-[2%]'}
                      transition-all duration-300 ease-out 
                      hover:-translate-y-6 hover:scale-[1.03] group cursor-pointer
                      border border-border
                   `}
                     >
                        {/* Tacking Pin for Dark Mode */}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-xl flex items-center justify-center border border-zinc-600 z-20">
                           <div className="w-2.5 h-2.5 rounded-full bg-black shadow-[inset_0_1px_3px_rgba(255,255,255,0.2)]" />
                        </div>

                        {/* Top Image Cutout */}
                        <div className="w-full aspect-[4/3] relative rounded-[20px] overflow-hidden border-[3px] border-zinc-800 bg-zinc-900/50 mb-6 drop-shadow-md flex items-center justify-center">
                           {/* Inner glare/stroke effect */}
                           <div className="absolute inset-0 border border-white/10 z-10 pointer-events-none rounded-[20px]" />

                           {proj.src ? (
                              <Image
                                 src={proj.src}
                                 alt={proj.title}
                                 fill
                                 sizes="(min-width: 1024px) 412px, (min-width: 768px) 352px, 288px"
                                 loading={idx === 0 ? "eager" : undefined}
                                 fetchPriority={idx === 0 ? "high" : undefined}
                                 className="object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-110 opacity-90 group-hover:opacity-100"
                              />
                           ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 gap-2">
                                 <svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                 </svg>
                                 <span className="text-xs font-bold tracking-[0.2em] uppercase">Coming Soon</span>
                              </div>
                           )}
                        </div>

                        <div className="space-y-1.5 text-card-foreground px-3 pb-2 text-center md:text-left">
                           <span className="text-xs font-black font-sans text-muted-foreground tracking-[0.15em]">{proj.id}</span>
                           <h2 className="text-2xl md:text-3xl font-black font-heading tracking-tighter uppercase leading-[0.9] group-hover:text-accent transition-colors duration-300">{proj.title}</h2>
                           <div className="flex items-center justify-center md:justify-start gap-3 text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest pt-1">
                              <span>{proj.category}</span>
                              <span className="w-1 h-1 rounded-full bg-border" />
                              <span>{proj.year}</span>
                           </div>
                        </div>
                     </motion.div>
                  </CardWrapper>
               )
            })}
         </div>

         <div className="mt-20 md:mt-48 text-center relative z-10">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, amount: 0.5 }}
               className="flex flex-col items-center justify-center p-8 rounded-[40px] border border-white/5 bg-white/5 backdrop-blur-sm mx-4"
            >
               <p className="text-lg md:text-2xl font-black font-sans uppercase tracking-[0.2em] text-white/80 group">
                  READY TO BE <span className="text-accent">DELIVERED</span> !
               </p>
               <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "120px" }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "circOut" }}
                  className="h-1 bg-accent mt-4 rounded-full"
               />
            </motion.div>
         </div>
      </div>
   )
}
