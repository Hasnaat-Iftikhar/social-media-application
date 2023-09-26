import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Components
import Sidebar from "@/components/shared/Sidebar";
import Container from "@/components/shared/Container";
import Navbar from "@/components/shared/Navbar";
import CommunitySidebar from "@/components/shared/CommunitySidebar";

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
        <main className="h-screen flex flex-col">
          <Navbar />
          <Container className="flex-1 flex flex-row">
            <Sidebar className="pt-[20px] w-[250px] pr-[20px] border-r border-[rgba(0,0,0, 0.1)]" />
            <div className="p-[20px] flex-1 h-full">{children}</div>
            <CommunitySidebar className="pt-[20px] w-[300px] pl-[20px] border-l border-[rgba(0,0,0, 0.1)]" />
          </Container>
        </main>
      </body>
    </html>
  );
};

export default Layout;
