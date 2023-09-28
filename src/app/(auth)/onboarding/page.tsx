import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Libs
import { fetchUser } from "@/lib/actions/user.actions";

// Components
import AccountProfileForm from "@/components/forms/AccountProfileForm";

// Routes
import ROUTES from "@/constants/routes";

export const metadata: Metadata = {
  title: "Onboarding | Social media application",
  description:
    "Welcome to our social media platform where you can connect with friends, share moments, and explore the world. Join the community today!",
};

const Page = async () => {
  const user = await currentUser();
  if (!user) return redirect(ROUTES.SIGNIN);

  const userInfo = await fetchUser(user.id);
  if (userInfo && userInfo?.onboarded) redirect(ROUTES.FEEDS);

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo
      ? userInfo?.username
      : user.firstName?.toLowerCase() ?? "",
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl ?? "",
  };

  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 24px 48px",
      }}
      className="bg-white w-[400px] py-[38px] px-[32px] rounded-[20px]"
    >
      <div>
        <h3 className="onboardingForm_title">Onboarding</h3>
        <p className="onboardingForm_subTitle">
          Please fill out that form to onboard
        </p>
        <AccountProfileForm user={userData} buttonText="Continue" />
      </div>
    </div>
  );
};

export default Page;
