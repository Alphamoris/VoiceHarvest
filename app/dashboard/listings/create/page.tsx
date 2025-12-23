"use client";

import { motion } from "framer-motion";
import { ListingForm } from "@/components/listings";
import type { CreateListingFormData } from "@/lib/validators";

export default function CreateListingPage() {
  const handleSubmit = async (data: CreateListingFormData) => {
    console.log("Creating listing:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
          Create New Listing
        </h1>
        <p className="text-gray-600 mt-1">
          Fill in the details below to list your produce for sale.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ListingForm onSubmit={handleSubmit} />
      </motion.div>
    </div>
  );
}
