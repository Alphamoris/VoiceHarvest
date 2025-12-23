import type { Listing } from "./listing";
import type { User } from "./auth";

export interface DeliveryAddress {
  fullAddress: string;
  landmark?: string;
  pincode: string;
}

export interface Order {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  farmerId?: string;
  buyerName?: string;
  farmerName?: string;
  cropName?: string;
  quantity: number;
  unit?: string;
  pricePerUnit?: number;
  totalAmount: number;
  totalPrice?: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  deliveryAddress: DeliveryAddress;
  expectedDelivery?: Date;
  deliveredAt?: Date;
  notes?: string;
  timeline?: OrderTimelineEvent[];
  listing?: Listing;
  buyer?: User;
  seller?: User;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "RETURNED" | "REFUNDED";

export type PaymentStatus = "PENDING" | "VERIFIED" | "PAID" | "FAILED" | "REFUNDED";

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: Date;
  description: string;
}

export interface CreateOrderData {
  listingId: string;
  quantity: number;
  deliveryAddress?: string;
  notes?: string;
}

export interface UpdateOrderData {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  notes?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  sortBy?: "newest" | "oldest" | "amount_high" | "amount_low";
  page?: number;
  limit?: number;
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  totalPages: number;
}
