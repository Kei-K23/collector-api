import { db } from "../lib/db";
import { CreateFormSchema } from "../schema/form.schema";

export async function createForm({ data }: { data: CreateFormSchema }) {
  try {
    return await db.form.create({
      data,
    });
  } catch (e: any) {
    throw new Error("Something went wrong when creating form.");
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
