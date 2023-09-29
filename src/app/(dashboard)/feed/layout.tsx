import { ReactNode } from "react";
import { redirect } from "next/navigation";

// Components
import Container from "@/components/shared/Container";
import Navbar from "@/components/shared/Navbar";

// Routes
import ROUTES from "@/constants/routes";

// Libs
import { fetchUser } from "@/lib/actions/user.actions";

export default async function FeedsLayout(props: {
  children: ReactNode;
  user: ReactNode;
  communities: ReactNode;
}) {
  const res = await fetchUser();

  if (res.status === 200) {
    return (
      <main className="h-screen flex flex-col">
        <Navbar />
        <Container className="flex-1 flex flex-row">
          {props.user}
          <div className="p-[20px] flex-1 h-full">{props.children}</div>
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
