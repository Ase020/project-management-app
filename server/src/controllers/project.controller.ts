import { Request, Response } from "express";
import prisma from "../lib/prisma";

export async function getProjects(req: Request, res: Response): Promise<void> {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error fetching projects: ${error.message}`, error });
  }
}

export async function createProject(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const newProject = await prisma.project.create({
      data: req.body,
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating project: ${error.message}`, error });
  }
}
