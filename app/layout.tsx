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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
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
