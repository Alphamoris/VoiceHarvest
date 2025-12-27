"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { OrderDetail } from "@/components/orders";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import type { Order, Listing, User } from "@/types";

const mockSeller: User = {
  id: "seller1",
  name: "Ramesh Kumar",
  email: "ramesh@example.com",
  phone: "+91 98765 43210",
  role: "FARMER",
  location: {
    state: "Maharashtra",
    district: "Pune",
    village: "Khed",
  },
  createdAt: new Date("2023-01-15"),
  updatedAt: new Date(),
};

const mockBuyer: User = {
  id: "buyer1",
  name: "Priya Sharma",
  email: "priya@example.com",
  phone: "+91 98765 12345",
  role: "BUYER",
  location: {
    state: "Maharashtra",
    district: "Mumbai",
  },
  createdAt: new Date("2023-06-20"),
  updatedAt: new Date(),
};

const mockListing: Listing = {
  id: "1",
  title: "Fresh Organic Tomatoes",
  description: "Freshly harvested organic tomatoes from our family farm.",
  cropType: "VEGETABLES",
  quantity: 100,
  unit: "KG",
  pricePerUnit: 40,
  qualityGrade: "A",
  images: ["/turmeric.jpg"],
  location: { state: "Maharashtra", district: "Pune", village: "Khed" },
  status: "ACTIVE",
  sellerId: "seller1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockOrder: Order = {
  id: "1",
  listingId: "1",
  buyerId: "buyer1",
  sellerId: "seller1",
  quantity: 50,
  totalAmount: 2000,
  status: "CONFIRMED",
  paymentStatus: "PAID",
  deliveryAddress: {
    fullAddress: "123 Market Road, Dadar, Mumbai",
    landmark: "Near Bus Stand",
    pincode: "400014",
  },
  expectedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  updatedAt: new Date(),
  listing: mockListing,
  buyer: mockBuyer,
  seller: mockSeller,
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const handleConfirm = async () => {
    console.log("Confirming order:", id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleShip = async () => {
    console.log("Shipping order:", id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleCancel = async () => {
    console.log("Cancelling order:", id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link
          href={ROUTES.ORDERS}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-forest transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Orders</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <OrderDetail
          order={{ ...mockOrder, id }}
          userType="farmer"
          onConfirm={handleConfirm}
          onShip={handleShip}
          onCancel={handleCancel}
        />
      </motion.div>
    </div>
  );
}
