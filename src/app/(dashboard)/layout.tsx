import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Components
import Sidebar from "@/components/shared/Sidebar";
import Container from "@/components/shared/Container";
import Navbar from "@/components/shared/Navbar";

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
          <Navbar />
          <Container className="mt-[20px] flex flex-row gap-[20px]">
            <Sidebar className="w-[200px]" />
            <div className="flex-1">{children}</div>
          </Container>
        </main>
      </body>
    </html>
  );
};

export default Layout;
