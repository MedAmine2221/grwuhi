import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import ReduxProvider from "@/providers/reduxProvider";
import RatingModal from "@/components/RaitingModal";
import InitDataLoader from "@/components/LoadingData";
import Navbar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "GRWUHI",
  description: "Get Ready With Us For Your Hiring Interview",
  icons:{
    icon: "/logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={"h-full antialiased"}
    >
      <body className="flex flex-col w-full justify-between min-h-screen bg-[#0d1f3c] pt-16">
        <ReduxProvider>
          <Navbar />
          {children}
          <InitDataLoader />
          <RatingModal />
          <Footer />  
        </ReduxProvider>
      </body>
    </html>
  );
}
