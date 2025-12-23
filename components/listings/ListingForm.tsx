"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  MapPin,
  IndianRupee,
  Scale,
  FileText,
  Upload,
  X,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { createListingSchema, type CreateListingFormData } from "@/lib/validators";
import { Button } from "@/components/shared/Button";
import { CROP_OPTIONS, INDIAN_STATES, QUALITY_GRADES } from "@/types/listing";
import type { Listing } from "@/types/listing";

interface ListingFormProps {
  initialData?: Partial<Listing>;
  onSubmit: (data: CreateListingFormData) => Promise<void>;
  loading?: boolean;
  mode?: "create" | "edit";
}

export function ListingForm({
  initialData,
  onSubmit,
  loading = false,
  mode = "create",
}: ListingFormProps) {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateListingFormData>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      cropType: initialData?.cropType || "",
      cropName: initialData?.cropName || "",
      variety: initialData?.variety || "",
      quantity: initialData?.quantity || 0,
      unit: (initialData?.unit as "kg" | "quintal" | "ton") || "kg",
      pricePerUnit: initialData?.pricePerUnit || 0,
      qualityGrade: (initialData?.qualityGrade as "A+" | "A" | "B" | "C") || undefined,
      description: initialData?.description || "",
      location: initialData?.location?.village || "",
      state: initialData?.location?.state || "",
      district: initialData?.location?.district || "",
      pickupDetails: initialData?.pickupDetails || "",
      harvestDate: undefined,
    },
  });

  const selectedCropType = watch("cropType");
  const selectedQualityGrade = watch("qualityGrade");

  const cropNames =
    CROP_OPTIONS.find((c) => c.type === selectedCropType)?.crops || [];

  const nextStep = async () => {
    const fieldsToValidate =
      step === 1
        ? (["cropType", "cropName", "quantity", "unit", "pricePerUnit"] as const)
        : step === 2
        ? (["state"] as const)
        : [];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (data: CreateListingFormData) => {
    await onSubmit({ ...data, images } as CreateListingFormData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <motion.div
              animate={{
                scale: step === s ? 1.2 : 1,
                backgroundColor: step >= s ? "#1B5E20" : "#E5E7EB",
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s ? "text-white" : "text-gray-500"
              }`}
            >
              {step > s ? <Check className="h-5 w-5" /> : s}
            </motion.div>
            {s < 3 && (
              <div
                className={`w-16 md:w-24 h-0.5 ${
                  step > s ? "bg-forest" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 text-sm text-gray-600 mb-8">
        <span className={step === 1 ? "text-forest font-medium" : ""}>
          Product Details
        </span>
        <span className={step === 2 ? "text-forest font-medium" : ""}>
          Location
        </span>
        <span className={step === 3 ? "text-forest font-medium" : ""}>
          Photos & Quality
        </span>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crop Category
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {CROP_OPTIONS.map((option) => (
                    <label
                      key={option.type}
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedCropType === option.type
                          ? "border-forest bg-forest/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        {...register("cropType")}
                        value={option.type}
                        className="sr-only"
                      />
                      <span className="text-xl">{option.icon}</span>
                      <span className="font-medium text-gray-800 text-sm">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.cropType && (
                  <p className="text-error text-sm mt-1">
                    {errors.cropType.message}
                  </p>
                )}
              </div>

              {selectedCropType && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Crop Name
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      {...register("cropName")}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all appearance-none bg-white"
                    >
                      <option value="">Select crop</option>
                      {cropNames.map((crop) => (
                        <option key={crop} value={crop}>
                          {crop}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.cropName && (
                    <p className="text-error text-sm mt-1">
                      {errors.cropName.message}
                    </p>
                  )}
                </motion.div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      {...register("quantity", { valueAsNumber: true })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
                      placeholder="100"
                    />
                  </div>
                  {errors.quantity && (
                    <p className="text-error text-sm mt-1">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <select
                    {...register("unit")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all appearance-none bg-white"
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="quintal">Quintal</option>
                    <option value="ton">Ton</option>
                    <option value="piece">Piece</option>
                    <option value="dozen">Dozen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Unit (₹)
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    {...register("pricePerUnit", { valueAsNumber: true })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
                    placeholder="50"
                  />
                </div>
                {errors.pricePerUnit && (
                  <p className="text-error text-sm mt-1">
                    {errors.pricePerUnit.message}
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
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Village/Town
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    {...register("location")}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
                    placeholder="Your village or town"
                  />
                </div>
                {errors.location && (
                  <p className="text-error text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  {...register("state")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all appearance-none bg-white"
                >
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-error text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    {...register("description")}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all resize-none"
                    placeholder="Describe your produce, farming methods, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Harvest Date (Optional)
                </label>
                <input
                  type="date"
                  {...register("harvestDate")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={prevStep}
                  leftIcon={<ChevronLeft className="h-5 w-5" />}
                >
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
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality Grade (Optional)
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {QUALITY_GRADES.map((grade) => (
                    <label
                      key={grade}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedQualityGrade === grade
                          ? "border-gold bg-gold/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        {...register("qualityGrade")}
                        value={grade}
                        className="sr-only"
                      />
                      <Star
                        className={`h-6 w-6 ${
                          selectedQualityGrade === grade
                            ? "text-gold fill-gold"
                            : "text-gray-300"
                        }`}
                      />
                      <span className="font-medium text-gray-800 mt-1">
                        {grade}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-forest transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-400">
                      PNG, JPG up to 5MB each
                    </p>
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-error text-white rounded-full hover:bg-error/80 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={prevStep}
                  leftIcon={<ChevronLeft className="h-5 w-5" />}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  loading={loading}
                  rightIcon={<Check className="h-5 w-5" />}
                >
                  {mode === "create" ? "Create Listing" : "Save Changes"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
