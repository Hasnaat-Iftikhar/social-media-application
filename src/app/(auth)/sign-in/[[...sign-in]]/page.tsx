import AuthLayout from "@/components/layouts/AuthLayout";
import ROUTES from "@/constants/routes";
import { fetchUser } from "@/lib/actions/user.actions";
import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
  const res = await fetchUser();

  if (res.status === 200) {
    return redirect(ROUTES.FEED);
  } else if (res.status === 404) {
    return (
      <AuthLayout>
        <SignIn />
      </AuthLayout>
    );
  } else if (res.status === 422) {
    return redirect(ROUTES.ONBOARDING);
  }
}
