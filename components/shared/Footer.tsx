"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Github, Linkedin, Twitter, Globe, Sparkles } from "lucide-react";

const BUILDER = {
  name: "Alphamoris",
  linkedin: "https://linkedin.com/in/alphamoris",
  github: "https://github.com/Alphamoris",
  twitter: "https://x.com/@_Alpha_45",
  portfolio: "https://alphamoris.tech/",
  logo: "/pegasus1.jpg",
};

const socialLinks = [
  { icon: Github, href: BUILDER.github, label: "GitHub", hoverColor: "hover:border-lime hover:text-lime hover:shadow-lime/30" },
  { icon: Linkedin, href: BUILDER.linkedin, label: "LinkedIn", hoverColor: "hover:border-lime hover:text-lime hover:shadow-lime/30" },
  { icon: Twitter, href: BUILDER.twitter, label: "Twitter", hoverColor: "hover:border-gold hover:text-gold hover:shadow-gold/30" },
  { icon: Globe, href: BUILDER.portfolio, label: "Portfolio", hoverColor: "hover:border-lime hover:text-lime hover:shadow-lime/30" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const logoSpinVariants = {
  initial: { rotate: 0 },
  hover: { 
    rotate: 360,
    transition: { duration: 0.8, ease: "easeInOut" as const }
  }
};

const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(118, 255, 3, 0.2)",
      "0 0 40px rgba(118, 255, 3, 0.4)",
      "0 0 20px rgba(118, 255, 3, 0.2)",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-forest via-forest to-forest/95 text-cream relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-lime/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full relative z-10"
      >
        <div className="px-6 sm:px-12 lg:px-20 xl:px-32 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-center">
            <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <motion.div
                  variants={glowPulse}
                  animate="animate"
                  className="p-2.5 rounded-xl bg-lime/10 border border-lime/20 group-hover:bg-lime/20 transition-colors"
                >
                  <Leaf className="h-8 w-8 text-lime" />
                </motion.div>
                <div className="text-left">
                  <motion.span
                    className="text-2xl font-bold text-white block"
                    style={{ fontFamily: "var(--font-display)" }}
                    whileHover={{ scale: 1.02 }}
                  >
                    VoiceHarvest
                  </motion.span>
                  <span className="text-xs text-cream/60">Empowering Farmers with Voice</span>
                </div>
              </Link>
              
              <motion.div
                className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-lime/20 to-gold/20 border border-lime/30"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="h-4 w-4 text-gold" />
                </motion.div>
                <span className="text-cream/80 text-xs">
                  <span className="text-lime font-medium">English</span> • <span className="text-lime font-medium">हिंदी</span> • <span className="text-lime font-medium">தமிழ்</span>
                </span>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              className="flex flex-col items-center"
            >
              <span className="text-cream/50 text-xs uppercase tracking-widest mb-4">Built with ❤️ by</span>
              
              <motion.a
                href={BUILDER.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-lime/30 group-hover:border-lime transition-colors"
                  variants={logoSpinVariants}
                  animate={glowPulse.animate}
                >
                  <Image
                    src={BUILDER.logo}
                    alt="Alphamoris Logo"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                
                <motion.div
                  className="absolute -inset-2 rounded-full border border-lime/20"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.a>
              
              <motion.a
                href={BUILDER.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 group"
                whileHover={{ scale: 1.05 }}
              >
                <span
                  className="text-xl font-bold bg-gradient-to-r from-lime via-white to-gold bg-clip-text text-transparent"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {BUILDER.name}
                </span>
              </motion.a>

              <div className="flex items-center gap-3 mt-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-lg bg-white/5 border border-white/10 text-cream/70 transition-all duration-300 hover:shadow-lg ${social.hoverColor}`}
                    aria-label={social.label}
                    whileHover={{ 
                      scale: 1.15,
                      y: -3,
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              className="flex flex-col items-center md:items-end text-center md:text-right"
            >
              <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
                Revolutionizing agricultural trade through voice-first technology.
              </p>
              <p className="text-cream/40 text-xs mt-3">
                No typing, no hassle — just speak and sell.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="border-t border-white/10"
        >
          <div className="px-6 sm:px-12 lg:px-20 xl:px-32 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-cream/40 text-sm">
                © 2025 VoiceHarvest. All rights reserved.
              </p>
              <p className="text-cream/30 text-xs">
                Made in India 🇮🇳
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
