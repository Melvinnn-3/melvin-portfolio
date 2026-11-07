import type { Metadata, Viewport } from "next";
import { Anton, Geist, Geist_Mono, Caveat_Brush } from "next/font/google";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const caveat = Caveat_Brush({ subsets: ["latin"], weight: "400", variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Melvin Mathew — Creative Media & Content Creator",
  description: "Portfolio of Melvin Mathew — creative media, video editing, content production and visual storytelling.",
  metadataBase: new URL("https://example.com")
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1
};

const buildModeScript = `
(() => {
  try {
    const params = new URLSearchParams(window.location.search);
    const saved = localStorage.getItem("melvin-agents");
    const forceOn = params.get("agents") === "on";
    const forceOff = params.get("agents") === "off";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enabled = forceOn || (!forceOff && saved !== "off" && !reduced);
    if (enabled) document.documentElement.classList.add("build-mode");
  } catch (_) {}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: buildModeScript }} /></head>
      <body className={`${anton.variable} ${geist.variable} ${geistMono.variable} ${caveat.variable}`}>
        {children}
      </body>
    </html>
  );
}
