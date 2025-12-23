"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/shared/Button";
import { ROUTES } from "@/lib/constants";
import {
  Menu,
  X,
  Leaf,
  LogIn,
  UserPlus,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it Works" },
  { href: "/#testimonials", label: "Testimonials" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest to-forest/80 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-gray-900">
              VoiceHarvest
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-forest ${
                  pathname === link.href ? "text-forest" : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-forest" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
                    >
                      <Link
                        href={ROUTES.DASHBOARD}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm" leftIcon={<LogIn className="w-4 h-4" />}>
                    Login
                  </Button>
                </Link>
                <Link href={ROUTES.REGISTER}>
                  <Button size="sm" leftIcon={<UserPlus className="w-4 h-4" />}>
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-base font-medium transition-colors ${
                    pathname === link.href ? "text-forest" : "text-gray-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                {user ? (
                  <>
                    <Link href={ROUTES.DASHBOARD} onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" size="md" fullWidth>
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="ghost" size="md" fullWidth onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href={ROUTES.LOGIN} onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" size="md" fullWidth>
                        Login
                      </Button>
                    </Link>
                    <Link href={ROUTES.REGISTER} onClick={() => setMobileMenuOpen(false)}>
                      <Button size="md" fullWidth>
                        Sign Up
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
  );
}
