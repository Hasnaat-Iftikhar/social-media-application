import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const communities = [
  {
    title: "Community 1",
    href: "/",
  },
  {
    title: "Community 2",
    href: "/",
  },
  {
    title: "Community 3",
    href: "/",
  },
];

const users = [
  {
    title: "User 1",
    href: "/",
  },
  {
    title: "User 2",
    href: "/",
  },
  {
    title: "User 3",
    href: "/",
  },
];

const InfoBox: FC<{
  label: string;
  className?: string;
  children: ReactNode;
}> = ({ label, className = "", children }) => {
  return (
    <div className={cn(className, "flex flex-col gap-[8px]")}>
      <label className="text-[18px] font-medium">{label}</label>
      <div className="flex flex-col gap-[4px]">{children}</div>
    </div>
  );
};

interface CommunitySidebarProps {
  className?: string;
}

const CommunitySidebar: FC<CommunitySidebarProps> = ({
  className = "",
  ...props
}) => {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-[30px]">
        <InfoBox label="Communities">
          {communities.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.title}
            </Link>
          ))}
        </InfoBox>
        <InfoBox label="Active Users">
          {users.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.title}
            </Link>
          ))}
        </InfoBox>
      </div>
    </nav>
  );
};

export default CommunitySidebar;
