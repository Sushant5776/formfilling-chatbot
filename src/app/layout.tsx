import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat-Boat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex items-center justify-between px-5 h-20 w-full bg-indigo-500 text-lg">
          <h1 className="font-bold text-zinc-200 tracking-wider">Chat Boat</h1>
          <ul className="flex items-center gap-5">
            <li><Link href={'#home'}>Home</Link></li>
            <li><Link href={'#about'}>About</Link></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
