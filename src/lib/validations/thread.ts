import * as z from "zod";

const ThreadValidation = z.object({
  thread: z.string().nonempty(),
  userId: z.string(),
});

export type ThreadFormValues = z.infer<typeof ThreadValidation>;

export default ThreadValidation;
