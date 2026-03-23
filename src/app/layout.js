import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import MainNavigation from "@/components/navigation/MainNavigation";
import { ThemeProvider } from "./ThemeProvider";
import MainFooter from "@/components/navigation/MainFooter";

const orbitron = localFont({
  src: [
    { path: "./fonts/orbitron/static/Orbitron-Regular.ttf", weight: "400" },
    { path: "./fonts/orbitron/static/Orbitron-Medium.ttf", weight: "500" },
    { path: "./fonts/orbitron/static/Orbitron-SemiBold.ttf", weight: "600" },
    { path: "./fonts/orbitron/static/Orbitron-Bold.ttf", weight: "700" },
    { path: "./fonts/orbitron/static/Orbitron-ExtraBold.ttf", weight: "800" },
    { path: "./fonts/orbitron/static/Orbitron-Black.ttf", weight: "900" },
  ],
  variable: "--font-orbitron",
});

const helveticaNeue = localFont({
  src: [
    { path: "./fonts/helvetica_neue/HelveticaNeueThin.otf", weight: "100" },
    { path: "./fonts/helvetica_neue/HelveticaNeueLight.otf", weight: "300" },
    { path: "./fonts/helvetica_neue/HelveticaNeueRoman.otf", weight: "400" },
    {
      path: "./fonts/helvetica_neue/HelveticaNeueItalic.ttf",
      weight: "400",
      style: "italic",
    },
    { path: "./fonts/helvetica_neue/HelveticaNeueMedium.otf", weight: "500" },
    {
      path: "./fonts/helvetica_neue/HelveticaNeueMediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    { path: "./fonts/helvetica_neue/HelveticaNeueBold.otf", weight: "700" },
    {
      path: "./fonts/helvetica_neue/HelveticaNeueBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    { path: "./fonts/helvetica_neue/HelveticaNeueHeavy.otf", weight: "800" },
    {
      path: "./fonts/helvetica_neue/HelveticaNeueHeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
    { path: "./fonts/helvetica_neue/HelveticaNeueBlack.otf", weight: "900" },
    {
      path: "./fonts/helvetica_neue/HelveticaNeueBlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-helvetica-neue",
});
const nebbulla = localFont({
  src: [{ path: "./fonts/nebbulla/Nebbulla.ttf", weight: "100" }],
  variable: "--font-nebbulla",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chronix Tech",
  description: "Reducing Technology Friction",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nebbulla.variable} ${orbitron.variable} ${helveticaNeue.variable} antialiased relative`}
      >
        <ThemeProvider>
          <MainNavigation />
          {children}
          <MainFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
