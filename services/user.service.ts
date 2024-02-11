import { db } from "../lib/db";
import { CreateUserSchema } from "../schema/user.schema";

export async function createUser({ data }: { data: CreateUserSchema }) {
  try {
    return await db.user.create({
      data,
    });
  } catch (e: any) {
    throw new Error("Something went wrong when creating user.");
  }
}
