"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Package, MapPin, Star, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { formatCurrency, formatRelativeTime, cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import type { Listing, ListingStatus } from "@/types/listing";

interface ListingCardProps {
  listing: Listing;
  onEdit?: (listing: Listing) => void;
  onDelete?: (listing: Listing) => void;
  showActions?: boolean;
  delay?: number;
}

const statusConfig: Record<
  ListingStatus,
  { variant: "success" | "warning" | "error" | "info"; label: string }
> = {
  DRAFT: { variant: "warning", label: "Draft" },
  ACTIVE: { variant: "success", label: "Active" },
  PENDING: { variant: "warning", label: "Pending" },
  SOLD: { variant: "info", label: "Sold" },
  EXPIRED: { variant: "error", label: "Expired" },
};

export function ListingCard({
  listing,
  onEdit,
  onDelete,
  showActions = false,
  delay = 0,
}: ListingCardProps) {
  const config = statusConfig[listing.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-white rounded-xl shadow-soft overflow-hidden border border-gray-100 group"
    >
      <Link href={ROUTES.dashboard.listingDetail(listing.id)}>
        <div className="aspect-video bg-gray-100 relative overflow-hidden">
          {listing.images && listing.images.length > 0 ? (
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src={listing.images[0]}
              alt={listing.cropName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Package className="h-16 w-16" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant={config.variant}>{config.label}</Badge>
          </div>
          {listing.qualityGrade && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
              <Star className="h-4 w-4 text-gold fill-gold" />
              <span className="text-sm font-medium text-gray-700">
                {listing.qualityGrade}
              </span>
            </div>
          )}
          {listing.images && listing.images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/50 rounded-lg px-2 py-1 text-white text-xs">
              +{listing.images.length - 1} photos
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={ROUTES.dashboard.listingDetail(listing.id)}>
          <h3 className="font-semibold text-gray-800 text-lg mb-1 hover:text-forest transition-colors">
            {listing.cropName}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <MapPin className="h-3.5 w-3.5" />
          <span>
            {listing.location.village || listing.location.district}, {listing.location.state}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xl font-bold text-forest">
              {formatCurrency(listing.pricePerUnit)}
              <span className="text-sm font-normal text-gray-500">
                /{listing.unit}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">
              {listing.quantity} {listing.unit}
            </p>
            <p className="text-xs text-gray-500">available</p>
          </div>
        </div>

        {listing.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {listing.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Eye className="h-4 w-4" />
            <span>{listing.viewCount || 0} views</span>
          </div>
          <span className="text-xs text-gray-400">
            {formatRelativeTime(listing.createdAt)}
          </span>
        </div>

        {showActions && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t">
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              leftIcon={<Edit className="h-4 w-4" />}
              onClick={(e) => {
                e.preventDefault();
                onEdit?.(listing);
              }}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-error hover:bg-error/10"
              onClick={(e) => {
                e.preventDefault();
                onDelete?.(listing);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
