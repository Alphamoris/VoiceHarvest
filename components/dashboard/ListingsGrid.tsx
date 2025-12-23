"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Package, MapPin, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { NoListings } from "@/components/common/EmptyState";
import { formatCurrency, cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import type { Listing } from "@/types/listing";

interface ListingsGridProps {
  listings: Listing[];
  showViewAll?: boolean;
  maxItems?: number;
}

export function ListingsGrid({
  listings,
  showViewAll = true,
  maxItems,
}: ListingsGridProps) {
  const displayListings = maxItems ? listings.slice(0, maxItems) : listings;

  if (displayListings.length === 0) {
    return <NoListings />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2
          className="text-lg font-semibold text-gray-800"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your Listings
        </h2>
        {showViewAll && listings.length > (maxItems || 0) && (
          <Link href={ROUTES.dashboard.listings}>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View All
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayListings.map((listing, index) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={ROUTES.dashboard.listingDetail(listing.id)}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-soft overflow-hidden border border-gray-100 hover:border-forest/30 transition-colors"
              >
                <div className="aspect-video bg-gray-100 relative">
                  {listing.images && listing.images.length > 0 ? (
                    <img
                      src={listing.images[0]}
                      alt={listing.cropName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Package className="h-12 w-12" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={
                        listing.status === "ACTIVE"
                          ? "success"
                          : listing.status === "SOLD"
                          ? "info"
                          : "warning"
                      }
                    >
                      {listing.status}
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {listing.cropName}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{listing.location.village || listing.location.district}, {listing.location.state}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-forest">
                        {formatCurrency(listing.pricePerUnit)}
                        <span className="text-sm font-normal text-gray-500">
                          /{listing.unit}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        {listing.quantity} {listing.unit} available
                      </p>
                    </div>
                    {listing.qualityGrade && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-gold fill-gold" />
                        <span className="text-sm font-medium text-gray-700">
                          {listing.qualityGrade}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
