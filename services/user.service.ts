import { db } from "../lib/db";
import {
  CreateUserSchema,
  DeleteUserSchema,
  UpdateUserSchema,
} from "../schema/user.schema";

export async function createUser({ data }: { data: CreateUserSchema }) {
  try {
    return await db.user.create({
      data,
    });
  } catch (e: any) {
    throw new Error("Something went wrong when creating user.");
  }
}

export async function updateUser({ data }: { data: UpdateUserSchema }) {
  try {
    return await db.user.update({
      where: {
        id: data.params.userId,
      },
      data: {
        ...data.body,
      },
    });
  } catch (e: any) {
    throw new Error("Something went wrong when updating user.");
  }
}

export async function deleteUser({ userId }: DeleteUserSchema) {
  try {
    return await db.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (e: any) {
    throw new Error("Something went wrong when deleting user.");
  }
}
