import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Please wait...",
};

const Page = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <p className="text-[16px] font-medium">Please wait</p>
    </div>
  );
};

export default Page;
