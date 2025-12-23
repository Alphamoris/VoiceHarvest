"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { loginSchema, type LoginFormData } from "@/lib/validators";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/shared/Button";
import { ROUTES } from "@/lib/constants";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      showToast("Welcome back!", "success");
      router.push(ROUTES.dashboard.home);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
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
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

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

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-error text-sm mt-1"
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-forest focus:ring-forest border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              href={ROUTES.auth.forgotPassword}
              className="text-sm text-forest hover:text-forest/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            fullWidth
            loading={loading}
            rightIcon={<ArrowRight className="h-5 w-5" />}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href={ROUTES.auth.register}
              className="text-forest font-semibold hover:text-forest/80 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
