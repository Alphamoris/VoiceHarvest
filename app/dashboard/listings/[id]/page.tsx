"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { ListingDetail } from "@/components/listings";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import type { Listing, User } from "@/types";

const mockSeller: User = {
  id: "1",
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

const mockListing: Listing = {
  id: "1",
  title: "Fresh Organic Tomatoes",
  description:
    "Freshly harvested organic tomatoes from our family farm. We use traditional farming methods without any pesticides or chemical fertilizers. Our tomatoes are known for their rich flavor and longer shelf life. Perfect for restaurants, hotels, and health-conscious households. We can arrange delivery within Maharashtra. Minimum order 25 KG.",
  cropType: "VEGETABLES",
  quantity: 100,
  unit: "KG",
  pricePerUnit: 40,
  qualityGrade: "A",
  images: ["/tomatoes.jpg", "/tomatoes-2.jpg", "/farm.jpg"],
  location: { state: "Maharashtra", district: "Pune", village: "Khed" },
  status: "ACTIVE",
  sellerId: "1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ListingDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const handleContact = () => {
    console.log("Contacting seller:", mockSeller.id);
  };

  const handleBuy = () => {
    console.log("Buying listing:", id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link
          href={ROUTES.LISTINGS}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-forest transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Listings</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ListingDetail
          listing={{ ...mockListing, id }}
          onContact={handleContact}
          onBuy={handleBuy}
        />
      </motion.div>
    </div>
  );
}
