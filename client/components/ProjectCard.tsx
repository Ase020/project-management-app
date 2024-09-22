import { Project } from "@/state/api";
import React from "react";
import { format } from "date-fns";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  const { name, description, startDate, endDate } = project;
  return (
    <div className="rounded border p-4 shadow">
      <h3 className="">Name: {name}</h3>
      <p className="">Description: {description}</p>
      {startDate && (
        <p className="">Start Date: {format(new Date(startDate), "P")}</p>
      )}

      {endDate && (
        <p className="">Start Date: {format(new Date(endDate), "P")}</p>
      )}
    </div>
  );
};

export default ProjectCard;
