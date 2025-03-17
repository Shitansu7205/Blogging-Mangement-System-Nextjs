import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer'
import Talkto from "@/components/Talkto";
import Whatsapp from "@/components/Whatsapp";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Blogify || Best Platform for Blogging",
  description: "Generated by create next app",
  icons: {
    icon: "/images/favicons.png", // Path to your favicon
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
       
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <ToastContainer />
        <Talkto />
        <Whatsapp />
        <Footer/>
      </body>
    </html>
  );
}
