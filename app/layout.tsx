import type { Metadata, Viewport } from "next";
import { Poppins, Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { VoiceProvider } from "@/context/VoiceContext";
import { ToastContainer } from "@/components/common/Toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VoiceHarvest - Voice-Enabled Farmer E-Commerce Platform",
    template: "%s | VoiceHarvest",
  },
  description:
    "Empowering Indian farmers with voice-first technology. Create listings, manage inventory, and connect with buyers using just your voice in any Indian language.",
  keywords: [
    "farmer",
    "agriculture",
    "e-commerce",
    "voice",
    "India",
    "crops",
    "marketplace",
    "farming",
  ],
  authors: [{ name: "VoiceHarvest Team" }],
  creator: "VoiceHarvest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://voiceharvest.in",
    title: "VoiceHarvest - Voice-Enabled Farmer E-Commerce Platform",
    description:
      "Empowering Indian farmers with voice-first technology. Create listings, manage inventory, and connect with buyers using just your voice.",
    siteName: "VoiceHarvest",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoiceHarvest - Voice-Enabled Farmer E-Commerce Platform",
    description: "Empowering Indian farmers with voice-first technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1B5E20",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${inter.variable} ${robotoMono.variable} antialiased bg-cream text-gray-800`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <AuthProvider>
          <ToastProvider>
            <VoiceProvider>
              {children}
              <ToastContainer />
            </VoiceProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
