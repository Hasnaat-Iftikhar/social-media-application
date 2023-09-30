import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ className = "", children }) => {
  return (
    <div className={cn(className, "max-w-[1600px] w-[90%] mx-auto")}>
      {children}
    </div>
  );
};

export default Container;
