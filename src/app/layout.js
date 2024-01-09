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
      <body className="font-inter min-h-screen relative">
        <div className="absolute inset-0 z-20 bg-black opacity-50"></div>
        <div
          className=" bg-cover bg-center relative h-screen flex flex-col"
          style={{ backgroundImage: 'url("/cooking.jpg")' }}
        >
          <div className="p-5 z-20">
            <Navbar />
          </div>
          <div className="flex-grow flex items-center justify-center z-20 relative">
            {/* Your page content goes here */}
            {children}
          </div>
          <div className="p-5 z-20">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
