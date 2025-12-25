# 🌾 VoiceHarvest

> **Voice-Enabled Farmer E-Commerce Platform** - Empowering Indian farmers with voice-first technology

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?style=flat&logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Project Structure](#-project-structure)
- [Usage](#-usage)
- [API Routes](#-api-routes)
- [Voice Commands](#-voice-commands)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

VoiceHarvest is a revolutionary voice-enabled e-commerce platform designed specifically for Indian farmers. It bridges the digital divide by allowing farmers to create listings, manage inventory, and connect with buyers using just their voice in any Indian language.

### Key Highlights

- 🎤 **Voice-First Interface** - Create and manage listings using voice commands
- 🌐 **Multilingual Support** - Works in Hindi, Tamil, Telugu, Kannada, and more
- 📱 **Mobile-Friendly** - Responsive design optimized for smartphones
- 🔒 **Secure Authentication** - Firebase-powered user authentication
- 📊 **Real-time Dashboard** - Track orders, listings, and analytics

---

## ✨ Features

### For Farmers (Sellers)

- **Voice-Enabled Listing Creation** - Speak to create product listings
- **Inventory Management** - Track stock levels with voice updates
- **Order Management** - Receive and manage orders easily
- **Analytics Dashboard** - View sales trends and performance
- **Price Suggestions** - Get market-based pricing recommendations

### For Buyers

- **Voice Search** - Find products by speaking
- **Smart Filtering** - Filter by crop type, location, price
- **Direct Communication** - Connect with farmers directly
- **Order Tracking** - Real-time order status updates

### Platform Features

- **Responsive Design** - Works on all devices
- **Error Boundaries** - Graceful error handling
- **Loading States** - Smooth loading experiences
- **Toast Notifications** - Real-time feedback
- **Dark Mode Ready** - (Coming Soon)

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16.1.1 (App Router) |
| **Language** | TypeScript 5.0 |
| **Styling** | Tailwind CSS 3.4 |
| **Authentication** | Firebase Auth |
| **Database** | Prisma + MongoDB |
| **Animation** | Framer Motion |
| **Forms** | React Hook Form + Zod |
| **State** | React Context |
| **Voice** | Web Speech API / Google Cloud Speech |
| **Build** | Turbopack |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm/bun)
- **Firebase Project** with Authentication enabled
- **MongoDB** database (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/voiceharvest.git
   cd voiceharvest
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure your environment** (see [Environment Setup](#environment-setup))

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/voiceharvest"

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

# Google Cloud Speech-to-Text (Optional)
GOOGLE_CLOUD_PROJECT_ID="your-google-cloud-project"
GOOGLE_CLOUD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GOOGLE_CLOUD_CLIENT_EMAIL="your-service-account@your-project.iam.gserviceaccount.com"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="VoiceHarvest"

# Twilio IVR (Optional)
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_PHONE_NUMBER="+1234567890"
```

---

## 📁 Project Structure

```
voiceharvest/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── auth/             # Authentication endpoints
│   │   ├── listings/         # Listings CRUD
│   │   ├── orders/           # Orders management
│   │   └── voice/            # Voice processing
│   ├── auth/                 # Auth pages
│   ├── dashboard/            # Dashboard pages
│   │   ├── listings/         # Listings management
│   │   ├── orders/           # Orders management
│   │   └── voice/            # Voice interface
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   ├── loading.tsx           # Global loading state
│   ├── error.tsx             # Error boundary
│   └── not-found.tsx         # 404 page
├── components/               # React components
│   ├── auth/                 # Authentication components
│   ├── common/               # Shared UI components
│   ├── dashboard/            # Dashboard components
│   ├── listings/             # Listing components
│   ├── navigation/           # Nav components
│   ├── orders/               # Order components
│   ├── shared/               # Shared components
│   └── voice/                # Voice interface components
├── contexts/                 # React Context providers
│   ├── AuthContext.tsx       # Authentication state
│   ├── ToastContext.tsx      # Toast notifications
│   └── VoiceContext.tsx      # Voice state management
├── lib/                      # Utilities and helpers
│   ├── api-client.ts         # API client
│   ├── constants.ts          # App constants
│   ├── firebase.ts           # Firebase configuration
│   ├── utils.ts              # Utility functions
│   └── validators.ts         # Zod schemas
├── prisma/                   # Database schema
│   └── schema.prisma         # Prisma schema
├── public/                   # Static assets
├── types/                    # TypeScript types
└── tailwind.config.ts        # Tailwind configuration
```

---

## 📖 Usage

### Creating a Listing (Voice)

1. Navigate to **Dashboard > Voice**
2. Click the microphone button
3. Speak your listing details:
   > "Create a new listing for 50 kilograms of wheat at 2000 rupees per quintal"
4. Review and confirm the extracted details

### Creating a Listing (Form)

1. Navigate to **Dashboard > Listings > Create New**
2. Fill in the listing details
3. Upload product images
4. Click "Create Listing"

### Managing Orders

1. Navigate to **Dashboard > Orders**
2. View incoming orders
3. Accept, reject, or update order status
4. Track delivery progress

---

## 🔌 API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | User login |
| `POST` | `/api/auth/register` | User registration |
| `GET` | `/api/listings` | Get all listings |
| `POST` | `/api/listings` | Create a listing |
| `GET` | `/api/listings/[id]` | Get listing by ID |
| `PUT` | `/api/listings/[id]` | Update listing |
| `DELETE` | `/api/listings/[id]` | Delete listing |
| `GET` | `/api/orders` | Get user orders |
| `POST` | `/api/orders` | Create an order |
| `PUT` | `/api/orders/[id]` | Update order status |
| `POST` | `/api/voice/process` | Process voice command |

---

## 🎤 Voice Commands

VoiceHarvest supports natural language voice commands in multiple languages:

### Listing Commands
- *"Create a listing for wheat"*
- *"Add 100 kg rice at 50 rupees per kg"*
- *"Update my tomato listing price to 30 rupees"*
- *"Delete my onion listing"*

### Search Commands
- *"Show me all wheat listings"*
- *"Find vegetables under 100 rupees"*
- *"Search for farmers in Maharashtra"*

### Order Commands
- *"Show my pending orders"*
- *"Accept order from Ramesh"*
- *"Mark order as delivered"*

---

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma studio    # Open Prisma Studio
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style

- Follow the existing code style
- Use TypeScript for all new files
- Write meaningful commit messages
- Add comments for complex logic

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Firebase](https://firebase.google.com/) - Backend as a Service
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

---

## 📞 Support

For support, email support@voiceharvest.in or join our Slack channel.

---

<div align="center">
  <p>Made with ❤️ for Indian Farmers</p>
  <p>
    <a href="https://voiceharvest.in">Website</a> •
    <a href="https://twitter.com/voiceharvest">Twitter</a> •
    <a href="https://linkedin.com/company/voiceharvest">LinkedIn</a>
  </p>
</div>
