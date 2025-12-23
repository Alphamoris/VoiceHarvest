import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be less than 15 digits")
      .regex(/^[+]?[0-9\s-]+$/, "Please enter a valid phone number"),
    userType: z.enum(["FARMER", "BUYER"]).describe("Please select your user type"),
    state: z.string().min(1, "Please select your state"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be less than 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be less than 128 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const createListingSchema = z.object({
  cropType: z.string().min(1, "Please select a crop type"),
  cropName: z.string().min(1, "Please select a crop"),
  variety: z.string().optional(),
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .max(100000, "Quantity seems too high"),
  unit: z.enum(["kg", "quintal", "ton"]),
  pricePerUnit: z
    .number()
    .min(1, "Price must be at least ₹1")
    .max(100000, "Price seems too high"),
  qualityGrade: z.enum(["A+", "A", "B", "C"]).optional(),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  location: z.string().optional(),
  state: z.string().min(1, "Please select your state"),
  district: z.string().optional(),
  pickupDetails: z.string().optional(),
  harvestDate: z.string().optional(),
});

export const updateListingSchema = z.object({
  quantity: z.number().min(1).max(100000).optional(),
  pricePerUnit: z.number().min(1).max(100000).optional(),
  status: z.enum(["ACTIVE", "PENDING", "SOLD"]).optional(),
  description: z.string().max(500).optional(),
});

export const createOrderSchema = z.object({
  listingId: z.string().min(1, "Listing ID is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  deliveryAddress: z.string().optional(),
  notes: z.string().optional(),
});

export const updateOrderSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"]).optional(),
  paymentStatus: z.enum(["PENDING", "VERIFIED", "FAILED", "REFUNDED"]).optional(),
  notes: z.string().optional(),
});

export const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits"),
  state: z.string().min(1, "Please select your state"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type CreateListingFormData = z.infer<typeof createListingSchema>;
export type UpdateListingFormData = z.infer<typeof updateListingSchema>;
export type CreateOrderFormData = z.infer<typeof createOrderSchema>;
export type UpdateOrderFormData = z.infer<typeof updateOrderSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
