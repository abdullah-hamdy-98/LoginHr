import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";

import Topbar from "@/components/shared/Topbar";
import Sidebar from "@/components/shared/Sidebar";



export const metadata: Metadata = {
  title: "Login Hr",
  description: "Human resources app",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />
          <main className="flex flex-row">
            <Sidebar />
            <section className="main-container bg-light-3">
              <div className="w-full max-w-8xl">
                {children}
              </div>
            </section>
          </main>

        </body>
      </html>
    </ClerkProvider>
  );
}
