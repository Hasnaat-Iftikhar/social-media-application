import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

// Types
import AccountProfileType from "@/lib/types/accountProfile.type";

const UserInfoCard: FC<{ user: AccountProfileType }> = ({ user }) => {
  return (
    <div className="w-[250px] h-fit bg-white border border-[rgba(0,0,0, 0.1)] rounded-[8px] flex flex-col justify-center items-center gap-[16px] overflow-hidden">
      <div className="relative z-[1] w-full h-[116px] flex items-end justify-center">
        <div className="bg-primary absolute top-0 z-[-1] w-full h-[80px]"></div>
        <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden border-[3px] border-white">
          <Image
            src={user.image}
            alt={user.name}
            priority
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="px-[10px] flex flex-col gap-[4px]">
        <Link
          href="/"
          className="text-[16px] text-black font-semibold text-center hover:underline"
        >
          {user.name}
        </Link>
        <p className="text-gray text-[13px] leading-[18px] font-normal text-center">
          {user.bio}
        </p>
      </div>

      <div className="w-full h-[1px] bg-[#00000019]" />

      <div className="px-[10px] w-full flex flex-col gap-[8px]">
        <div className="flex items-center justify-between">
          <p className="text-[13px] text-gray">Threads</p>
          <p className="text-[#2e6ce6] text-[13px]">112+</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[13px] text-gray">Communities</p>
          <p className="text-[#2e6ce6] text-[13px]">10</p>
        </div>
      </div>

      <Link
        href="/"
        className="w-full border-t border-[rgba(0,0,0, 0.1)] h-[40px] flex justify-center items-center text-[14px] text-[#2e6ce6] font-medium"
      >
        See full profie
      </Link>
    </div>
  );
};

export default UserInfoCard;
