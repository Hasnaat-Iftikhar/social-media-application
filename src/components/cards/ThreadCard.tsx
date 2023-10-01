import { FC } from "react";
import Image from "next/image";
import { Link2, MoreHorizontal, Settings2, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchUser } from "@/lib/actions/user.actions";

interface ThreadCardProps {
  _id: string;
  text: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    username: string;
    image: string;
    bio: string;
  };
}

const ThreadCard: FC<ThreadCardProps> = async ({
  _id,
  text,
  createdAt,
  author,
}) => {
  const res = await fetchUser();
  const userId = await res.json().then((r) => r.data.id);
  console.log(userId);

  return (
    <div className="bg-white rounded-[12px] flex flex-col gap-[20px] border border-[rgba(0,0,0, 0.1)] p-[14px]">
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-row items-center gap-[12px]">
          <Image
            src={author.image}
            alt={author.name}
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col gap-[2px]">
            <h3 className="text-[14px] font-medium text-black">
              {author.name}
            </h3>
            <p className="text-[12px] text-gray">{author.bio}</p>
            <p className="text-[12px] text-gray">{createdAt}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-0">
            <MoreHorizontal width={20} height={20} color="#282828" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link2 width={16} height={16} color="#424242" className="mr-2" />{" "}
              Copy link to post
            </DropdownMenuItem>
            {userId === author.id && (
              <>
                <DropdownMenuItem>
                  <Settings2
                    width={16}
                    height={16}
                    color="#424242"
                    className="mr-2"
                  />{" "}
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash
                    width={16}
                    height={16}
                    color="#424242"
                    className="mr-2"
                  />{" "}
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <p className="text-[14px] text-black">{text}</p>
      </div>
    </div>
  );
};

export default ThreadCard;
