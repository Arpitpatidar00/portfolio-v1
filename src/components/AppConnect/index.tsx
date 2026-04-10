"use client";

import React, { useState } from "react";
import { ArrowUpRight, FolderOpen, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { socialLinks, routes } from "@/constants";

const GithubIcon = ({ size = 24 }: { size?: number }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.5 6-6.76a5.5 5.5 0 0 0-1.5-3.8 5.1 5.1 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.1 5.1 0 0 0-.1 3.8 5.5 5.5 0 0 0-1.5 3.8c0 5.2 3 6.4 6 6.76A4.8 4.8 0 0 0 4 18v4"></path>
      <path d="M9 18c-4.5 1.5-5-2.5-7-3"></path>
   </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
   </svg>
);

const XIcon = ({ size = 24 }: { size?: number }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
   </svg>
);

export const AppConnect = () => {
   const [isConnectHovered, setIsConnectHovered] = useState(false);

   return (
      <div
         className="relative pb-4 lg:pb-8 flex items-end h-[240px] w-[240px]"
         onMouseEnter={() => setIsConnectHovered(true)}
         onMouseLeave={() => setIsConnectHovered(false)}
      >
         <motion.div
            className="relative overflow-hidden flex items-center justify-center origin-bottom-left cursor-default"
            animate={{
               width: isConnectHovered ? 220 : 120,
               height: isConnectHovered ? 220 : 40,
               borderRadius: isConnectHovered ? 110 : 20,
               y: isConnectHovered ? -50 : 0,
               x: isConnectHovered ? 20 : 0
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
         >
            {/* Active State: Text always stays visible */}
            <motion.div
               className="flex items-center gap-2 absolute z-20 pointer-events-none"
               animate={{
                  scale: isConnectHovered ? 1.05 : 1
               }}
               transition={{ duration: 0.3 }}
            >
               <ArrowUpRight size={18} className={isConnectHovered ? "text-accent transition-colors" : "text-muted-foreground transition-colors"} />
               <span className={`text-[11px] lg:text-xs font-mono tracking-[0.4em] uppercase font-bold transition-colors ${isConnectHovered ? "text-white" : "text-muted-foreground"}`}>Connect</span>
            </motion.div>

            {/* Expanded State: 5 Icons in orbit */}
            <motion.div
               className="absolute inset-0"
               initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
               animate={{
                  opacity: isConnectHovered ? 1 : 0,
                  rotate: isConnectHovered ? 0 : -45,
                  scale: isConnectHovered ? 1 : 0.8
               }}
               transition={{ type: "spring", stiffness: 300, damping: 22, delay: isConnectHovered ? 0.05 : 0 }}
               style={{ pointerEvents: isConnectHovered ? 'auto' : 'none' }}
            >
               {/* Center Top */}
               <div className="absolute top-[20px] left-1/2 -translate-x-1/2">
                  <Link href={socialLinks.twitter} target="_blank" className="flex items-center justify-center bg-white/10 hover:bg-accent rounded-full text-white hover:text-black transition-all duration-300 w-[38px] h-[38px]">
                     <XIcon size={16} />
                  </Link>
               </div>

               {/* Left Mid-Top */}
               <div className="absolute top-[55px] left-[20px]">
                  <Link href={socialLinks.github} target="_blank" className="flex items-center justify-center bg-white/10 hover:bg-accent rounded-full text-white hover:text-black transition-all duration-300 w-[38px] h-[38px]">
                     <GithubIcon size={16} />
                  </Link>
               </div>

               {/* Right Mid-Top */}
               <div className="absolute top-[55px] right-[20px]">
                  <Link href={socialLinks.linkedin} target="_blank" className="flex items-center justify-center bg-white/10 hover:bg-accent rounded-full text-white hover:text-black transition-all duration-300 w-[38px] h-[38px]">
                     <LinkedinIcon size={16} />
                  </Link>
               </div>

               {/* Bottom Left */}
               <div className="absolute bottom-[40px] left-[35px]">
                  <Link href={routes.projects} className="flex items-center justify-center bg-white/10 hover:bg-accent rounded-full text-white hover:text-black transition-all duration-300 w-[38px] h-[38px]">
                     <FolderOpen size={16} />
                  </Link>
               </div>

               {/* Bottom Right */}
               <div className="absolute bottom-[40px] right-[35px]">
                  <Link href={routes.contact} className="flex items-center justify-center bg-white/10 hover:bg-accent rounded-full text-white hover:text-black transition-all duration-300 w-[38px] h-[38px]">
                     <Mail size={16} />
                  </Link>
               </div>
            </motion.div>
         </motion.div>
      </div>
   );
};
