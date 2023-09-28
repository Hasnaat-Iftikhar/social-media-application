"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

// React hook form with zod validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserValidation, { AccountFormValues } from "@/lib/validations/user";

// Libs
import { updateUser } from "@/lib/actions/user.actions";
import { UploadButton } from "@/lib/uploadthing";

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/Form";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// Icons
import { Loader, User2 } from "lucide-react";

// Types
import AccountProfileType from "@/lib/types/accountProfile.type";

interface PropTypes {
  user: AccountProfileType | { id: string };
  buttonText: string;
}

const AccountProfileForm: FC<PropTypes> = ({ user, buttonText }) => {
  const [image, setImage] = useState<string>("image" in user ? user.image : "");
  const [imageUploading, setImageUploading] = useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      name: user?.name ? user.name : "",
      username: user?.username ? user.username : "",
      bio: user?.bio ? user.bio : "",
    },
  });

  async function onSubmit(values: AccountFormValues) {
    await updateUser({
      userId: user?.id,
      name: values.name,
      username: values.username,
      image: image,
      bio: values.bio,
      path: pathname,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/feeds");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-[20px] flex flex-col gap-[18px]"
      >
        <div className="flex flex-row items-end gap-2">
          <FormLabel className="relative w-[70px] h-[70px] bg-primary-HOVER flex justify-center items-center rounded-[10px] overflow-hidden">
            {image ? (
              <Image
                src={image}
                alt="profile_icon"
                fill
                priority
                className="object-contain"
              />
            ) : (
              <div className="w-[22px] h-[22px]">
                <User2 width="100%" height="100%" className="text-black" />
              </div>
            )}
          </FormLabel>
          <div className="relative flex-1 text-base-semibold text-black z-[10] flex gap-[8px]">
            <UploadButton
              className="absolute top-0 left-0 right-0 bottom-0 opacity-0"
              endpoint="imageUploader"
              onClientUploadComplete={(res: any) => {
                setImageUploading(false);
                if (res[0].fileUrl) {
                  setImage(res[0].fileUrl);
                }
              }}
              onUploadBegin={() => {
                setImageUploading(true);
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
            <Input
              className="flex-1"
              readOnly={true}
              value={image ? image : "Please select an image"}
            />
            {imageUploading && (
              <div className="w-[40px] h-[40px] flex justify-center items-center border border-[rgba(0,0,0,0.1)] rounded-[6px]">
                <Loader width={14} height={14} />
              </div>
            )}
          </div>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="onboardingForm_group">
              <FormLabel className="onboardingForm_label">Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="onboardingForm_input"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="onboardingForm_group">
              <FormLabel className="onboardingForm_label">Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="onboardingForm_input"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="onboardingForm_group">
              <FormLabel className="onboardingForm_label">Bio</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  className="onboardingForm_input"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="uppercase font-semibold text-[11px] hover:bg-primary-HOVER"
        >
          {buttonText}
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfileForm;
