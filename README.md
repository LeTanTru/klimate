# ⛅ Klimate - Modern Weather Dashboard

Klimate is a modern, responsive, and feature-rich weather dashboard application built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **shadcn/ui**. Powered by the **OpenWeatherMap API**, Klimate provides real-time local weather forecasts, hourly interactive temperature charts, a 5-day outlook, global city search with history, and customizable favorite locations.

---

## ✨ Features

- **📍 Geolocation-Based Weather**: Automatically detects your current location with one-click refresh and error handling for denied permissions.
- **🔍 Global City Search with Autocomplete**: Search for any city worldwide with debounced inputs (via OpenWeather Geocoding API).
- **🕒 Persistent Search History**: Keeps track of your recent searches in `localStorage`, complete with timestamps and one-click clear.
- **⭐ Favorite Locations**: Pin favorite cities to your dashboard with real-time temperature previews, horizontal scrolling, and quick navigation.
- **📈 Interactive Hourly Temperature Chart**: Powered by Recharts, featuring smooth cursor tracking, synchronized data dots, and custom tooltip metrics.
- **📅 5-Day Detailed Forecast**: Aggregated daily weather breakdown displaying highs, lows, humidity, and wind speeds.
- **🧭 Atmospheric & Solar Details**: Real-time metrics including Sunrise/Sunset times, 8-point compass wind directions, humidity, and atmospheric pressure.
- **🌓 Light & Dark Mode**: Persistent theme toggle with smooth icon animation and theme-adaptive branding.
- **⚡ Next-Gen Performance**: Built on React 19 and React Compiler with Vite for lightning-fast HMR and minimal bundle footprints.
- **📱 Fully Responsive UI**: Tailored layouts crafted with Tailwind CSS v4 and accessible shadcn/ui components.

---

## 🛠️ Tech Stack

| Category                  | Technology                                                                                                          |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------ |
| **Framework & Build**     | [React 19](https://react.dev/), [Vite](https://vite.dev/), [React Compiler](https://react.dev/learn/react-compiler) |
| **Language**              | [TypeScript](https://www.typescriptlang.org/)                                                                       |
| **Styling**               | [Tailwind CSS v4](https://tailwindcss.com/), [tw-animate-css](https://github.com/Waleed-Haider/tw-animate-css)      |
| **UI Components**         | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives), [cmdk](https://cmdk.paco.me/)                            |
| **State & Data Fetching** | [TanStack Query v5 (React Query)](https://tanstack.com/query/latest)                                                |
| **Routing**               | [React Router v7](https://reactrouter.com/)                                                                         |
| **Data Visualization**    | [Recharts](https://recharts.org/)                                                                                   |
| **Icons & Toasts**        | [Lucide React](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/)                                        |
| **Date Utilities**        | [date-fns](https://date-fns.org/)                                                                                   |
| **Linting & Formatting**  | [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) with `@ianvs/prettier-plugin-sort-imports`          |

---

## 📁 Project Structure

```text
klimate/
├── public/                 # Static assets (logos, icons, favicon)
├── src/
│   ├── api/                # API client configuration & OpenWeatherMap service
│   │   ├── config.ts       # Endpoint URLs and default query parameters
│   │   └── weather.ts      # WeatherAPI class (current, forecast, geocoding)
│   ├── components/         # Reusable application components
│   │   ├── ui/             # shadcn/ui atomic components (Button, Card, Dialog, etc.)
│   │   ├── city-search.tsx # Command palette search dialog with history & favorites
│   │   ├── current-weather.tsx  # Current weather summary card
│   │   ├── favorite-button.tsx  # Add/remove favorite toggle button
│   │   ├── favorite-cities.tsx  # Horizontal scrollable favorite cities list
│   │   ├── hourly-temperature.tsx # Recharts hourly temperature line graph
│   │   ├── weather-forecast.tsx # 5-day aggregated forecast list
│   │   ├── weather-detailts.tsx # Sunrise, sunset, wind direction, pressure metrics
│   │   ├── loading-skeleton.tsx # Loading placeholders
│   │   ├── header.tsx      # App header with search and theme switcher
│   │   ├── footer.tsx      # Footer with copyright notice
│   │   ├── layout.tsx      # Main page layout wrapper
│   │   └── query-provider.tsx   # React Query client provider configuration
│   ├── contexts/           # React context providers (Theme context)
│   ├── hooks/              # Custom React hooks
│   │   ├── use-debounce.ts        # Input debouncing hook
│   │   ├── use-favorite.ts        # Favorites management with localStorage
│   │   ├── use-geolocation.ts     # Browser geolocation API hook
│   │   ├── use-local-storage.tsx  # Generic persistent localStorage hook
│   │   ├── use-search-history.tsx # Search history queries & mutations
│   │   └── use-weather.ts         # React Query hooks for weather & geocoding
│   ├── pages/              # Application views / routes
│   │   ├── weather-dashboard.tsx  # Main dashboard (current location & favorites)
│   │   └── city-page.tsx          # Dedicated city weather details route
│   ├── types/              # TypeScript definitions for weather & geo responses
│   ├── App.tsx             # Root router & application provider setup
│   ├── index.css           # Global stylesheet & Tailwind CSS configuration
│   └── main.tsx            # Application entry point
├── .env.example            # Sample environment variables configuration
├── components.json         # shadcn UI CLI configuration
├── eslint.config.js        # ESLint flat configuration
├── package.json            # Dependencies & script commands
└── vite.config.ts          # Vite configuration with React Compiler plugin
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- An API Key from [OpenWeatherMap](https://openweathermap.org/api) (Free Tier)

### 1. Clone the Repository

```bash
git clone https://github.com/LeTanTru/klimate.git
cd klimate
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root by copying `.env.example`:

```bash
cp .env.example .env
```

Add your OpenWeatherMap API key to `.env`:

```env
VITE_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Command           | Description                                                        |
| :---------------- | :----------------------------------------------------------------- |
| `npm run dev`     | Starts the Vite development server with HMR.                       |
| `npm run build`   | Compiles TypeScript (`tsc -b`) and bundles the app for production. |
| `npm run preview` | Previews the production build locally.                             |
| `npm run lint`    | Lints the codebase with ESLint.                                    |
| `npm run format`  | Formats all files using Prettier and Tailwind plugin.              |

---

## 🌐 API Reference

Klimate integrates with the following OpenWeatherMap API endpoints:

- **Current Weather**: `/data/2.5/weather` — Fetches current temperature, humidity, wind, and atmospheric metrics.
- **5-Day / 3-Hour Forecast**: `/data/2.5/forecast` — Powers the hourly chart and 5-day daily forecast breakdown.
- **Direct Geocoding**: `/geo/1.0/direct` — Translates search queries into coordinates (`lat`, `lon`), country, and state.
- **Reverse Geocoding**: `/geo/1.0/reverse` — Translates GPS coordinates into human-readable city and country names.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

Made with ❤️ by [Le Tan Tru](https://github.com/LeTanTru).
