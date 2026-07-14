import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Undangan Pernikahan | Mahmudah & Zaky",
  description:
    "Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami. Mahmudah Alif Fatonah & Zaky Wildan Mukhollad.",
  keywords: ["undangan nikah", "wedding invitation", "Mahmudah", "Zaky", "pernikahan", "Depok"],
  openGraph: {
    title: "Undangan Pernikahan | Mahmudah & Zaky",
    description: "Kami mengundang Anda untuk hadir dalam hari bahagia kami.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
