"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Mic,
  Clock,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Leaf,
  User,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn, getInitials } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

const sidebarLinks = [
  {
    href: ROUTES.dashboard.home,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: ROUTES.dashboard.listings,
    label: "My Listings",
    icon: Package,
  },
  {
    href: ROUTES.dashboard.orders,
    label: "Orders",
    icon: ShoppingCart,
  },
  {
    href: ROUTES.dashboard.voiceChat,
    label: "Voice Assistant",
    icon: Mic,
  },
  {
    href: ROUTES.dashboard.history,
    label: "History",
    icon: Clock,
  },
  {
    href: ROUTES.dashboard.settings,
    label: "Settings",
    icon: Settings,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.auth.login);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 280 : 80,
          x: 0,
        }}
        className={cn(
          "fixed left-0 top-0 h-full bg-forest z-50 flex flex-col",
          "lg:relative lg:translate-x-0",
          !isOpen && "max-lg:-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <Link href={ROUTES.dashboard.home} className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Leaf className="h-8 w-8 text-lime" />
            </motion.div>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-xl font-bold text-white overflow-hidden whitespace-nowrap"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  VoiceHarvest
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors hidden lg:flex"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1 px-3">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-lime text-forest font-medium"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <link.icon className="h-5 w-5 flex-shrink-0" />
                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="overflow-hidden whitespace-nowrap"
                        >
                          {link.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 w-1 h-8 bg-lime rounded-r-full"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-lime flex items-center justify-center text-forest font-semibold shrink-0">
              {user?.name ? getInitials(user.name) : <User className="h-5 w-5" />}
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-white font-medium text-sm truncate max-w-40">
                    {user?.name || "Guest"}
                  </p>
                  <p className="text-white/60 text-xs truncate max-w-40">
                    {user?.email || ""}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg",
              "text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
    </>
  );
}

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
  );
}
