"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ListingCard, ListingFilter } from "@/components/listings";
import { Button } from "@/components/shared/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { Plus, Package, Mic } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { useAuth } from "@/contexts/AuthContext";
import type { Listing } from "@/types";

const mockListings: Listing[] = [
  {
    id: "1",
    title: "Fresh Organic Tomatoes",
    description: "Freshly harvested organic tomatoes from our farm. No pesticides used. Perfect for restaurants and households.",
    cropType: "VEGETABLES",
    quantity: 100,
    unit: "KG",
    pricePerUnit: 40,
    qualityGrade: "A",
    images: ["/turmeric.jpg"],
    location: { state: "Maharashtra", district: "Pune", village: "Khed" },
    status: "ACTIVE",
    sellerId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Premium Basmati Rice",
    description: "Long grain basmati rice, naturally grown in the fertile lands of Punjab.",
    cropType: "GRAINS",
    quantity: 500,
    unit: "KG",
    pricePerUnit: 85,
    qualityGrade: "A+",
    images: ["/rice.webp"],
    location: { state: "Punjab", district: "Amritsar", village: "Tarn Taran" },
    status: "ACTIVE",
    sellerId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Fresh Alphonso Mangoes",
    description: "Authentic Ratnagiri Alphonso mangoes, the king of fruits.",
    cropType: "FRUITS",
    quantity: 200,
    unit: "KG",
    pricePerUnit: 350,
    qualityGrade: "A+",
    images: ["/wheat.webp"],
    location: { state: "Maharashtra", district: "Ratnagiri", village: "Rajapur" },
    status: "ACTIVE",
    sellerId: "3",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Organic Green Cardamom",
    description: "Premium quality green cardamom from the hills of Kerala.",
    cropType: "SPICES",
    quantity: 50,
    unit: "KG",
    pricePerUnit: 2500,
    qualityGrade: "A",
    images: ["/almonds.webp"],
    location: { state: "Kerala", district: "Idukki", village: "Munnar" },
    status: "ACTIVE",
    sellerId: "4",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

type FilterState = {
  search: string;
  cropType: string;
  state: string;
  qualityGrade: string;
  status: "" | "ACTIVE" | "PENDING" | "SOLD" | "EXPIRED" | "DRAFT";
  priceMin: number | "";
  priceMax: number | "";
  sortBy: "newest" | "price_low" | "price_high" | "quantity";
};

export default function ListingsPage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    cropType: "",
    state: "",
    qualityGrade: "",
    status: "",
    priceMin: "",
    priceMax: "",
    sortBy: "newest",
  });

  const isFarmer = user?.role === "FARMER";

  const filteredListings = useMemo(() => {
    return mockListings.filter((listing) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          listing.title.toLowerCase().includes(searchLower) ||
          listing.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }
      if (filters.cropType && listing.cropType !== filters.cropType) return false;
      if (filters.state && listing.location.state !== filters.state) return false;
      if (filters.qualityGrade && listing.qualityGrade !== filters.qualityGrade) return false;
      if (filters.status && listing.status !== filters.status) return false;
      if (filters.priceMin && listing.pricePerUnit < filters.priceMin) return false;
      if (filters.priceMax && listing.pricePerUnit > filters.priceMax) return false;
      return true;
    });
  }, [filters]);

  const handleEdit = (listing: Listing) => {
    console.log("Edit listing:", listing.id);
  };

  const handleDelete = (listing: Listing) => {
    console.log("Delete listing:", listing.id);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
            {isFarmer ? "My Listings" : "Browse Products"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isFarmer
              ? "Manage your product listings and track their performance."
              : "Discover fresh produce directly from farmers."}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href={ROUTES.VOICE}>
            <Button variant="outline" size="md" leftIcon={<Mic className="w-4 h-4" />}>
              Voice
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ListingFilter
          filters={filters}
          onFilterChange={(newFilters) => setFilters(newFilters)}
        />
      </motion.div>

      {filteredListings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <EmptyState
            icon={<Package className="w-16 h-16 text-gray-400" />}
            title="No listings found"
            description={
              filters.search || filters.cropType || filters.state
                ? "Try adjusting your filters to find more products."
                : isFarmer
                ? "Start by creating your first listing to sell your produce."
                : "No products available at the moment. Check back later!"
            }
            action={
              isFarmer ? (
                <Link href={ROUTES.LISTINGS_CREATE}>
                  <Button>Create Listing</Button>
                </Link>
              ) : undefined
            }
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <ListingCard
                listing={listing}
                showActions={isFarmer && listing.sellerId === user?.id}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
