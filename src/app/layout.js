import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  manifest: "/manifest.json",
  title: "Rarbit Cooking App",
  description: "AR Cooking app that make your life easier",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen items-center justify-between">
          <Navbar />
          <div className="flex-grow flex items-center">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
