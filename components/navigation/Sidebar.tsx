"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/lib/constants";
import {
  Leaf,
  Home,
  Mic,
  Package,
  ShoppingCart,
  User,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react";

const farmerNavItems = [
  { href: ROUTES.DASHBOARD, label: "Dashboard", icon: Home },
  { href: ROUTES.VOICE, label: "Voice Assistant", icon: Mic },
  { href: ROUTES.LISTINGS, label: "My Listings", icon: Package },
  { href: ROUTES.ORDERS, label: "Orders", icon: ShoppingCart },
];

const buyerNavItems = [
  { href: ROUTES.DASHBOARD, label: "Dashboard", icon: Home },
  { href: ROUTES.VOICE, label: "Voice Assistant", icon: Mic },
  { href: ROUTES.LISTINGS, label: "Browse Products", icon: Package },
  { href: ROUTES.ORDERS, label: "My Orders", icon: ShoppingCart },
];

const bottomNavItems = [
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/help", label: "Help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = user?.role === "FARMER" ? farmerNavItems : buyerNavItems;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest to-forest/80 flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-gray-900">
            VoiceHarvest
          </span>
        </Link>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <div className="px-3 mb-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Main Menu
          </span>
        </div>
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-forest text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-lime"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 mt-8 mb-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Settings
          </span>
        </div>
        <nav className="space-y-1 px-2">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-forest text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
            <User className="w-5 h-5 text-forest" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
