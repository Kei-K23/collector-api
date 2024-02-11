import { Request, Response } from "express";
import { createUser } from "../services/user.service";
import { CreateUserSchema } from "../schema/user.schema";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserSchema>,
  res: Response
) {
  try {
    const data = req.body;

    const form = await createUser({ data });

    return res.status(201).json({
      status: 201,
      success: true,
      data: form,
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
