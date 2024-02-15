import z from "zod";

// create new form validation
export const createFormSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required!",
      })
      .min(2, {
        message: "Title should be at least 2 character2.",
      }),
    description: z.string().optional(),
    externalUserId: z.string({
      required_error: "External user id is required!",
    }),
  }),
});

// update form validation
export const updateFormSchema = z.object({
  params: z.object({
    formId: z.string({
      required_error: "Form id is required!",
    }),
    externalUserId: z.string({
      required_error: "External user id is required!",
    }),
  }),
  body: z.object({
    title: z
      .string()
      .min(2, {
        message: "Title should be at least 2 characters.",
      })
      .optional(),
    description: z.string().optional(),
  }),
});

// update form validation
export const deleteFormSchema = z.object({
  params: z.object({
    formId: z.string({
      required_error: "Form id is required!",
    }),
    userId: z.string({
      required_error: "User id is required!",
    }),
  }),
});

// get forms with user id validation
export const getAllFormsByUserIdSchema = z.object({
  params: z.object({
    externalUserId: z.string({
      required_error: "External user id is required!",
    }),
  }),
});

// get form with form id and user id validation
export const getFormByFormIdAndUserIdSchema = z.object({
  params: z.object({
    formId: z.string({
      required_error: "Form id is required!",
    }),
    externalUserId: z.string({
      required_error: "External user id is required!",
    }),
  }),
});

export type CreateFormSchema = z.infer<typeof createFormSchema>["body"];

export type GetAllFormsByUserIdSchema = z.infer<
  typeof getAllFormsByUserIdSchema
>["params"];

export type GetFormByFormIdAndUserIdSchema = z.infer<
  typeof getFormByFormIdAndUserIdSchema
>;

export type UpdateFormSchema = z.infer<typeof updateFormSchema>;

export type DeleteFormSchema = z.infer<typeof deleteFormSchema>["params"];
