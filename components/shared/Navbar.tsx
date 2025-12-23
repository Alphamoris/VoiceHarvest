"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf, Wheat } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#testimonials", label: "Testimonials" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-white/80 backdrop-blur-sm shadow-soft py-3"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest to-forest/80 flex items-center justify-center shadow-md">
                <Wheat className="h-5 w-5 text-lime" />
              </div>
            </motion.div>
            <span
              className="text-xl font-bold text-forest"
              style={{ fontFamily: "var(--font-display)" }}
            >
              VoiceHarvest
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  pathname === link.href ? "text-forest" : "text-gray-600 hover:text-forest"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link href={ROUTES.dashboard.home}>
                <Button variant="primary" size="md">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href={ROUTES.auth.login}>
                  <Button variant="ghost" size="md">
                    Login
                  </Button>
                </Link>
                <Link href={ROUTES.auth.register}>
                  <Button variant="primary" size="md">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-forest/5 hover:bg-forest/10 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-forest" />
              ) : (
                <Menu className="h-6 w-6 text-forest" />
              )}
            </motion.div>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-gray-100 mt-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-forest hover:bg-forest/5 rounded-xl transition-colors font-medium"
                    >
                      <span className="w-2 h-2 rounded-full bg-lime" />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-100 space-y-3 px-4">
                  {user ? (
                    <Link href={ROUTES.dashboard.home}>
                      <Button variant="primary" fullWidth>
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href={ROUTES.auth.login} className="block">
                        <Button variant="secondary" fullWidth>
                          Login
                        </Button>
                      </Link>
                      <Link href={ROUTES.auth.register} className="block">
                        <Button variant="primary" fullWidth>
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
