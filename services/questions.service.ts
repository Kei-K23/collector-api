import { db } from "../lib/db";
import {
  CreateFormSchema,
  DeleteFormSchema,
  UpdateFormSchema,
} from "../schema/form.schema";
import { CreateQuestionSchema } from "../schema/questions.schema";

// create new question
export async function createQuestion({ data }: { data: CreateQuestionSchema }) {
  try {
    return await db.question.createMany({
      data: [...data.data],
    });
  } catch (e: any) {
    throw new Error("Something went wrong when creating question.");
  }
}

// update the question
export async function updateQuestion({ data }: { data: any }) {
  try {
    // update
    return await db.question;
  } catch (e: any) {
    throw new Error("Something went wrong when updating question.");
  }
}

// delete the question
export async function deleteQuestion({ formId, userId }: DeleteFormSchema) {
  try {
    await db.question;
  } catch (e: any) {
    throw new Error("Something went wrong when deleting question.");
  }
}
