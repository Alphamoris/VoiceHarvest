"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Bell,
  Globe,
  Shield,
  Smartphone,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Mail,
  MessageCircle,
  CreditCard,
  Trash2,
  LogOut,
  ChevronRight,
  Check,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/shared/Button";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिंदी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "mr", name: "Marathi", native: "मराठी" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      orderUpdates: true,
      priceAlerts: true,
      promotions: false,
    },
    privacy: {
      showPhone: true,
      showLocation: true,
      publicProfile: false,
    },
    preferences: {
      language: "en",
      darkMode: false,
      voiceEnabled: true,
      autoPlay: false,
    },
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const ToggleSwitch = ({
    enabled,
    onChange,
  }: {
    enabled: boolean;
    onChange: () => void;
  }) => (
    <motion.button
      onClick={onChange}
      className={`relative w-14 h-8 rounded-full transition-colors ${
        enabled ? "bg-forest" : "bg-gray-300"
      }`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
        animate={{ x: enabled ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );

  const SettingItem = ({
    icon: Icon,
    title,
    description,
    children,
    delay = 0,
  }: {
    icon: typeof Bell;
    title: string;
    description: string;
    children: React.ReactNode;
    delay?: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-lime/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-forest" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-lime/5 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-14 h-14 bg-gradient-to-br from-forest to-lime rounded-2xl flex items-center justify-center shadow-lg"
          >
            <Settings className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h1
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Settings
            </h1>
            <p className="text-gray-600">Manage your preferences</p>
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-forest" />
                <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
              </div>
            </div>
            <div className="p-2">
              <SettingItem
                icon={Mail}
                title="Email Notifications"
                description="Receive updates via email"
                delay={0.15}
              >
                <ToggleSwitch
                  enabled={settings.notifications.email}
                  onChange={() =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        email: !settings.notifications.email,
                      },
                    })
                  }
                />
              </SettingItem>
              <SettingItem
                icon={Smartphone}
                title="Push Notifications"
                description="Receive push notifications"
                delay={0.2}
              >
                <ToggleSwitch
                  enabled={settings.notifications.push}
                  onChange={() =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        push: !settings.notifications.push,
                      },
                    })
                  }
                />
              </SettingItem>
              <SettingItem
                icon={MessageCircle}
                title="SMS Alerts"
                description="Get SMS for important updates"
                delay={0.25}
              >
                <ToggleSwitch
                  enabled={settings.notifications.sms}
                  onChange={() =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        sms: !settings.notifications.sms,
                      },
                    })
                  }
                />
              </SettingItem>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-forest" />
                <h2 className="text-xl font-bold text-gray-900">Language & Voice</h2>
              </div>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred Language
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {languages.map((lang, index) => (
                  <motion.button
                    key={lang.code}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    onClick={() =>
                      setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, language: lang.code },
                      })
                    }
                    className={`p-4 rounded-xl border-2 transition-all ${
                      settings.preferences.language === lang.code
                        ? "border-forest bg-lime/10"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{lang.name}</p>
                        <p className="text-sm text-gray-500">{lang.native}</p>
                      </div>
                      {settings.preferences.language === lang.code && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-forest rounded-full flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <SettingItem
                  icon={settings.preferences.voiceEnabled ? Volume2 : VolumeX}
                  title="Voice Assistant"
                  description="Enable voice commands and responses"
                  delay={0.4}
                >
                  <ToggleSwitch
                    enabled={settings.preferences.voiceEnabled}
                    onChange={() =>
                      setSettings({
                        ...settings,
                        preferences: {
                          ...settings.preferences,
                          voiceEnabled: !settings.preferences.voiceEnabled,
                        },
                      })
                    }
                  />
                </SettingItem>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-forest" />
                <h2 className="text-xl font-bold text-gray-900">Privacy & Security</h2>
              </div>
            </div>
            <div className="p-2">
              <SettingItem
                icon={settings.privacy.showPhone ? Eye : EyeOff}
                title="Show Phone Number"
                description="Allow buyers to see your phone"
                delay={0.35}
              >
                <ToggleSwitch
                  enabled={settings.privacy.showPhone}
                  onChange={() =>
                    setSettings({
                      ...settings,
                      privacy: {
                        ...settings.privacy,
                        showPhone: !settings.privacy.showPhone,
                      },
                    })
                  }
                />
              </SettingItem>
              <SettingItem
                icon={settings.privacy.showLocation ? Eye : EyeOff}
                title="Show Location"
                description="Display your location on listings"
                delay={0.4}
              >
                <ToggleSwitch
                  enabled={settings.privacy.showLocation}
                  onChange={() =>
                    setSettings({
                      ...settings,
                      privacy: {
                        ...settings.privacy,
                        showLocation: !settings.privacy.showLocation,
                      },
                    })
                  }
                />
              </SettingItem>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-forest" />
                <h2 className="text-xl font-bold text-gray-900">Appearance</h2>
              </div>
            </div>
            <div className="p-2">
              <SettingItem
                icon={settings.preferences.darkMode ? Moon : Sun}
                title="Dark Mode"
                description="Switch to dark theme"
                delay={0.45}
              >
                <ToggleSwitch
                  enabled={settings.preferences.darkMode}
                  onChange={() =>
                    setSettings({
                      ...settings,
                      preferences: {
                        ...settings.preferences,
                        darkMode: !settings.preferences.darkMode,
                      },
                    })
                  }
                />
              </SettingItem>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-red-100"
          >
            <div className="p-6 border-b border-red-100 bg-red-50">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h2 className="text-xl font-bold text-red-700">Danger Zone</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">Log Out</h4>
                    <p className="text-sm text-gray-500">Sign out from your account</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-red-600">Delete Account</h4>
                    <p className="text-sm text-gray-500">Permanently delete your account</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Button size="lg">Save All Changes</Button>
        </motion.div>
      </motion.div>

      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Delete Account?
            </h3>
            <p className="text-gray-600 text-center mb-6">
              This action cannot be undone. All your data, listings, and orders will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
