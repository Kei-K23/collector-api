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
        externalUserId: data.params.externalUserId,
      },
      data: {
        ...data.body,
      },
    });
  } catch (e: any) {
    throw new Error("Something went wrong when updating user.");
  }
}

export async function deleteUser({ externalUserId }: DeleteUserSchema) {
  try {
    await db.user.delete({
      where: {
        externalUserId,
      },
    });
  } catch (e: any) {
    throw new Error("Something went wrong when deleting user.");
  }
}

export async function getUserByExternalUserId(externalUserId: string) {
  try {
    return await db.user.findUnique({
      where: {
        externalUserId,
      },
    });
  } catch (e: any) {
    throw new Error("Something went wrong when getting user.");
  }
}
