"use client";

import { motion } from "framer-motion";
import {
  Package,
  MapPin,
  User,
  Phone,
  Mail,
  Calendar,
  IndianRupee,
  CreditCard,
  Truck,
  MessageCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { OrderTimeline } from "./OrderTimeline";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import type { Order, OrderStatus, PaymentStatus } from "@/types/order";

interface OrderDetailProps {
  order: Order;
  userType?: "farmer" | "buyer";
  onConfirm?: () => void;
  onShip?: () => void;
  onCancel?: () => void;
  onContact?: () => void;
  loading?: boolean;
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

const paymentStatusConfig: Record<
  PaymentStatus,
  { variant: "success" | "warning" | "error" | "info"; label: string }
> = {
  PENDING: { variant: "warning", label: "Payment Pending" },
  VERIFIED: { variant: "info", label: "Verified" },
  PAID: { variant: "success", label: "Paid" },
  FAILED: { variant: "error", label: "Failed" },
  REFUNDED: { variant: "info", label: "Refunded" },
};

export function OrderDetail({
  order,
  userType = "farmer",
  onConfirm,
  onShip,
  onCancel,
  onContact,
  loading = false,
}: OrderDetailProps) {
  const orderConfig = statusConfig[order.status];
  const paymentConfig = paymentStatusConfig[order.paymentStatus];

  const canConfirm =
    userType === "farmer" && order.status === "PENDING";
  const canShip =
    userType === "farmer" && order.status === "CONFIRMED";
  const canCancel =
    order.status === "PENDING" || order.status === "CONFIRMED";

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-soft p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1
                className="text-2xl font-bold text-gray-800"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Order #{order.id.slice(-8).toUpperCase()}
              </h1>
              <Badge variant={orderConfig.variant} size="lg">
                {orderConfig.label}
              </Badge>
            </div>
            <p className="text-gray-500">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          <Badge variant={paymentConfig.variant}>{paymentConfig.label}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
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
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {order.listing?.cropName || "Product"}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {order.quantity} {order.unit || "kg"} @{" "}
                {formatCurrency(order.pricePerUnit || 0)}/{order.unit || "kg"}
              </p>
              <p className="text-lg font-bold text-forest">
                {formatCurrency(order.totalAmount)}
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg space-y-3">
            <h3 className="font-semibold text-gray-800">
              {userType === "farmer" ? "Buyer Details" : "Seller Details"}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span>
                  {userType === "farmer"
                    ? order.buyerName || "Buyer"
                    : order.farmerName || "Seller"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>Contact via platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>Message via platform</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <OrderTimeline
            currentStatus={order.status}
            events={order.timeline || []}
          />
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <h3
              className="text-lg font-semibold text-gray-800 mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Delivery Address
            </h3>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="text-gray-600">
                <p>{order.deliveryAddress?.fullAddress || "Address not provided"}</p>
                {order.deliveryAddress?.landmark && (
                  <p className="text-gray-500">Landmark: {order.deliveryAddress.landmark}</p>
                )}
                <p>{order.deliveryAddress?.pincode}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <h3
              className="text-lg font-semibold text-gray-800 mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Order Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Quantity</span>
                <span className="text-gray-800">
                  {order.quantity} {order.unit || "units"}
                </span>
              </div>
              {order.pricePerUnit && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Price per unit</span>
                  <span className="text-gray-800">
                    {formatCurrency(order.pricePerUnit)}
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t font-semibold">
                <span className="text-gray-800">Total</span>
                <span className="text-forest text-lg">
                  {formatCurrency(order.totalAmount || order.totalPrice || 0)}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-3"
          >
            {canConfirm && (
              <Button
                fullWidth
                leftIcon={<CheckCircle className="h-5 w-5" />}
                onClick={onConfirm}
                loading={loading}
              >
                Confirm Order
              </Button>
            )}
            {canShip && (
              <Button
                fullWidth
                leftIcon={<Truck className="h-5 w-5" />}
                onClick={onShip}
                loading={loading}
              >
                Mark as Shipped
              </Button>
            )}
            <Button
              variant="secondary"
              fullWidth
              leftIcon={<MessageCircle className="h-5 w-5" />}
              onClick={onContact}
            >
              Contact {userType === "farmer" ? "Buyer" : "Seller"}
            </Button>
            {canCancel && (
              <Button
                variant="ghost"
                fullWidth
                className="text-error hover:bg-error/10"
                leftIcon={<XCircle className="h-5 w-5" />}
                onClick={onCancel}
                loading={loading}
              >
                Cancel Order
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
