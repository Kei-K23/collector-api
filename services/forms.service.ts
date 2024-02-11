import { db } from "../lib/db";
import { CreateFormSchema, UpdateFormSchema } from "../schema/form.schema";

export async function createForm({ data }: { data: CreateFormSchema }) {
  try {
    return await db.form.create({
      data,
    });
  } catch (e: any) {
    throw new Error("Something went wrong when creating form.");
  }
}

export async function updateForm({ data }: { data: UpdateFormSchema }) {
  try {
    return await db.form.update({
      where: {
        id: data.params.formId,
      },
      data: {
        ...data.body,
      },
    });
  } catch (e: any) {
    throw new Error("Something went wrong when updating form.");
  }
}

export async function getAllFormsByUserId({ userId }: { userId: string }) {
  try {
    return await db.form.findMany({
      where: {
        userId,
      },
    });
  } catch (e: any) {
    throw new Error("Something went wrong when getting forms.");
  }
}
