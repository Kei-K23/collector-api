import z from "zod";

// create new form validation
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

// get form with user id validation
export const getAllFormsByUserIdSchema = z.object({
  query: z.object({
    userId: z.string({
      required_error: "User id is required!",
    }),
  }),
});

export type CreateFormSchema = z.infer<typeof createFormSchema>["body"];

export type GetAllFormsByUserIdSchema = z.infer<
  typeof getAllFormsByUserIdSchema
>["query"];
