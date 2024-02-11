import z from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    username: z.string({
      required_error: "User name is required!",
    }),
    email: z.string({
      required_error: "Email is required!",
    }),
    imageUrl: z.string({}).optional(),
  }),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>["body"];
