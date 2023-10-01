"use client";

import { Button } from "@/components/ui/Button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="my-auto flex flex-col justify-center items-center gap-[10px]">
      <h2 className="text-[18px] font-normal">
        Something went wrong in feeds!
      </h2>
      <Button
        className="bg-white border-[2px] border-blue rounded-full h-[32px] px-[20px] text-blue font-medium hover:bg-white"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </div>
  );
}
