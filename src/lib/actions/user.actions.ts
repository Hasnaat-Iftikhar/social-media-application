"use server";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

import { currentUser } from "@clerk/nextjs";

// Utils
import { createErrorResponse } from "../utils";

export async function fetchUser() {
  try {
    connectToDB();

    const clerkUser = await currentUser();

    if (!clerkUser) {
      return createErrorResponse("User not found", 404);
    }

    const user = await User.findOne({ id: clerkUser.id });

    if (!user.onboarded) {
      return createErrorResponse("User not onboarded", 422);
    }

    const successResponse = {
      _id: user._doc._id,
      id: user._doc.id,
      name: user._doc.name,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      username: user._doc.username,
      email: user._doc.email,
      image: user._doc.image ? user._doc.image : clerkUser.imageUrl,
      bio: user._doc.bio,
      communities: user._doc.communities,
      threads: user._doc.threads,
      onboarded: user._doc.onboarded,
    };

    return new Response(JSON.stringify(successResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
