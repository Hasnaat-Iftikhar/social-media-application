import * as z from "zod";

const CommentValidation = z.object({
  thread: z.string().nonempty(),
});

export type CommentFormValues = z.infer<typeof CommentValidation>;

export default CommentValidation;
