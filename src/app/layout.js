import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { WebSocketProvider } from "./WebsocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  manifest: "/manifest.json",
  title: "Rarbit Cooking App",
  description: "AR Cooking app that make your life easier",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, viewport-fit=cover, width=device-width"
          />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
          />
      </Head>
      <body
        className="font-inter relative"
        style={{
          minHeight: "calc(100vh + env(safe-area-inset-top))",
          padding: "env(safe-area-inset-top) 0 env(safe-area-inset-bottom) 0",
        }}
        >
        <WebSocketProvider>
        <div className="absolute inset-0 z-20 bg-black opacity-50"></div>
        <div
          className=" bg-cover bg-center relative h-screen flex flex-col"
          style={{
            backgroundImage: 'url("/cooking.jpg")',
            minHeight: "calc(100% + env(safe-area-inset-top))",
            padding:
              "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            /* Special fix for iOS Safari 15+ */
            "@supports (WebkitTouchCallout: none)": {
              height: "-webkit-fill-available",
            },
          }}
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
    </WebSocketProvider>
      </body>
    </html>
  );
}

