import z from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required!",
      })
      .min(2, {
        message: "Name should be at least 2 characters.",
      }),
    username: z
      .string({
        required_error: "User name is required!",
      })
      .min(2, {
        message: "User name should be at least 2 characters.",
      }),
    email: z.string({
      required_error: "Email is required!",
    }),
    imageUrl: z.string().optional(),
  }),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>["body"];
