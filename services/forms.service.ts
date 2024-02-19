import { db } from "../lib/db";
import {
  CreateFormSchema,
  DeleteFormSchema,
  UpdateFormSchema,
} from "../schema/form.schema";
import { getUserByExternalUserId } from "./user.service";

// create new form
export async function createForm({ data }: { data: CreateFormSchema }) {
  try {
    const user = await getUserByExternalUserId(data.externalUserId);

    if (!user) {
      throw new Error("Unauthorized user.");
    }

    return await db.form.create({
      data: {
        title: data.title,
        description: data.description,
        userId: user.id,
      },
    });
  } catch (e: any) {
    throw new Error("Something went wrong when creating form.");
  }
}

// update the form
export async function updateForm({ data }: { data: UpdateFormSchema }) {
  try {
    const user = await getUserByExternalUserId(data.params.externalUserId);

    if (!user) {
      throw new Error("Unauthorized user.");
    }

    return await db.form.update({
      where: {
        id: data.params.formId,
        userId: user.id,
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
export async function getAllFormsByUserId({
  externalUserId,
}: {
  externalUserId: string;
}) {
  try {
    const user = await getUserByExternalUserId(externalUserId);

    if (!user) {
      throw new Error("Unauthorized user.");
    }

    return await db.form.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (e: any) {
    throw new Error("Something went wrong when getting forms.");
  }
}

// get form with form id and user id
export async function getFormByFormIdAndUserId({
  externalUserId,
  formId,
}: {
  externalUserId: string;
  formId: string;
}) {
  try {
    const user = await getUserByExternalUserId(externalUserId);

    if (!user) {
      throw new Error("Unauthorized user.");
    }

    return await db.form.findUnique({
      where: {
        id: formId,
        userId: user.id,
      },
      include: {
        question: {
          include: {
            questionOption: {
              orderBy: {
                order: "asc",
              },
            },
          },
          orderBy: {
            order: "asc",
          },
        },
        response: {
          include: {
            answer: {
              include: {
                answerOption: true,
                question: true,
              },
            },
            user: true,
          },
        },
      },
    });
  } catch (e: any) {
    throw new Error("Something went wrong when getting form.");
  }
}
