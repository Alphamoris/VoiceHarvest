"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Package, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { NoOrders } from "@/components/common/EmptyState";
import { formatCurrency, formatRelativeTime, cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import type { Order, OrderStatus } from "@/types/order";

interface OrdersListProps {
  orders: Order[];
  showViewAll?: boolean;
  maxItems?: number;
  userType?: "farmer" | "buyer";
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

export function OrdersList({
  orders,
  showViewAll = true,
  maxItems,
  userType = "farmer",
}: OrdersListProps) {
  const displayOrders = maxItems ? orders.slice(0, maxItems) : orders;

  if (displayOrders.length === 0) {
    return <NoOrders />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2
          className="text-lg font-semibold text-gray-800"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {userType === "farmer" ? "Recent Orders" : "Your Orders"}
        </h2>
        {showViewAll && orders.length > (maxItems || 0) && (
          <Link href={ROUTES.dashboard.orders}>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View All
            </Button>
          </Link>
        )}
      </div>

      <div className="space-y-3">
        {displayOrders.map((order, index) => {
          const config = statusConfig[order.status];

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={ROUTES.dashboard.orderDetail(order.id)}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="bg-white rounded-xl shadow-soft p-4 border border-gray-100 hover:border-forest/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {order.listing?.images?.[0] ? (
                        <img
                          src={order.listing.images[0]}
                          alt={order.listing.cropName}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="h-8 w-8 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
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

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Package className="h-3.5 w-3.5" />
                          {order.quantity} {order.listing?.unit || "kg"}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {order.deliveryAddress?.fullAddress?.split(",")[0] || "Location"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {formatRelativeTime(order.createdAt)}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-bold text-forest">
                          {formatCurrency(order.totalAmount)}
                        </span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
