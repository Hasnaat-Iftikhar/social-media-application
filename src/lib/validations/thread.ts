import * as z from "zod";

const ThreadValidation = z.object({
  thread: z.string().nonempty(),
  userId: z.string(),
});

export const CommentValidation = z.object({
  thread: z.string().nonempty(),
});

export type ThreadFormValues = z.infer<typeof ThreadValidation>;

export default ThreadValidation;
