"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { createResponse } from "../utils";

interface CreateThread {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: CreateThread) {
  try {
    connectToDB();

    const createdThread = await Thread.create({
      text,
      author,
      community: communityId,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}

interface FetchThreads {
  pageNumber: number;
  pageSize: number;
}

export async function fetchThreads({ pageNumber, pageSize }: FetchThreads) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const threadsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const threads = await threadsQuery.exec();

    const isNext = totalPostsCount > skipAmount + threads.length;

    return createResponse(false, { threads, isNext }, 200);
  } catch (error: any) {
    throw new Error(`Failed to fetch thread: ${error.message}`);
  }
}
