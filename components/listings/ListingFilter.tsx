"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X, ChevronDown, MapPin, Star } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { CROP_OPTIONS, INDIAN_STATES, QUALITY_GRADES } from "@/types/listing";
import type { ListingStatus } from "@/types/listing";

interface FilterState {
  search: string;
  cropType: string;
  state: string;
  qualityGrade: string;
  status: ListingStatus | "";
  priceMin: number | "";
  priceMax: number | "";
  sortBy: "newest" | "price_low" | "price_high" | "quantity";
}

interface ListingFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultsCount?: number;
}

export function ListingFilter({
  filters,
  onFilterChange,
  resultsCount,
}: ListingFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string | number) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: "",
      cropType: "",
      state: "",
      qualityGrade: "",
      status: "",
      priceMin: "",
      priceMax: "",
      sortBy: "newest",
    });
  };

  const hasActiveFilters =
    filters.cropType ||
    filters.state ||
    filters.qualityGrade ||
    filters.status ||
    filters.priceMin ||
    filters.priceMax;

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search crops, locations..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
          />
        </div>

        <Button
          variant="secondary"
          leftIcon={<Filter className="h-5 w-5" />}
          onClick={() => setShowFilters(!showFilters)}
          className="relative"
        >
          Filters
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-forest text-white text-xs rounded-full flex items-center justify-center">
              !
            </span>
          )}
        </Button>

        <select
          value={filters.sortBy}
          onChange={(e) =>
            updateFilter("sortBy", e.target.value as FilterState["sortBy"])
          }
          title="Sort listings"
          className="px-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all appearance-none bg-white min-w-[160px] cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="quantity">Quantity</option>
        </select>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-xl shadow-soft p-6 border"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-forest hover:underline flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Crop Type
              </label>
              <select
                value={filters.cropType}
                onChange={(e) => updateFilter("cropType", e.target.value)}
                title="Filter by crop type"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all appearance-none bg-white cursor-pointer"
              >
                <option value="">All Categories</option>
                {CROP_OPTIONS.map((option) => (
                  <option key={option.type} value={option.type}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={filters.state}
                  onChange={(e) => updateFilter("state", e.target.value)}
                  title="Filter by state"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all appearance-none bg-white cursor-pointer"
                >
                  <option value="">All States</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quality Grade
              </label>
              <div className="relative">
                <Star className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={filters.qualityGrade}
                  onChange={(e) => updateFilter("qualityGrade", e.target.value)}
                  title="Filter by quality grade"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all appearance-none bg-white cursor-pointer"
                >
                  <option value="">All Grades</option>
                  {QUALITY_GRADES.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade} Grade
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => updateFilter("status", e.target.value)}
                title="Filter by status"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all appearance-none bg-white cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="PENDING">Pending</option>
                <option value="SOLD">Sold</option>
                <option value="EXPIRED">Expired</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range (₹)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={filters.priceMin}
                  onChange={(e) =>
                    updateFilter(
                      "priceMin",
                      e.target.value ? Number(e.target.value) : ""
                    )
                  }
                  placeholder="Min"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
                />
                <span className="text-gray-400">to</span>
                <input
                  type="number"
                  value={filters.priceMax}
                  onChange={(e) =>
                    updateFilter(
                      "priceMax",
                      e.target.value ? Number(e.target.value) : ""
                    )
                  }
                  placeholder="Max"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {resultsCount !== undefined && (
        <p className="text-sm text-gray-500">
          {resultsCount === 0
            ? "No results found"
            : `Showing ${resultsCount} result${resultsCount !== 1 ? "s" : ""}`}
        </p>
      )}
    </div>
  );
}
