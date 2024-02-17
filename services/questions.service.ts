import { QuestionType } from "@prisma/client";
import { db } from "../lib/db";
import {
  CreateQuestionSchema,
  DeleteQuestionSchema,
  UpdateQuestionSchema,
} from "../schema/questions.schema";

// create new question
export async function createQuestion({ data }: { data: CreateQuestionSchema }) {
  const { data: questionData } = data;

  try {
    const createdQuestions = await Promise.all(
      questionData.map(async (question) => {
        const { formId, text, type, questionOption, order, description } =
          question;

        let createdQuestion;

        if (questionOption && questionOption.length > 0) {
          // If questionOption is present and not empty
          createdQuestion = await db.question.create({
            data: {
              formId,
              text,
              type,
              description,
              order,
              questionOption: {
                createMany: {
                  data: questionOption,
                },
              },
            },
            include: {
              questionOption: true,
            },
          });
        } else {
          // If questionOption is absent or empty
          createdQuestion = await db.question.create({
            data: {
              order,
              formId,
              description,
              text,
              type,
            },
          });
        }

        return createdQuestion;
      }),
    );

    return createdQuestions;
  } catch (e: any) {
    throw new Error("Something went wrong when creating questions.");
  }
}

// update the question
export async function updateQuestion({
  data,
  questionId,
}: {
  data: UpdateQuestionSchema;
  questionId: string;
}) {
  try {
    let updatedQuestion;
    // Update the question
    updatedQuestion = await db.question.update({
      where: {
        id: data.params.questionId,
        formId: data.params.formId,
      },
      data: {
        text: data.body.text,
        type: data.body.type,
        description: data.body.description,
        order: data.body.order,
      },
      include: {
        questionOption: true,
      },
    });

    if (
      data.body.type === QuestionType["SHORT_ANSWER"] ||
      data.body.type === QuestionType["PARAGRAPH"]
    ) {
      if (
        updatedQuestion.questionOption &&
        updatedQuestion.questionOption.length > 0
      ) {
        await db.questionOption.deleteMany({
          where: {
            questionId: questionId,
          },
        });
        return;
      }
    }

    // Update question options if provided
    if (data.body.questionOption && data.body.questionOption.length > 0) {
      await Promise.all(
        data.body.questionOption.map(async (option) => {
          if (option.id) {
            // If option ID is provided, update the existing option
            await db.questionOption.update({
              where: {
                id: option.id,
              },
              data: {
                option: option.option,
                order: option.order,
              },
              include: {
                question: true,
              },
            });
          } else {
            // If option ID is not provided, create a new option
            await db.questionOption.create({
              data: {
                questionId: data.params.questionId,
                option: option.option,
                order: option.order,
              },
              include: {
                question: true,
              },
            });
          }
        }),
      );
    }

    return updatedQuestion;
  } catch (e: any) {
    throw new Error("Something went wrong when updating question.");
  }
}

// delete the question
export async function deleteQuestion({
  formId,
  questionId,
}: DeleteQuestionSchema) {
  try {
    await db.question.delete({
      where: {
        id: questionId,
        formId,
      },
    });
  } catch (e: any) {
    throw new Error("Something went wrong when deleting question.");
  }
}
