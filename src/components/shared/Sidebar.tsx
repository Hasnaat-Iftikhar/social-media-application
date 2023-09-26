"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Components and Libs
import { buttonVariants } from "@/components/ui/Button";
import { LayoutGrid, User, Settings } from "lucide-react";

// Routes
import ROUTES from "@/constants/routes";

interface Props extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

const items = [
  {
    title: "Feeds",
    href: ROUTES.FEEDS,
    icon: <LayoutGrid width="100%" height="100%" />,
  },
  {
    title: "Profile",
    href: "/",
    icon: <User width="100%" height="100%" />,
  },
  {
    title: "Settings",
    href: "/",
    icon: <Settings width="100%" height="100%" />,
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
            "justify-start items-center gap-[6px]"
          )}
        >
          <div className="w-[18px] h-[18px] text-black">{item.icon}</div>
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export default Sidebar;
