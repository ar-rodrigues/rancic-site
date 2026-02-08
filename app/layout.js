import { Poppins, Raleway } from "next/font/google";
import "./globals.css";
import PageLoadTransition from "@/components/PageLoadTransition";

const poppins = Poppins({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const raleway = Raleway({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-raleway",
});

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${poppins.variable} ${raleway.variable}`}>
        <PageLoadTransition>{children}</PageLoadTransition>
      </body>
    </html>
  );
}
