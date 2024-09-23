import { Request, Response } from "express";
import prisma from "../lib/prisma";

export async function getTasks(req: Request, res: Response) {
  const { projectId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });
    res.status(200).json(tasks);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error fetching tasks: ${error.message}`, error });
  }
}

export async function createTask(req: Request, res: Response): Promise<void> {
  try {
    const newTask = await prisma.task.create({
      data: req.body,
    });
    res.status(201).json(newTask);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating task: ${error.message}`, error });
  }
}

export async function updateTask(req: Request, res: Response) {
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: { status },
    });
    res.status(202).json(updatedTask);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating task: ${error.message}`, error });
  }
}

export async function getUserTask(req: Request, res: Response) {
  const { userId } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { authorUserId: Number(userId) },
          { assignedUserId: Number(userId) },
        ],
      },
      include: {
        author: true,
        assignee: true,
      },
    });
    res.status(200).json(tasks);
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: `Error fetching user's tasks: ${error.message}`,
        error,
      });
  }
}
