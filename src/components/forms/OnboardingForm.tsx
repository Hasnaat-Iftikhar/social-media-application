"use client";

import { ChangeEvent, FC, useState } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserValidation, { AccountFormValues } from "@/lib/validations/user";

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
import { User2 } from "lucide-react";

interface PropTypes {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
}

const OnboardingForm: FC<PropTypes> = ({ user }) => {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image ? user.image : "",
      name: user?.name ? user.name : "",
      username: user?.username ? user.username : "",
      bio: user?.bio ? user.bio : "",
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  function onSubmit(data: AccountFormValues) {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-[20px] flex flex-col gap-[18px]"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-end gap-2">
                <FormLabel className="relative w-[70px] h-[70px] bg-primary-HOVER flex justify-center items-center rounded-[10px] overflow-hidden">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="profile_icon"
                      fill
                      priority
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-[22px] h-[22px]">
                      <User2
                        width="100%"
                        height="100%"
                        className="text-black"
                      />
                    </div>
                  )}
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-black">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Add profile photo"
                    className="account-form_image-input"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
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
        <Button className="uppercase font-semibold text-[11px] hover:bg-primary-HOVER">
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default OnboardingForm;
