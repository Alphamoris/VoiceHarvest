"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Mic,
  Globe2,
  Users,
  TrendingUp,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Quote,
  Sun,
  Wheat,
  Sprout,
  Tractor,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { Navbar, Footer } from "@/components/shared";
import { Button } from "@/components/shared/Button";
import { ROUTES, FEATURES, TESTIMONIALS, PROBLEM_STATS, HOW_IT_WORKS } from "@/lib/constants";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const floatingCrops = [
  { Icon: Wheat, delay: 0, x: "10%", y: "20%" },
  { Icon: Sprout, delay: 0.5, x: "85%", y: "15%" },
  { Icon: Wheat, delay: 1, x: "5%", y: "60%" },
  { Icon: Sprout, delay: 1.5, x: "90%", y: "70%" },
  { Icon: Wheat, delay: 2, x: "15%", y: "85%" },
  { Icon: Sprout, delay: 2.5, x: "80%", y: "40%" },
];

function FloatingCrop({ Icon, delay, x, y }: { Icon: typeof Wheat; delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute text-forest/10 pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        delay,
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <Icon className="w-16 h-16 md:w-24 md:h-24" />
    </motion.div>
  );
}

function GrainPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grain" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1.5" fill="#1B5E20" />
            <circle cx="10" cy="10" r="1" fill="#1B5E20" />
            <circle cx="50" cy="50" r="1" fill="#1B5E20" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grain)" />
      </svg>
    </div>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-24 md:pt-32 pb-20 overflow-hidden bg-gradient-to-b from-cream via-white to-lime/5">
      <GrainPattern />
      
      {floatingCrops.map((crop, i) => (
        <FloatingCrop key={i} {...crop} />
      ))}

      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-radial from-lime/30 via-lime/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-gold/30 via-gold/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-forest/5 to-transparent rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-lime/30 to-forest/10 text-forest px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-lime/30"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sun className="h-4 w-4 text-gold" />
              </motion.div>
              <span>Voice-First Technology for Farmers</span>
              <Sprout className="h-4 w-4" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Sell Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-forest">Harvest</span>
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-3 bg-lime/40 -z-0 rounded"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
              </span>
              <br />
              with{" "}
              <span className="relative inline-flex items-center gap-2">
                <span className="text-forest">Your Voice</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Mic className="h-8 w-8 lg:h-10 lg:w-10 text-gold" />
                </motion.div>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              No typing, no hassle. Speak in <span className="text-forest font-semibold">Hindi</span>, <span className="text-forest font-semibold">Tamil</span>, <span className="text-forest font-semibold">Telugu</span>, or any Indian language. We create your listing automatically.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href={ROUTES.auth.register}>
                <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />} className="shadow-lg shadow-forest/25 hover:shadow-xl hover:shadow-forest/30 transition-shadow">
                  Start Selling Free
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<Play className="h-5 w-5 fill-forest text-forest" />}
                className="border-2 border-forest/20 hover:border-forest/40"
              >
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex -space-x-3">
                {["🧑‍🌾", "👨‍🌾", "👩‍🌾", "🌾"].map((emoji, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-lime/20 to-forest/10 border-3 border-white flex items-center justify-center text-xl shadow-md"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.8 + i * 0.05 }}
                    >
                      <Star className="h-5 w-5 text-gold fill-gold" />
                    </motion.div>
                  ))}
                  <span className="ml-2 font-bold text-forest">4.9</span>
                </div>
                <p className="text-sm text-gray-600">
                  Trusted by <span className="font-bold text-forest">10,000+</span> farmers across India
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
            style={{ y }}
          >
            <div className="relative w-full max-w-lg mx-auto">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-lime to-forest rounded-2xl flex items-center justify-center shadow-lg rotate-12">
                    <Wheat className="h-8 w-8 text-white -rotate-12" />
                  </div>
                  
                  <div className="text-center mb-6">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(118, 255, 3, 0.4)",
                          "0 0 0 20px rgba(118, 255, 3, 0)",
                          "0 0 0 0 rgba(118, 255, 3, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-28 h-28 bg-gradient-to-br from-lime/30 to-forest/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Mic className="h-14 w-14 text-forest" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <p className="text-xl text-gray-800 font-medium mb-1">
                        &ldquo;मेरे पास 50 किलो गेहूं है&rdquo;
                      </p>
                      <p className="text-sm text-gray-400">
                        &ldquo;I have 50kg wheat at ₹60/kg&rdquo;
                      </p>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="bg-gradient-to-br from-forest/5 to-lime/10 rounded-2xl p-5 border border-forest/10"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle className="h-6 w-6 text-forest" />
                      </motion.div>
                      <span className="font-bold text-gray-800 text-lg">
                        Listing Created!
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <span className="text-gray-500 text-xs">Crop</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Wheat className="h-4 w-4 text-gold" />
                          <span className="font-semibold text-gray-800">Wheat</span>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <span className="text-gray-500 text-xs">Quantity</span>
                        <p className="font-semibold text-gray-800 mt-1">50 kg</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <span className="text-gray-500 text-xs">Price</span>
                        <p className="font-semibold text-gray-800 mt-1">₹60/kg</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <span className="text-gray-500 text-xs">Total Value</span>
                        <p className="font-bold text-forest mt-1">₹3,000</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-lime/40 to-lime/20 rounded-3xl -z-10" />
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-gradient-to-br from-gold/30 to-gold/10 rounded-3xl -z-20" />
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-16 -left-16 w-32 h-32 text-lime/20"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M 50 10 A 40 40 0 1 1 49.99 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-sm">Scroll to explore</span>
          <ChevronRight className="h-5 w-5 rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CropShowcase() {
  const crops = [
    { name: "Wheat", emoji: "🌾", color: "from-amber-100 to-amber-200" },
    { name: "Rice", emoji: "🍚", color: "from-gray-100 to-gray-200" },
    { name: "Vegetables", emoji: "🥬", color: "from-green-100 to-green-200" },
    { name: "Fruits", emoji: "🍎", color: "from-red-100 to-red-200" },
    { name: "Pulses", emoji: "🫘", color: "from-orange-100 to-orange-200" },
    { name: "Spices", emoji: "🌶️", color: "from-red-100 to-red-200" },
    { name: "Cotton", emoji: "☁️", color: "from-blue-50 to-blue-100" },
    { name: "Sugarcane", emoji: "🎋", color: "from-lime-100 to-lime-200" },
  ];

  return (
    <section className="py-8 bg-forest/5 overflow-hidden">
      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-8"
      >
        {[...crops, ...crops, ...crops].map((crop, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${crop.color} whitespace-nowrap`}
          >
            <span className="text-2xl">{crop.emoji}</span>
            <span className="font-semibold text-gray-700">{crop.name}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-semibold mb-4">
            The Problem
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Farmers Deserve{" "}
            <span className="text-red-500">Better</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Millions of Indian farmers lose income to middlemen and outdated systems. 
            Technology should empower them, not exclude them.
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {PROBLEM_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl transform group-hover:scale-105 transition-transform" />
              <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-red-100 text-center">
                <motion.p
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className="text-3xl md:text-5xl font-bold text-red-500 mb-2"
                  style={{ fontFamily: "var(--font-roboto-mono)" }}
                >
                  {stat.stat}
                </motion.p>
                <p className="text-sm md:text-base text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-forest via-forest to-forest/90 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leaves" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 10 Q60 30 50 50 Q40 30 50 10" fill="currentColor" opacity="0.5" />
              <path d="M20 60 Q30 80 20 100 Q10 80 20 60" fill="currentColor" opacity="0.3" />
              <path d="M80 70 Q90 90 80 110 Q70 90 80 70" fill="currentColor" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaves)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-lime/20 text-lime rounded-full text-sm font-semibold mb-4">
              The Solution
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              VoiceHarvest
              <br />
              <span className="text-lime">Changes Everything</span>
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              We built a platform that truly understands farmers. No complicated apps, 
              no confusing interfaces. Just speak naturally in your language, 
              and we handle everything else.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: Mic,
                  title: "Voice-First Design",
                  desc: "Speak in any Indian language - Hindi, Tamil, Telugu, Kannada & more",
                },
                {
                  icon: Globe2,
                  title: "No Literacy Barriers",
                  desc: "Works for everyone, regardless of reading or writing ability",
                },
                {
                  icon: Smartphone,
                  title: "Works on Any Phone",
                  desc: "Simple smartphone with internet is all you need",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-lime flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-white/70 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: "🌾", label: "Wheat", value: "₹2,200/q" },
                { emoji: "🍅", label: "Tomatoes", value: "₹45/kg" },
                { emoji: "🧅", label: "Onions", value: "₹35/kg" },
                { emoji: "🥔", label: "Potatoes", value: "₹28/kg" },
              ].map((crop, i) => (
                <motion.div
                  key={crop.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
                >
                  <span className="text-5xl mb-3 block">{crop.emoji}</span>
                  <p className="font-semibold text-lg">{crop.label}</p>
                  <p className="text-lime font-bold">{crop.value}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -right-8 w-24 h-24 text-lime/20"
            >
              <Sun className="w-full h-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const featureIcons: Record<string, typeof Mic> = {
    voice: Mic,
    language: Globe2,
    secure: ShieldCheck,
    mobile: Smartphone,
    support: Users,
    growth: TrendingUp,
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-cream relative overflow-hidden">
      <GrainPattern />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-lime/20 text-forest rounded-full text-sm font-semibold mb-4">
            <Sprout className="h-4 w-4" />
            Features
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Everything You Need to{" "}
            <span className="text-forest">Grow</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed with farmers in mind. Simple, intuitive, and effective.
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {FEATURES.map((feature) => {
            const Icon = featureIcons[feature.icon as keyof typeof featureIcons] || Sprout;
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="h-full bg-white rounded-3xl p-8 shadow-soft hover:shadow-lg transition-all border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-lime/10 to-transparent rounded-bl-full" />
                  
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime/20 to-forest/10 flex items-center justify-center mb-6 relative z-10"
                  >
                    <Icon className="h-8 w-8 text-forest" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-poppins)" }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-lime/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-forest/10 text-forest rounded-full text-sm font-semibold mb-4">
            <Tractor className="h-4 w-4" />
            How It Works
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Simple as <span className="text-forest">1-2-3</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Start selling your crops in minutes with our easy voice-first process.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-1 bg-gradient-to-r from-forest via-lime to-gold rounded-full" />
          
          {HOW_IT_WORKS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center relative"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-forest to-forest/80 text-white text-3xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10"
              >
                {index + 1}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-poppins)" }}>
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-gradient-to-br from-cream via-lime/5 to-cream relative overflow-hidden">
      <GrainPattern />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-amber-700 rounded-full text-sm font-semibold mb-4">
            <MessageCircle className="h-4 w-4" />
            Testimonials
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Farmers <span className="text-forest">Love</span> Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from real farmers who have transformed their business with VoiceHarvest.
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.author}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 h-full relative overflow-hidden">
                <Quote className="absolute top-4 right-4 h-12 w-12 text-lime/20" />
                
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 text-gold fill-gold" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed relative z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-lime/20 to-forest/10 flex items-center justify-center text-2xl">
                    👨‍🌾
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-forest via-forest to-forest/90 relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-lime/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              rotate: [0, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Wheat className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-lime rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Mic className="h-10 w-10 text-forest" />
          </motion.div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Ready to Transform Your
            <br />
            <span className="text-lime">Farming Business?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of farmers who are already selling smarter with VoiceHarvest.
            It&apos;s free to get started!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ROUTES.auth.register}>
              <Button
                size="lg"
                className="bg-lime text-forest hover:bg-lime/90 shadow-lg shadow-black/20"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Start Selling Free
              </Button>
            </Link>
            <Link href={ROUTES.auth.login}>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Login to Dashboard
              </Button>
            </Link>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-white/60 text-sm"
          >
            No credit card required • Setup in 2 minutes • Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <CropShowcase />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
