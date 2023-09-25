import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Auth | Social media application",
  description: "Get ready to connect with some amazing guys!",
};

const inter = Inter({ subsets: ["latin"] });

interface PropTypes {
  children: ReactNode;
}

const Layout: FC<PropTypes> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;
