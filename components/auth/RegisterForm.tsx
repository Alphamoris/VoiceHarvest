"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Phone,
  MapPin,
  Building,
  Loader2,
} from "lucide-react";
import { registerSchema, type RegisterFormData } from "@/lib/validators";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/shared/Button";
import { ROUTES } from "@/lib/constants";
import { INDIAN_STATES } from "@/types/listing";
import type { UserType } from "@/types/auth";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { register: registerUser, loginWithGoogle, loading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const handleGoogleSignup = async () => {
    try {
      setGoogleLoading(true);
      await loginWithGoogle();
      showToast("Account created successfully!", "success");
      router.push(ROUTES.dashboard.home);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Google signup failed";
      showToast(message, "error");
    } finally {
      setGoogleLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      userType: "FARMER",
      state: "",
      terms: false,
    },
  });

  const userType = watch("userType");

  const nextStep = async () => {
    const fieldsToValidate =
      step === 1
        ? (["fullName", "email", "phone", "userType"] as const)
        : (["state"] as const);

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.email, data.password, {
        name: data.fullName,
        role: data.userType as "FARMER" | "BUYER" | "ADMIN",
        phone: data.phone,
        location: {
          state: data.state,
          district: "",
        },
      });
      showToast("Account created successfully!", "success");
      router.push(ROUTES.dashboard.home);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed";
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
            Create Account
          </h1>
          <p className="text-gray-600">Join our farming community</p>
        </div>

        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <motion.div
                animate={{
                  scale: step === s ? 1.2 : 1,
                  backgroundColor: step >= s ? "#1B5E20" : "#E5E7EB",
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s ? "text-white" : "text-gray-500"
                }`}
              >
                {s}
              </motion.div>
              {s < 3 && (
                <div
                  className={`w-12 h-0.5 ${
                    step > s ? "bg-forest" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <motion.button
          type="button"
          onClick={handleGoogleSignup}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {googleLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
          ) : (
            <GoogleIcon className="h-5 w-5" />
          )}
          <span className="font-medium text-gray-700">
            {googleLoading ? "Signing up..." : "Continue with Google"}
          </span>
        </motion.button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or sign up with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    {...register("fullName")}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
                    placeholder="Your full name"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-error text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-error text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    {...register("phone")}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
                    placeholder="10-digit mobile number"
                  />
                </div>
                {errors.phone && (
                  <p className="text-error text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "FARMER" as const, label: "Farmer", icon: "🌾" },
                    { value: "BUYER" as const, label: "Buyer", icon: "🛒" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        userType === option.value
                          ? "border-forest bg-forest/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        {...register("userType")}
                        value={option.value}
                        className="sr-only"
                      />
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-medium text-gray-800">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.userType && (
                  <p className="text-error text-sm mt-1">
                    {errors.userType.message}
                  </p>
                )}
              </div>

              <Button type="button" fullWidth onClick={nextStep}>
                Continue
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    {...register("state")}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all appearance-none bg-white"
                  >
                    <option value="">Select state</option>
                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.state && (
                  <p className="text-error text-sm mt-1">{errors.state.message}</p>
                )}
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="secondary" onClick={prevStep}>
                  Back
                </Button>
                <Button type="button" fullWidth onClick={nextStep}>
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Min 8 chars, 1 uppercase, 1 lowercase, 1 number
                </p>
                {errors.password && (
                  <p className="text-error text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-error text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  {...register("terms")}
                  id="terms"
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-forest focus:ring-forest"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-forest hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-forest hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <p className="text-error text-sm">{errors.terms.message}</p>
              )}

              <div className="flex gap-3">
                <Button type="button" variant="secondary" onClick={prevStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  loading={loading}
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Create Account
                </Button>
              </div>
            </motion.div>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href={ROUTES.auth.login}
              className="text-forest font-semibold hover:text-forest/80 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
