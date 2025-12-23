"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  MapPin,
  Star,
  Calendar,
  User,
  Phone,
  Eye,
  Share2,
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  IndianRupee,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import type { Listing, ListingStatus } from "@/types/listing";

interface ListingDetailProps {
  listing: Listing;
  onContact?: () => void;
  onBuy?: () => void;
  isOwner?: boolean;
}

const statusConfig: Record<
  ListingStatus,
  { variant: "success" | "warning" | "error" | "info"; label: string }
> = {
  DRAFT: { variant: "warning", label: "Draft" },
  PENDING: { variant: "warning", label: "Pending" },
  ACTIVE: { variant: "success", label: "Active" },
  SOLD: { variant: "info", label: "Sold Out" },
  EXPIRED: { variant: "error", label: "Expired" },
};

export function ListingDetail({
  listing,
  onContact,
  onBuy,
  isOwner = false,
}: ListingDetailProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const config = statusConfig[listing.status];
  const images = listing.images || [];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
          {images.length > 0 ? (
            <>
              <motion.img
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={images[currentImage]}
                alt={listing.cropName}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-800" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          currentImage === index
                            ? "bg-white w-6"
                            : "bg-white/50 hover:bg-white/75"
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Package className="h-24 w-24" />
            </div>
          )}
          <div className="absolute top-4 left-4">
            <Badge variant={config.variant} size="lg">
              {config.label}
            </Badge>
          </div>
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={cn(
                  "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                  currentImage === index
                    ? "border-forest"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img
                  src={image}
                  alt={`${listing.cropName} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1
              className="text-2xl md:text-3xl font-bold text-gray-800"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {listing.cropName}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={cn(
                  "p-2 rounded-full border transition-all",
                  isWishlisted
                    ? "bg-error/10 border-error text-error"
                    : "border-gray-200 text-gray-400 hover:text-error hover:border-error"
                )}
              >
                <Heart
                  className={cn("h-5 w-5", isWishlisted && "fill-current")}
                />
              </button>
              <button className="p-2 rounded-full border border-gray-200 text-gray-400 hover:text-forest hover:border-forest transition-all">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {listing.location.village || listing.location.district}, {listing.location.state}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {listing.viewCount || 0} views
            </span>
          </div>

          {listing.qualityGrade && (
            <div className="inline-flex items-center gap-1 bg-gold/10 text-gold px-3 py-1.5 rounded-full">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{listing.qualityGrade} Grade</span>
            </div>
          )}
        </div>

        <div className="bg-forest/5 rounded-xl p-6">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-forest">
              {formatCurrency(listing.pricePerUnit)}
            </span>
            <span className="text-gray-500">per {listing.unit}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Available Quantity</span>
              <p className="font-semibold text-gray-800">
                {listing.quantity} {listing.unit}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Total Value</span>
              <p className="font-semibold text-gray-800">
                {formatCurrency(listing.pricePerUnit * listing.quantity)}
              </p>
            </div>
          </div>
        </div>

        {listing.description && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {listing.description}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Package className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500">Category</span>
              <p className="font-medium text-gray-800 text-sm">
                {listing.cropType}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <span className="text-xs text-gray-500">Listed On</span>
              <p className="font-medium text-gray-800 text-sm">
                {formatDate(listing.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {listing.seller && (
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-800 mb-3">Seller Details</h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-forest/10 rounded-full flex items-center justify-center">
                <User className="h-7 w-7 text-forest" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {listing.farmerName || "Seller"}
                </p>
                <p className="text-sm text-gray-500">
                  {listing.location.district}, {listing.location.state}
                </p>
              </div>
            </div>
          </div>
        )}

        {!isOwner && listing.status === "ACTIVE" && (
          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              fullWidth
              leftIcon={<MessageCircle className="h-5 w-5" />}
              onClick={onContact}
            >
              Contact Seller
            </Button>
            <Button
              fullWidth
              leftIcon={<IndianRupee className="h-5 w-5" />}
              onClick={onBuy}
            >
              Buy Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
