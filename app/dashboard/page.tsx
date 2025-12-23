"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { StatsCard, ListingsGrid, OrdersList, RecentActivity } from "@/components/dashboard";
import { Button } from "@/components/shared/Button";
import { Plus, Mic, Package, ShoppingCart, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

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
    title: "Fresh Organic Tomatoes",
    description: "Freshly harvested organic tomatoes from my farm",
    cropType: "VEGETABLES" as const,
    quantity: 100,
    unit: "KG",
    pricePerUnit: 40,
    qualityGrade: "A" as const,
    images: ["/tomatoes.jpg"],
    location: { state: "Maharashtra", district: "Pune", village: "Khed" },
    status: "ACTIVE" as const,
    sellerId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Premium Basmati Rice",
    description: "Long grain basmati rice, naturally grown",
    cropType: "GRAINS" as const,
    quantity: 500,
    unit: "KG",
    pricePerUnit: 85,
    qualityGrade: "A+" as const,
    images: ["/rice.jpg"],
    location: { state: "Punjab", district: "Amritsar", village: "Tarn Taran" },
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
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const isFarmer = user?.role === "FARMER";

  return (
    <div className="space-y-6 md:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(" ")[0] || "User"}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here&apos;s what&apos;s happening with your {isFarmer ? "farm" : "orders"} today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href={ROUTES.VOICE}>
            <Button variant="outline" size="md" leftIcon={<Mic className="w-4 h-4" />}>
              Voice Command
            </Button>
          </Link>
          {isFarmer && (
            <Link href={ROUTES.LISTINGS_CREATE}>
              <Button size="md" leftIcon={<Plus className="w-4 h-4" />}>
                New Listing
              </Button>
            </Link>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {mockStats.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-gray-900">
                {isFarmer ? "Your Listings" : "Available Products"}
              </h2>
              <Link href={ROUTES.LISTINGS}>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <ListingsGrid listings={mockListings} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <RecentActivity activities={mockActivities} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-gray-900">
              Recent Orders
            </h2>
            <Link href={ROUTES.ORDERS}>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <OrdersList orders={mockOrders} userType={isFarmer ? "farmer" : "buyer"} />
        </div>
      </motion.div>
    </div>
  );
}
