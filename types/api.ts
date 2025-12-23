export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface HealthCheckResponse {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: Date;
  services: {
    database: boolean;
    firebase: boolean;
    speechApi: boolean;
  };
}

export interface DashboardStats {
  totalListings: number;
  activeListings: number;
  totalOrders: number;
  pendingOrders: number;
  totalEarnings: number;
  monthlyEarnings: number;
  averageRating: number;
  totalReviews: number;
  listingsChange: number;
  ordersChange: number;
  earningsChange: number;
}

export interface RecentActivity {
  id: string;
  type: "order" | "listing" | "voice" | "payment";
  title: string;
  description: string;
  timestamp: Date;
  status: "success" | "pending" | "error";
}
