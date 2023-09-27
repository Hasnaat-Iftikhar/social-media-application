import type { Metadata } from "next";

// Components
import AccountProfileForm from "@/components/forms/AccountProfileForm";

export const metadata: Metadata = {
  title: "Onboarding | Social media application",
  description:
    "Welcome to our social media platform where you can connect with friends, share moments, and explore the world. Join the community today!",
};

const Page = () => {
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
        <AccountProfileForm
          user={{
            id: "",
            name: "",
            image: "",
            bio: "",
            objectId: "",
            username: "",
          }}
          buttonText="Continue"
        />
      </div>
    </div>
  );
};

export default Page;
