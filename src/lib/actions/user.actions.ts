"use server";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

import { currentUser } from "@clerk/nextjs";

// Utils
import { createResponse } from "../utils";

// Types
import AccountProfileType from "../types/accountProfile.type";

export async function fetchUser() {
  try {
    connectToDB();

    const clerkUser = await currentUser();

    if (!clerkUser) {
      return createResponse(true, { message: "User not found" }, 404);
    }

    const user = await User.findOne({ id: clerkUser.id });

    if (!user || !user.onboarded) {
      return createResponse(true, { userId: clerkUser.id }, 422);
    }

    const successResponse: AccountProfileType = {
      _id: user._doc._id,
      id: user._doc.id,
      name: user._doc.name,
      username: user._doc.username,
      email: user._doc.email,
      image: user._doc.image ? user._doc.image : "",
      bio: user._doc.bio,
      communities: user._doc.communities,
      threads: user._doc.threads,
      onboarded: user._doc.onboarded,
    };

    return createResponse(false, successResponse, 200);
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

interface UpdateUser {
  userId: string;
  name: string;
  username: string;
  image: string;
  bio: string;
  path: string;
}

export async function updateUser({
  userId,
  name,
  username,
  image,
  bio,
  path,
}: UpdateUser) {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
