// Auth
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import ROUTES from "@/constants/routes";

export default async function Home() {
  const res = await fetchUser();

  if (res.status === 200) {
    redirect(ROUTES.FEED);
  } else if (res.status === 404) {
    redirect(ROUTES.SIGNIN);
  } else if (res.status === 422) {
    redirect(ROUTES.ONBOARDING);
  }
}
