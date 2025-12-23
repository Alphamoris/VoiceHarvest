"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/shared/Button";
import { ROUTES } from "@/lib/constants";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword, loading } = useAuth();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await resetPassword(data.email);
      setEmailSent(true);
      showToast("Password reset email sent!", "success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send reset email";
      showToast(message, "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-medium p-8">
        <div className="text-center mb-8">
          <Link href={ROUTES.home} className="inline-block mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-forest"
              style={{ fontFamily: "var(--font-display)" }}
            >
              🌾 VoiceHarvest
            </motion.div>
          </Link>
          <h1
            className="text-2xl font-bold text-gray-800 mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {emailSent ? "Check Your Email" : "Forgot Password?"}
          </h1>
          <p className="text-gray-600">
            {emailSent
              ? "We've sent you a password reset link"
              : "No worries, we'll send you reset instructions"}
          </p>
        </div>

        {emailSent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center"
            >
              <Check className="h-10 w-10 text-success" />
            </motion.div>

            <div>
              <p className="text-gray-600 mb-2">
                We sent an email to
              </p>
              <p className="font-medium text-gray-800">{getValues("email")}</p>
            </div>

            <p className="text-sm text-gray-500">
              Didn&apos;t receive the email? Check your spam folder or{" "}
              <button
                onClick={() => setEmailSent(false)}
                className="text-forest font-medium hover:underline"
              >
                try again
              </button>
            </p>

            <Link href={ROUTES.auth.login}>
              <Button fullWidth leftIcon={<ArrowLeft className="h-5 w-5" />}>
                Back to Login
              </Button>
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-error text-sm mt-1"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <Button
              type="submit"
              fullWidth
              loading={loading}
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              Send Reset Link
            </Button>

            <div className="text-center">
              <Link
                href={ROUTES.auth.login}
                className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-forest transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}
