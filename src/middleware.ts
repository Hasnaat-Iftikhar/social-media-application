import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import ROUTES from "./constants/routes";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/api/webhook/clerk", "/"],
  ignoredRoutes: ["/api/webhook/clerk", "/onboarding"],
  afterAuth(auth, req) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // redirect them to feeds page
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== ROUTES.FEEDS) {
      const orgSelection = new URL(ROUTES.FEEDS, req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
