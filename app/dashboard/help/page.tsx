"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MessageCircle,
  Book,
  Video,
  FileText,
  Mic,
  ShoppingCart,
  CreditCard,
  Truck,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/shared/Button";

const faqs = [
  {
    category: "Getting Started",
    icon: Book,
    questions: [
      {
        q: "How do I create a listing?",
        a: "You can create a listing by going to Dashboard > Listings > Create New. Simply fill in the crop details like name, quantity, and price. You can also use voice command by saying 'I want to sell 50kg wheat at ₹40 per kg'.",
      },
      {
        q: "What crops can I sell on VoiceHarvest?",
        a: "You can sell all types of agricultural products including grains (wheat, rice, bajra), pulses (chana, dal), spices (turmeric, chili), oilseeds, and more. We specialize in long shelf-life products.",
      },
      {
        q: "Is there a registration fee?",
        a: "No, registration is completely free! We only charge a small commission (5%) when you successfully make a sale.",
      },
    ],
  },
  {
    category: "Voice Commands",
    icon: Mic,
    questions: [
      {
        q: "How do I use voice commands?",
        a: "Go to Dashboard > Voice Assistant, click the microphone button, and speak naturally. You can say things like 'Create a listing for 100kg rice at ₹50 per kg' or 'Show my orders'.",
      },
      {
        q: "Which languages are supported?",
        a: "We support Hindi, Tamil, Telugu, Kannada, Marathi, Gujarati, Punjabi, Bengali, and English. The system automatically detects your language.",
      },
      {
        q: "What if the voice assistant doesn't understand me?",
        a: "Try speaking clearly and a bit slower. You can also rephrase your request. If issues persist, use the text-based interface as a backup.",
      },
    ],
  },
  {
    category: "Orders & Payments",
    icon: ShoppingCart,
    questions: [
      {
        q: "How do I track my orders?",
        a: "Go to Dashboard > Orders to see all your orders. Each order shows its current status - Pending, Confirmed, Shipped, or Delivered.",
      },
      {
        q: "When do I get paid?",
        a: "Payment is processed within 24-48 hours after the buyer confirms delivery. The amount is directly transferred to your linked bank account.",
      },
      {
        q: "What payment methods are accepted?",
        a: "Buyers can pay via UPI, Net Banking, Credit/Debit cards, or Cash on Delivery for local orders.",
      },
    ],
  },
  {
    category: "Delivery & Logistics",
    icon: Truck,
    questions: [
      {
        q: "Who handles the delivery?",
        a: "We partner with local logistics providers. For nearby orders, buyers can also arrange self-pickup.",
      },
      {
        q: "What if my produce is damaged during delivery?",
        a: "All shipments are insured. If damage occurs, report it within 24 hours with photos and we'll process a full refund.",
      },
      {
        q: "Can I set delivery preferences?",
        a: "Yes! In your listing, you can specify pickup location, available delivery slots, and packaging preferences.",
      },
    ],
  },
];

const supportOptions = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak to our support team",
    action: "1800-XXX-XXXX",
    highlight: "Toll-Free",
    color: "from-forest to-forest-light",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Chat with us on WhatsApp",
    action: "+91 98765 43210",
    highlight: "24/7 Available",
    color: "from-lime-dark to-lime",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Send us an email",
    action: "support@voiceharvest.in",
    highlight: "Response in 24hrs",
    color: "from-gold to-gold-light",
  },
];

const resources = [
  { icon: Video, title: "Video Tutorials", desc: "Watch step-by-step guides", link: "#" },
  { icon: FileText, title: "User Guide", desc: "Read detailed documentation", link: "#" },
  { icon: Book, title: "Blog", desc: "Tips for better selling", link: "#" },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Getting Started");

  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

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
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-forest to-lime rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <HelpCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How can we help you?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to common questions or reach out to our support team.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-lg shadow-sm"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-4 mb-12"
        >
          {supportOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-4 shadow-lg`}
              >
                <option.icon className="w-7 h-7 text-white" />
              </motion.div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{option.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{option.description}</p>
              <p className="font-semibold text-forest">{option.action}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-lime/20 text-forest text-xs font-medium rounded-full">
                {option.highlight}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4 px-2">Categories</h3>
              <div className="space-y-1">
                {faqs.map((category) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.category}
                      onClick={() => setActiveCategory(category.category)}
                      whileHover={{ x: 5 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                        activeCategory === category.category
                          ? "bg-forest text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{category.category}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-3">
                {(searchQuery ? filteredFaqs : faqs.filter(c => c.category === activeCategory)).map((category) =>
                  category.questions.map((faq, index) => {
                    const isOpen = openFaq === `${category.category}-${index}`;
                    return (
                      <motion.div
                        key={`${category.category}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border border-gray-100 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setOpenFaq(isOpen ? null : `${category.category}-${index}`)
                          }
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Helpful Resources</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {resources.map((resource, index) => (
                  <motion.a
                    key={resource.title}
                    href={resource.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ y: -3 }}
                    className="bg-white rounded-xl p-5 shadow-md border border-gray-100 flex items-center gap-4 hover:border-forest transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-lime/20 flex items-center justify-center">
                      <resource.icon className="w-6 h-6 text-forest" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                      <p className="text-sm text-gray-500">{resource.desc}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
