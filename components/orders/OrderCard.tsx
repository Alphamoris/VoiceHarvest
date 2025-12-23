"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Package, MapPin, Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { formatCurrency, formatRelativeTime, cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import type { Order, OrderStatus } from "@/types/order";

interface OrderCardProps {
  order: Order;
  userType?: "farmer" | "buyer";
  delay?: number;
}

const statusConfig: Record<
  OrderStatus,
  { variant: "success" | "warning" | "error" | "info"; label: string }
> = {
  PENDING: { variant: "warning", label: "Pending" },
  CONFIRMED: { variant: "info", label: "Confirmed" },
  SHIPPED: { variant: "info", label: "Shipped" },
  DELIVERED: { variant: "success", label: "Delivered" },
  CANCELLED: { variant: "error", label: "Cancelled" },
  REFUNDED: { variant: "warning", label: "Refunded" },
  RETURNED: { variant: "warning", label: "Returned" },
};

export function OrderCard({
  order,
  userType = "farmer",
  delay = 0,
}: OrderCardProps) {
  const config = statusConfig[order.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Link href={ROUTES.dashboard.orderDetail(order.id)}>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-xl shadow-soft p-5 border border-gray-100 hover:border-forest/30 transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              {order.listing?.images?.[0] ? (
                <img
                  src={order.listing.images[0]}
                  alt={order.listing.cropName}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Package className="h-10 w-10 text-gray-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {order.listing?.cropName || "Order"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Order #{order.id.slice(-8).toUpperCase()}
                  </p>
                </div>
                <Badge variant={config.variant}>{config.label}</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Quantity</span>
                  <p className="font-medium text-gray-800">
                    {order.quantity} {order.listing?.unit || "kg"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Total</span>
                  <p className="font-medium text-forest">
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">
                    {userType === "farmer" ? "Buyer" : "Seller"}
                  </span>
                  <p className="font-medium text-gray-800">
                    {userType === "farmer"
                      ? order.buyerName || "Buyer"
                      : order.farmerName || "Farmer"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Date</span>
                  <p className="font-medium text-gray-800">
                    {formatRelativeTime(order.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate max-w-[200px]">
                    {order.deliveryAddress?.fullAddress?.split(",")[0] || "Location"}
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
