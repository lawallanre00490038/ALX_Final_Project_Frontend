import type { Metadata } from "next";
import "../globals.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Auths",
  description: "Created by Sofmax Technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.variable} bg-background min-h-screen font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
