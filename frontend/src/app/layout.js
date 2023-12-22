import { Inter } from "next/font/google";
import "./globals.css";
import NavigationPage from "@/components/navigation";
import "react-slideshow-image/dist/styles.css";
import Context from "./tour/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationPage />
        <Context>{children}</Context>
      </body>
    </html>
  );
}
