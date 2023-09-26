"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

// Icons
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  className?: string;
  customClassName?: string;
  iconClassName?: string;
  iconColor?: string;
  textClassName?: string;
  customText?: string;
}

const BackButton: FC<BackButtonProps> = ({
  className = "",
  customClassName = "",
  iconClassName,
  iconColor,
  textClassName,
  customText,
}) => {
  const router = useRouter();

  const buttonClassNames = customClassName
    ? customClassName
    : "flex justify-start items-center gap-[6px]";

  return (
    <button
      onClick={() => {
        router.back();
      }}
      className={cn(className, buttonClassNames)}
    >
      <ArrowLeft
        className={iconClassName}
        color={iconColor ? iconColor : "#fdc785"}
        width={18}
        height={18}
      />{" "}
      <span className={cn(textClassName, "text-black text-[16px] font-medium")}>
        {customText ? customText : "Go Back"}
      </span>
    </button>
  );
};

export default BackButton;
