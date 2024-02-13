import z from "zod";

// create new question validation
export const createResponseSchema = z.object({
  body: z.object({
    formId: z.string({
      required_error: "Form id is required!",
    }),
    userId: z.string({
      required_error: "User id is required!",
    }),
    answer: z
      .array(
        z.object({
          text: z
            .string({
              required_error: "Text is required",
            })
            .min(2, { message: "Text should be at least 2 characters." })
            .optional(),
          questionId: z.string({
            required_error: "Question id is required!",
          }),
          answerOption: z
            .array(
              z.object({
                questionOptionId: z.string({
                  required_error: "Question id is required!",
                }),
              })
            )
            .optional(),
        })
      )
      .min(1, { message: "At least one answer is required!" }),
  }),
});

// update question validation
export const updateQuestionSchema = z.object({
  params: z.object({
    formId: z.string({
      required_error: "Form id is required!",
    }),
    questionId: z.string({
      required_error: "Question id is required!",
    }),
  }),
  body: z.object({
    text: z
      .string({ required_error: "Text is required!" })
      .min(2, { message: "Text should be at least 2 characters." })
      .optional(),
    type: z
      .enum([
        "SHORT_ANSWER",
        "PARAGRAPH",
        "MULTIPLE_CHOICE",
        "CHECKBOXES",
        "DROPDOWN",
      ])
      .optional(),
    description: z.string().optional(),
    questionOption: z
      .array(
        z.object({
          id: z.string({ required_error: "Option id is required!" }),
          option: z
            .string({
              required_error: "Option is required",
            })
            .min(2, { message: "Option should be at least 2 characters." }),
        })
      )
      .optional(),
  }),
});

// update question validation
export const deleteQuestionSchema = z.object({
  params: z.object({
    formId: z.string({
      required_error: "Form id is required!",
    }),
    questionId: z.string({
      required_error: "Question id is required!",
    }),
  }),
});

export type CreateResponseSchema = z.infer<typeof createResponseSchema>["body"];

export type UpdateQuestionSchema = z.infer<typeof updateQuestionSchema>;

export type DeleteQuestionSchema = z.infer<
  typeof deleteQuestionSchema
>["params"];
