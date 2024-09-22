import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error fetching tasks: ${error.message}`, error });
  }
};
