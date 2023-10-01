"use client";

import { FC } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// React hook form with zod validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ThreadValidation, { ThreadFormValues } from "@/lib/validations/thread";

// Components
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { SendHorizontal } from "lucide-react";

// Types
import AccountProfileType from "@/lib/types/accountProfile.type";

// Server actions
import { createThread } from "@/lib/actions/thread.actions";

interface ThreadFormProps {
  user: AccountProfileType;
  className?: string;
}

const ThreadForm: FC<ThreadFormProps> = ({ user, className = "" }) => {
  const pathname = usePathname();

  const form = useForm<ThreadFormValues>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      userId: user._id,
    },
  });

  const onSubmit = async (values: ThreadFormValues) => {
    try {
      await createThread({
        text: values.thread,
        author: user._id,
        communityId: null,
        path: pathname,
      });

      form.reset({
        thread: "",
      });
    } catch (error) {
      console.log("[ERROR] Unable to create thread", error);
    }
  };

  return (
    <div
      className={cn(
        className,
        "bg-white h-[60px] px-[5px] border border-[rgba(0,0,0, 0.1)] flex items-center justify-between rounded-full"
      )}
    >
      <Image
        src={user.image}
        alt={user.name}
        width={50}
        height={50}
        className="object-contain rounded-full"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full flex-1 flex flex-row items-center"
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="threadForm_group">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Start a post"
                    className="threadForm_input"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-[50px] h-[50px] rounded-full hover:bg-primary-HOVER"
          >
            <SendHorizontal color="#282828" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ThreadForm;
