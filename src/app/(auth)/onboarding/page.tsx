import type { Metadata } from "next";
import { redirect } from "next/navigation";

// Libs
import { fetchUser } from "@/lib/actions/user.actions";

// Components
import AuthLayout from "@/components/layouts/AuthLayout";
import AccountProfileForm from "@/components/forms/AccountProfileForm";

// Routes
import ROUTES from "@/constants/routes";

export const metadata: Metadata = {
  title: "Onboarding | Social media application",
  description:
    "Welcome to our social media platform where you can connect with friends, share moments, and explore the world. Join the community today!",
};

const Page = async () => {
  const res = await fetchUser();

  if (res.status === 200) {
    return redirect(ROUTES.FEEDS);
  } else if (res.status === 404) {
    return redirect(ROUTES.SIGNIN);
  } else if (res.status === 422) {
    const data = await res.json();

    const user = {
      id: data.data.userId,
    };

    return (
      <AuthLayout>
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
            <AccountProfileForm user={user} buttonText="Continue" />
          </div>
        </div>
      </AuthLayout>
    );
  }
};

export default Page;
