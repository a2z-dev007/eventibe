import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScrolling from '@/components/SmoothScrolling';
import QueryProvider from '@/contexts/QueryProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Eventibe | Corporate Venue & Event Service Marketplace',
  description: 'Find. Book. Celebrate. Corporate Venue & Event Service Marketplace.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <QueryProvider>
          <SmoothScrolling>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScrolling>
        </QueryProvider>
      </body>
    </html>
  );
}
