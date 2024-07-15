import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootStyling from "./globals.module.scss";
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Whats Your Favorite Pokémon?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={RootStyling.Container} lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
