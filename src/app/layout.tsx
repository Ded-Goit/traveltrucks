import type { Metadata } from 'next';
import 'normalize.css';
import './globals.css';
import Header from '@/components/Header/Header';
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: 'TravelTrucks — Camper Rentals',
  description: 'Rent campers for travel',
  icons: {
    icon: '/cemper.png',
  },
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'], // Regular, Medium, SemiBold
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
