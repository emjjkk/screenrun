import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Screenrun | The latest movies & TV shows; recommendations, ratings, and where to watch them",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const rethink = Rethink_Sans({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rethink.className} antialiased bg-black`}
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, .96), rgb(0, 0, 0, .96)), url(https://media.themoviedb.org/t/p/original/dAXSflkUKRfpzK74kRaovfK09Kx.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}>
        {children}
      </body>
    </html>
  );
}
