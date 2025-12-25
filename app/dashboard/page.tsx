"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { StatsCard, ListingsGrid, OrdersList, RecentActivity } from "@/components/dashboard";
import { Button } from "@/components/shared/Button";
import { Plus, Mic, Package, ShoppingCart, TrendingUp, Users, Sparkles, Sun, CloudSun } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { useState, useEffect } from "react";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return { text: "Good Morning", icon: Sun, gradient: "from-amber-400 to-orange-500" };
  if (hour < 17) return { text: "Good Afternoon", icon: CloudSun, gradient: "from-sky-400 to-blue-500" };
  return { text: "Good Evening", icon: Sparkles, gradient: "from-purple-400 to-indigo-500" };
};

const mockStats = [
  { 
    title: "Active Listings", 
    value: 12, 
    icon: Package, 
    trend: { value: 8, isPositive: true },
    color: "forest" as const
  },
  { 
    title: "Pending Orders", 
    value: 5, 
    icon: ShoppingCart, 
    trend: { value: 12, isPositive: true },
    color: "lime" as const
  },
  { 
    title: "Total Sales", 
    value: "₹45,250", 
    icon: TrendingUp, 
    trend: { value: 23, isPositive: true },
    color: "gold" as const
  },
  { 
    title: "New Inquiries", 
    value: 8, 
    icon: Users, 
    trend: { value: 5, isPositive: false },
    color: "sky" as const
  },
];

const mockListings = [
  {
    id: "1",
    title: "Premium Basmati Rice",
    description: "Long grain basmati rice, naturally grown",
    cropType: "GRAINS" as const,
    quantity: 500,
    unit: "KG",
    pricePerUnit: 120,
    qualityGrade: "A+" as const,
    images: ["/rice.jpg"],
    location: { state: "Punjab", district: "Amritsar", village: "Tarn Taran" },
    status: "ACTIVE" as const,
    sellerId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Organic Wheat",
    description: "Freshly harvested organic wheat from farm",
    cropType: "GRAINS" as const,
    quantity: 1000,
    unit: "KG",
    pricePerUnit: 35,
    qualityGrade: "A" as const,
    images: ["/wheat.webp"],
    location: { state: "Madhya Pradesh", district: "Indore", village: "Mhow" },
    status: "ACTIVE" as const,
    sellerId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockOrders = [
  {
    id: "1",
    listingId: "1",
    buyerId: "2",
    sellerId: "1",
    quantity: 50,
    totalAmount: 2000,
    status: "CONFIRMED" as const,
    paymentStatus: "PAID" as const,
    deliveryAddress: {
      fullAddress: "123 Market Road, Pune, Maharashtra",
      landmark: "Near Bus Stand",
      pincode: "411001",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    listing: mockListings[0],
  },
];

const mockActivities = [
  {
    id: "1",
    type: "listing_created" as const,
    title: "New Listing Created",
    description: "You created a new listing for Fresh Organic Tomatoes",
    timestamp: new Date(),
  },
  {
    id: "2",
    type: "order_received" as const,
    title: "New Order Received",
    description: "You received an order for 50 KG of Tomatoes",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "3",
    type: "payment_received" as const,
    title: "Payment Received",
    description: "Payment of ₹2,000 received for Order #1",
    timestamp: new Date(Date.now() - 7200000),
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    }
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const isFarmer = user?.role === "FARMER";
  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6 md:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-start gap-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className={`hidden sm:flex w-14 h-14 rounded-2xl bg-gradient-to-br ${greeting.gradient} items-center justify-center shadow-lg`}
          >
            <GreetingIcon className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-sm font-medium bg-gradient-to-r ${greeting.gradient} bg-clip-text text-transparent`}
            >
              {greeting.text}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="font-display text-2xl md:text-3xl font-bold text-gray-900"
            >
              Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 mt-1"
            >
              Here&apos;s what&apos;s happening with your {isFarmer ? "farm" : "orders"} today.
            </motion.p>
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="flex gap-3"
        >
          <Link href={ROUTES.VOICE}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="md" leftIcon={<Mic className="w-4 h-4" />}>
                Voice Command
              </Button>
            </motion.div>
          </Link>
          {isFarmer && (
            <Link href={ROUTES.LISTINGS_CREATE}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="md" leftIcon={<Plus className="w-4 h-4" />}>
                  New Listing
                </Button>
              </motion.div>
            </Link>
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {mounted && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {mockStats.map((stat, index) => (
              <motion.div 
                key={stat.title} 
                variants={item}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="transform-gpu"
              >
                <StatsCard {...stat} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-2"
        >
          <motion.div 
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 overflow-hidden relative"
            whileHover={{ boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-lime/20 to-forest/10 rounded-full blur-3xl -z-0"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h2 className="font-display text-xl font-semibold text-gray-900">
                {isFarmer ? "Your Listings" : "Available Products"}
              </h2>
              <Link href={ROUTES.LISTINGS}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </motion.div>
              </Link>
            </div>
            <div className="relative z-10">
              <ListingsGrid listings={mockListings} />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <RecentActivity activities={mockActivities} />
        </motion.div>
      </div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div 
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 overflow-hidden relative"
          whileHover={{ boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-gold/20 to-lime/10 rounded-full blur-3xl -z-0"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="flex items-center justify-between mb-6 relative z-10">
            <h2 className="font-display text-xl font-semibold text-gray-900">
              Recent Orders
            </h2>
            <Link href={ROUTES.ORDERS}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </motion.div>
            </Link>
          </div>
          <div className="relative z-10">
            <OrdersList orders={mockOrders} userType={isFarmer ? "farmer" : "buyer"} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
