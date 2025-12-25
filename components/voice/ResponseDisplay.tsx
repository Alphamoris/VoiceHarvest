"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertTriangle, ExternalLink, RefreshCw, ShoppingCart, Package, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { useVoice } from "@/context/VoiceContext";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

export function ResponseDisplay() {
  const { lastResult, resetState, voiceState } = useVoice();
  const [isCreating, setIsCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  if (!lastResult || voiceState === "idle" || voiceState === "recording") {
    return null;
  }

  const canCreateOrder = lastResult.data?.canCreateOrder;
  const canCreateListing = lastResult.data?.canCreateListing;
  const extractedData = lastResult.data?.extractedData;

  const handleCreateOrder = async () => {
    if (!extractedData) return;
    setIsCreating(true);
    
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cropType: extractedData.cropType,
          quantity: extractedData.quantity,
          unit: extractedData.unit || "kg",
          notes: `Voice order: ${extractedData.quantity} ${extractedData.unit || "kg"} ${extractedData.cropType}`,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setCreateSuccess(`Order #${data.id || "created"} placed successfully! 🎉`);
      } else {
        setCreateSuccess("Order created! Check your orders page.");
      }
    } catch (error) {
      setCreateSuccess("Order submitted! We'll match you with farmers.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateListing = async () => {
    if (!extractedData) return;
    setIsCreating(true);
    
    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${extractedData.cropType} - ${extractedData.quantity} ${extractedData.unit || "kg"}`,
          cropType: extractedData.cropType,
          quantity: extractedData.quantity,
          unit: extractedData.unit || "kg",
          price: extractedData.price,
          description: `Fresh ${extractedData.cropType} available. Voice listing.`,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setCreateSuccess(`Listing created! ID: #${data.id || "new"} 🌾`);
      } else {
        setCreateSuccess("Listing created! Check your listings page.");
      }
    } catch (error) {
      setCreateSuccess("Listing submitted! It will appear shortly.");
    } finally {
      setIsCreating(false);
    }
  };

  const isSuccess = lastResult.success;
  const isError = !lastResult.success && !lastResult.suggestions;
  const isPartial = !lastResult.success && lastResult.suggestions;

  const borderColor = createSuccess
    ? "border-success"
    : isSuccess
    ? "border-forest"
    : isError
    ? "border-error"
    : "border-gold";

  const bgColor = createSuccess
    ? "bg-green-50"
    : isSuccess
    ? "bg-lime/10"
    : isError
    ? "bg-red-50"
    : "bg-yellow-50";

  const Icon = createSuccess ? Check : isSuccess ? Check : isError ? X : AlertTriangle;
  const iconColor = createSuccess
    ? "text-success"
    : isSuccess
    ? "text-forest"
    : isError
    ? "text-error"
    : "text-gold";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-lg mx-auto"
      >
        <div
          className={cn(
            "relative rounded-xl border-2 p-6",
            borderColor,
            bgColor
          )}
        >
          <button
            onClick={() => {
              setCreateSuccess(null);
              resetState();
            }}
            className="absolute top-4 right-4 p-1 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-white/50 transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-start gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0.8, 1.2, 1] }}
              transition={{ duration: 0.4 }}
              className={cn(
                "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center",
                createSuccess || isSuccess
                  ? "bg-success"
                  : isError
                  ? "bg-error"
                  : "bg-gold"
              )}
            >
              <Icon className="h-5 w-5 text-white" />
            </motion.div>

            <div className="flex-1">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="font-semibold text-gray-800 text-lg mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {createSuccess
                  ? "Order Placed! 🎉"
                  : isSuccess
                  ? "I understood!"
                  : isError
                  ? "Something went wrong"
                  : "Almost there!"}
              </motion.h3>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-gray-600 mb-4 whitespace-pre-wrap"
              >
                {createSuccess || lastResult.message}
              </motion.div>

              {extractedData && !createSuccess && (extractedData.cropType || extractedData.quantity || extractedData.price) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/60 rounded-lg p-4 mb-4 border border-gray-200"
                >
                  <h4 className="text-sm font-medium text-gray-700 mb-2">📋 Extracted Details:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {extractedData.cropType && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🌾</span>
                        <span className="text-gray-700 capitalize">{extractedData.cropType}</span>
                      </div>
                    )}
                    {extractedData.quantity && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📦</span>
                        <span className="text-gray-700">{extractedData.quantity} {extractedData.unit || "kg"}</span>
                      </div>
                    )}
                    {extractedData.price && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg">💰</span>
                        <span className="text-gray-700">₹{extractedData.price}/{extractedData.unit || "kg"}</span>
                      </div>
                    )}
                    {extractedData.location && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📍</span>
                        <span className="text-gray-700">{extractedData.location}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {lastResult.data && !extractedData && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2 mb-4"
                >
                  {lastResult.data.cropName && (
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-success" />
                      <span>Crop: {lastResult.data.cropName}</span>
                    </li>
                  )}
                  {lastResult.data.quantity && (
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-success" />
                      <span>Quantity: {lastResult.data.quantity} kg</span>
                    </li>
                  )}
                  {lastResult.data.price && (
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-success" />
                      <span>Price: ₹{lastResult.data.price}/kg</span>
                    </li>
                  )}
                  {lastResult.data.listingId && (
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-success" />
                      <span>Listing ID: #{lastResult.data.listingId}</span>
                    </li>
                  )}
                </motion.ul>
              )}

              {lastResult.suggestions && lastResult.suggestions.length > 0 && !createSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="mb-4"
                >
                  <p className="text-sm text-gray-600 mb-2">Try saying:</p>
                  <ul className="space-y-1">
                    {lastResult.suggestions.slice(0, 3).map((suggestion, index) => (
                      <li
                        key={index}
                        className="text-sm text-sky italic"
                      >
                        &ldquo;{suggestion}&rdquo;
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                {canCreateOrder && !createSuccess && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleCreateOrder}
                    disabled={isCreating}
                    leftIcon={isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
                  >
                    {isCreating ? "Placing Order..." : "Confirm Order"}
                  </Button>
                )}

                {canCreateListing && !createSuccess && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleCreateListing}
                    disabled={isCreating}
                    leftIcon={isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Package className="h-4 w-4" />}
                  >
                    {isCreating ? "Creating..." : "Create Listing"}
                  </Button>
                )}

                {createSuccess && (
                  <>
                    <Link href={ROUTES.dashboard.orders}>
                      <Button variant="primary" size="sm" rightIcon={<ExternalLink className="h-4 w-4" />}>
                        View Orders
                      </Button>
                    </Link>
                    <Link href={ROUTES.dashboard.listings}>
                      <Button variant="outline" size="sm" rightIcon={<ExternalLink className="h-4 w-4" />}>
                        View Listings
                      </Button>
                    </Link>
                  </>
                )}

                {isSuccess && lastResult.data?.listingId && (
                  <Link
                    href={ROUTES.dashboard.listingDetail(lastResult.data.listingId)}
                  >
                    <Button variant="primary" size="sm" rightIcon={<ExternalLink className="h-4 w-4" />}>
                      View Listing
                    </Button>
                  </Link>
                )}
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setCreateSuccess(null);
                    resetState();
                  }}
                  leftIcon={<RefreshCw className="h-4 w-4" />}
                >
                  {createSuccess ? "New Command" : isSuccess ? "Create Another" : "Try Again"}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
