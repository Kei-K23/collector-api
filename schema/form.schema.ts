import z from "zod";

export const createFormSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required!",
    }),
    description: z.string({}).optional(),
    userId: z.string({
      required_error: "User id is required!",
    }),
  }),
});

export type CreateFormSchema = z.infer<typeof createFormSchema>["body"];
