"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { OrderCard } from "@/components/orders";
import { Button } from "@/components/shared/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { ShoppingCart, Filter, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { Order, Listing } from "@/types";

const mockListings: Record<string, Listing> = {
  "1": {
    id: "1",
    title: "Fresh Organic Tomatoes",
    description: "Freshly harvested organic tomatoes",
    cropType: "VEGETABLES",
    quantity: 100,
    unit: "KG",
    pricePerUnit: 40,
    qualityGrade: "A",
    images: ["/tomatoes.jpg"],
    location: { state: "Maharashtra", district: "Pune", village: "Khed" },
    status: "ACTIVE",
    sellerId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "2": {
    id: "2",
    title: "Premium Basmati Rice",
    description: "Long grain basmati rice",
    cropType: "GRAINS",
    quantity: 500,
    unit: "KG",
    pricePerUnit: 85,
    qualityGrade: "A+",
    images: ["/rice.jpg"],
    location: { state: "Punjab", district: "Amritsar", village: "Tarn Taran" },
    status: "ACTIVE",
    sellerId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

const mockOrders: Order[] = [
  {
    id: "1",
    listingId: "1",
    buyerId: "user1",
    sellerId: "seller1",
    quantity: 50,
    totalAmount: 2000,
    status: "CONFIRMED",
    paymentStatus: "PAID",
    deliveryAddress: {
      fullAddress: "123 Market Road, Pune",
      landmark: "Near Bus Stand",
      pincode: "411001",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    listing: mockListings["1"],
  },
  {
    id: "2",
    listingId: "2",
    buyerId: "user1",
    sellerId: "seller2",
    quantity: 100,
    totalAmount: 8500,
    status: "SHIPPED",
    paymentStatus: "PAID",
    deliveryAddress: {
      fullAddress: "456 Farm Lane, Mumbai",
      landmark: "Opposite Temple",
      pincode: "400001",
    },
    expectedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    listing: mockListings["2"],
  },
  {
    id: "3",
    listingId: "1",
    buyerId: "user2",
    sellerId: "user1",
    quantity: 25,
    totalAmount: 1000,
    status: "PENDING",
    paymentStatus: "PENDING",
    deliveryAddress: {
      fullAddress: "789 Village Road, Nashik",
      landmark: "Near School",
      pincode: "422001",
    },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    listing: mockListings["1"],
  },
];

const statusFilters = [
  { value: "", label: "All Orders" },
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function OrdersPage() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredOrders = mockOrders.filter((order) => {
    if (statusFilter && order.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
            My Orders
          </h1>
          <p className="text-gray-600 mt-1">
            Track and manage all your {user?.role === "FARMER" ? "sales" : "purchases"}.
          </p>
        </div>
        <Button
          variant="outline"
          size="md"
          leftIcon={<Filter className="w-4 h-4" />}
          rightIcon={<ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filter
        </Button>
      </motion.div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-4"
        >
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === filter.value
                    ? "bg-forest text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {filteredOrders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <EmptyState
            icon={<ShoppingCart className="w-16 h-16 text-gray-400" />}
            title="No orders found"
            description={
              statusFilter
                ? "Try adjusting your filters to see more orders."
                : user?.role === "FARMER"
                ? "You haven't received any orders yet. Create listings to start selling!"
                : "You haven't placed any orders yet. Browse listings to find fresh produce."
            }
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <OrderCard order={order} userType={user?.role === "FARMER" ? "farmer" : "buyer"} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
