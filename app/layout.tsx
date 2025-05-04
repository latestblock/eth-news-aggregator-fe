import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import "./globals.css";
import { ThemeProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ethereum Weekly News Archive",
  description: "Browse past and current Ethereum news updates",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider>
          <Navbar />
          <main className="w-full pb-10 pt-24 flex flex-col items-center justify-center shadow-xl bg-background border border-border">
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
