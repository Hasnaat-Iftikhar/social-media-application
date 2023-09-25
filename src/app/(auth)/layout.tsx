import { FC, ReactNode } from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

// Components
import Container from "@/components/shared/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth | Social media application",
  description:
    "elcome to our social media platform where you can connect with friends, share moments, and explore the world. Join the community today!",
};

interface PropTypes {
  children: ReactNode;
}

const Layout: FC<PropTypes> = async ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main>
            <Container>
              <section className="h-screen flex flex-row justify-between items-center">
                <div className="max-w-[400px] flex flex-col justify-center items-start gap-[14px]">
                  <h2 className="text-[24px] font-medium">
                    Connect, Share, and Explore!
                  </h2>
                  <p className="text-[16px] leading-[20px]">
                    Welcome to our social media platform where you can connect
                    with friends, share moments, and explore the world. Join the
                    community today!
                  </p>
                </div>
                <div className="w-[600px] h-full bg-primary flex justify-center items-center">
                  {children}
                </div>
              </section>
            </Container>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;
