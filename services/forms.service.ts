import { db } from "../lib/db";
import {
  CreateFormSchema,
  DeleteFormSchema,
  UpdateFormSchema,
} from "../schema/form.schema";

// create new form
export async function createForm({ data }: { data: CreateFormSchema }) {
  try {
    return await db.form.create({
      data,
    });
  } catch (e: any) {
    throw new Error("Something went wrong when creating form.");
  }
}

// update the form
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

// delete the form
export async function deleteForm({ formId, userId }: DeleteFormSchema) {
  try {
    await db.form.delete({
      where: {
        id: formId,
        userId,
      },
    });
  } catch (e: any) {
    throw new Error("Something went wrong when deleting form.");
  }
}

// get all forms with user id
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

// get form with form id and user id
export async function getFormByFormIdAndUserId({
  userId,
  formId,
}: {
  userId: string;
  formId: string;
}) {
  try {
    return await db.form.findUnique({
      where: {
        id: formId,
        userId,
      },
    });
  } catch (e: any) {
    throw new Error("Something went wrong when getting form.");
  }
}
