"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Edit3,
  Save,
  X,
  Shield,
  Award,
  TrendingUp,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/shared/Button";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "Farmer Name",
    email: user?.email || "farmer@example.com",
    phone: user?.phone || "+91 98765 43210",
    state: user?.location?.state || "Maharashtra",
    district: user?.location?.district || "Pune",
    village: "",
  });

  const stats = [
    { label: "Total Sales", value: "₹1,25,000", icon: TrendingUp, color: "from-green-500 to-emerald-600" },
    { label: "Active Listings", value: "12", icon: Award, color: "from-blue-500 to-indigo-600" },
    { label: "Completed Orders", value: "45", icon: CheckCircle, color: "from-purple-500 to-pink-600" },
    { label: "Member Since", value: "Jan 2024", icon: Calendar, color: "from-orange-500 to-red-500" },
  ];

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-lime/5 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            My Profile
          </h1>
          <p className="text-gray-600 mt-2">Manage your account information</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center relative overflow-hidden">
              <motion.div
                className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-lime/20 to-transparent rounded-bl-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              />

              <motion.div
                className="relative w-32 h-32 mx-auto mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-forest to-lime flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                  {formData.name.charAt(0)}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-forest hover:bg-lime/20 transition-colors"
                  aria-label="Change profile photo"
                >
                  <Camera className="w-5 h-5" />
                </motion.button>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-gray-900 mb-1"
              >
                {formData.name}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-lime/20 text-forest rounded-full text-sm font-medium mb-6"
              >
                <Shield className="w-4 h-4" />
                Verified {user?.role || "Farmer"}
              </motion.div>

              <div className="space-y-3 text-left">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 text-sm truncate">{formData.email}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 text-sm">{formData.phone}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 text-sm">{formData.state}, {formData.district}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    leftIcon={<Edit3 className="w-4 h-4" />}
                  >
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsEditing(false)}
                      leftIcon={<X className="w-4 h-4" />}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      leftIcon={<Save className="w-4 h-4" />}
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: "Full Name", key: "name", icon: User },
                  { label: "Email Address", key: "email", icon: Mail },
                  { label: "Phone Number", key: "phone", icon: Phone },
                  { label: "State", key: "state", icon: MapPin },
                  { label: "District", key: "district", icon: MapPin },
                  { label: "Village", key: "village", icon: MapPin },
                ].map((field, index) => (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <div className="relative">
                      <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.key]: e.target.value })
                        }
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all ${
                          isEditing
                            ? "border-forest focus:ring-2 focus:ring-forest/20 bg-white"
                            : "border-gray-200 bg-gray-50 cursor-not-allowed"
                        } outline-none`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
