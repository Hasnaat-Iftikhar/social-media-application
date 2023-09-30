import { ReactNode } from "react";
import { redirect } from "next/navigation";

// Components
import ThreadForm from "@/components/forms/ThreadForm";
import Container from "@/components/shared/Container";
import UserInfoCard from "@/components/cards/UserInfoCard";
import Navbar from "@/components/shared/Navbar";

// Routes
import ROUTES from "@/constants/routes";

// Libs
import { fetchUser } from "@/lib/actions/user.actions";

// Types
import AccountProfileType from "@/lib/types/accountProfile.type";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feeds | Social Media Application",
  description:
    "Welcome to our social media platform where you can connect with friends, share moments, and explore the world. Join the community today!",
};

export default async function FeedsLayout(props: {
  children: ReactNode;
  user: ReactNode;
  communities: ReactNode;
}) {
  const res = await fetchUser();
  const user: AccountProfileType = await res.json();

  if (res.status === 200) {
    return (
      <main className="h-screen flex flex-col gap-[20px]">
        <Navbar />
        <Container className="flex-1 flex flex-row">
          <UserInfoCard user={user} />
          <div className="px-[20px] flex-1 h-full flex flex-col gap-[20px]">
            <ThreadForm user={user} />
            <div className="w-[94%] h-[1px] mx-auto border-t border-[rgba(0,0,0, 0.1)]"></div>
            {props.children}
          </div>
          {props.communities}
        </Container>
      </main>
    );
  } else if (res.status === 404) {
    return redirect(ROUTES.SIGNIN);
  } else if (res.status === 422) {
    return redirect(ROUTES.ONBOARDING);
  }
}
