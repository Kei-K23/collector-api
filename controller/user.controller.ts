import { Request, Response } from "express";
import { createUser, deleteUser, updateUser } from "../services/user.service";
import {
  CreateUserSchema,
  DeleteUserSchema,
  UpdateUserSchema,
} from "../schema/user.schema";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserSchema>,
  res: Response
) {
  try {
    const data = req.body;

    const user = await createUser({ data });

    return res.status(201).json({
      status: 201,
      success: true,
      message: "Successfully created new user.",
      data: user,
    });
  } catch (e: any) {
    return res
      .status(500)
      .json({
        status: 500,
        success: false,
        error: e.message,
      })
      .end();
  }
}

export async function updateUserHandler(
  req: Request<UpdateUserSchema["params"], {}, UpdateUserSchema["body"]>,
  res: Response
) {
  try {
    const user = await updateUser({
      data: {
        body: req.body,
        params: req.params,
      },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Successfully updated the user.",
      data: user,
    });
  } catch (e: any) {
    return res
      .status(500)
      .json({
        status: 500,
        success: false,
        error: e.message,
      })
      .end();
  }
}

export async function deleteUserHandler(
  req: Request<DeleteUserSchema>,
  res: Response
) {
  try {
    await deleteUser({
      userId: req.params.userId,
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Successfully deleted the user.",
    });
  } catch (e: any) {
    return res
      .status(500)
      .json({
        status: 500,
        success: false,
        error: e.message,
      })
      .end();
  }
}
