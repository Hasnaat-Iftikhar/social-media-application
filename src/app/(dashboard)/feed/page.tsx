import Message from "@/components/Message";
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { formatTimeDifference } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface Thread {
  _id: string;
  text: string;
  author: {
    _id: string;
    id: string;
    bio: string;
    communities: string[];
    image: string;
    name: string;
    onboarded: boolean;
    threads: string[];
    username: string;
  };
  community: string | null;
  children: string[];
  createdAt: string;
}

const Page = async () => {
  const res = await fetchThreads({
    pageNumber: 1,
    pageSize: 30,
  });

  const threads = await res.json().then((r) => r.data.threads);

  if (threads?.length === 0) {
    return (
      <Message
        Icon={<AlertCircle />}
        title="No feed found!"
        description="Please include more feeds for certain activities."
      />
    );
  }

  return (
    <div className="flex flex-col gap-[12px]">
      {threads?.map((item: Thread) => (
        <ThreadCard
          key={item._id}
          _id={item._id}
          text={item.text}
          createdAt={formatTimeDifference(item.createdAt)}
          author={{
            id: item.author.id,
            username: item.author.username,
            name: item.author.name,
            image: item.author.image,
            bio: item.author.bio,
          }}
        />
      ))}
    </div>
  );
};

export default Page;
