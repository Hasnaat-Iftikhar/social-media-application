import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Components
import Sidebar from "@/components/shared/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard | Social Media Application",
  description:
    "Welcome to our social media platform where you can connect with friends, share moments, and explore the world. Join the community today!",
};

interface PropTypes {
  children: ReactNode;
}

const Layout: FC<PropTypes> = ({ children }) => {
  return (
    <html>
      <body className={inter.className}>
        <main>
          <Sidebar />
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
};

export default Layout;
