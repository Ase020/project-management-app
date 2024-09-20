"use client";

import React from "react";
import ProjectHeader from "../ProjectHeader";

function Project({ params }: { params: { id: string } }) {
  const { id } = params;
  const [activeTab, setActiveTab] = React.useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = React.useState(false);
  console.log(id);
  return (
    <div className="">
      {/* Modal new task */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default Project;
