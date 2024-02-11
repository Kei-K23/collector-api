import z from "zod";

// create user validation
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

// update user validation
export const updateUserSchema = z.object({
  params: z.object({
    userId: z.string({
      required_error: "User id is required!",
    }),
  }),
  body: z.object({
    name: z
      .string()
      .min(2, {
        message: "Name should be at least 2 characters.",
      })
      .optional(),
    username: z
      .string()
      .min(2, {
        message: "User name should be at least 2 characters.",
      })
      .optional(),
    email: z.string().optional(),
    imageUrl: z.string().optional(),
  }),
});

// update user validation
export const deleteUserSchema = z.object({
  params: z.object({
    userId: z.string({
      required_error: "User id is required!",
    }),
  }),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>["body"];

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export type DeleteUserSchema = z.infer<typeof deleteUserSchema>["params"];
