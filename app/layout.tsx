import type { Metadata } from "next";
import {Nunito} from 'next/font/google';
import './globals.css';
import Navbar from "./components/Navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "./providers/ToasterProvider";
import RegisterModal from "./components/modals/RegisterModal";
<<<<<<< HEAD
=======
import LoginModal from "./components/modals/LoginModal";
>>>>>>> 10f1ca4 (changes)
export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
}
const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          < ToasterProvider />
          <RegisterModal />
<<<<<<< HEAD
=======
          <LoginModal />
>>>>>>> 10f1ca4 (changes)
          <Navbar />
        </ClientOnly>
       
        {children}
      </body>
    </html>
  );
}
