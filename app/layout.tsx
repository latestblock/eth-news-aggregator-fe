import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Newspaper } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ethereum Weekly News Archive',
  description: 'Browse past and current Ethereum news updates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="fixed top-0 z-50 flex h-16 w-full items-center border-b border-neutral-200 bg-white px-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center">
            <Newspaper className="mr-3 h-5 w-5 text-emerald-600 dark:text-emerald-500" />
            <h1 className="text-base font-semibold tracking-wide text-neutral-900 dark:text-neutral-100">
              Ethereum News Archive
            </h1>
          </div>
        </header>
        <main className="flex min-h-screen pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}