import z from "zod";

// create new question validation
export const createQuestionSchema = z.object({
  body: z.object({
    data: z.array(
      z.object({
        formId: z.string({
          required_error: "Form id is required!",
        }),
        text: z
          .string({
            required_error: "Text is required!",
          })
          .min(2, { message: "Text should be at least 2 characters." }),
        type: z.enum([
          "SHORT_ANSWER",
          "PARAGRAPH",
          "MULTIPLE_CHOICE",
          "CHECKBOXES",
          "DROPDOWN",
        ]),
        description: z.string().optional(),
        order: z.number(),
        questionOption: z
          .array(
            z.object({
              option: z
                .string({
                  required_error: "Option is required",
                })
                .min(2, { message: "Option should be at least 2 characters." }),
              order: z.number(),
            }),
          )
          .optional(),
      }),
    ),
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
    order: z.number().optional(),
    questionOption: z
      .array(
        z.object({
          id: z.string({ required_error: "Option id is required!" }).optional(),
          option: z
            .string({
              required_error: "Option is required",
            })
            .min(2, { message: "Option should be at least 2 characters." }),
          order: z.number(),
        }),
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

// update question validation
export const deleteQuestionOptionSchema = z.object({
  params: z.object({
    questionId: z.string({
      required_error: "Question id is required!",
    }),
    questionOptionId: z.string({
      required_error: "Question option id is required!",
    }),
  }),
});

export type CreateQuestionSchema = z.infer<typeof createQuestionSchema>["body"];

export type UpdateQuestionSchema = z.infer<typeof updateQuestionSchema>;

export type DeleteQuestionSchema = z.infer<
  typeof deleteQuestionSchema
>["params"];

export type DeleteQuestionOptionSchema = z.infer<
  typeof deleteQuestionOptionSchema
>["params"];
