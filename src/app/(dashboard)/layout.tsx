import { FC, ReactNode } from "react";

// Components
import Sidebar from "@/components/shared/Sidebar";
import Container from "@/components/shared/Container";
import Navbar from "@/components/shared/Navbar";
import CommunitySidebar from "@/components/shared/CommunitySidebar";

interface PropTypes {
  children: ReactNode;
}

const Layout: FC<PropTypes> = async ({ children }) => {
  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <Container className="flex-1 flex flex-row">
        <Sidebar className="pt-[20px] w-[250px] pr-[20px] border-r border-[rgba(0,0,0, 0.1)]" />
        <div className="p-[20px] flex-1 h-full">{children}</div>
        <CommunitySidebar className="pt-[20px] w-[300px] pl-[20px] border-l border-[rgba(0,0,0, 0.1)]" />
      </Container>
    </main>
  );
};

export default Layout;
