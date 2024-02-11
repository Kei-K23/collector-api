import { db } from "../lib/db";
import { CreateFormSchema } from "../schema/form.schema";

export async function createForm({ data }: { data: CreateFormSchema }) {
  try {
    return await db.form.create({
      data,
    });
  } catch (e: any) {
    console.log(e);

    throw new Error("Something went wrong when creating form");
  }
}
