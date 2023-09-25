"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Components and Libs
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Routes
import ROUTES from "@/constants/routes";

interface Props extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

const items = [
  {
    title: "Feeds",
    href: ROUTES.FEEDS,
  },
  {
    title: "Profile",
    href: "/",
  },
  {
    title: "Settings",
    href: "/",
  },
];

function Sidebar({ className, ...props }: Props) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-primary text-black"
              : "hover:bg-[#f3f3f3]",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export default Sidebar;
