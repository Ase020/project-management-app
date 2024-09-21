import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";

function TaskCard({ task }: { task: Task }) {
  const {
    assignee,
    attachments,
    author,
    description,
    dueDate,
    id,
    priority,
    startDate,
    status,
    tags,
    title,
  } = task;
  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {attachments && attachments.length > 0 && (
        <div className="">
          <strong>Attachments:</strong>
          <div className="flex flex-wrap">
            {attachments && attachments.length > 0 && (
              <Image
                src={`/${attachments[0].fileURL}`}
                alt={attachments[0].fileName}
                height={200}
                width={400}
                className="rounded-md"
              />
            )}
          </div>
        </div>
      )}
      <p className="">
        <strong>ID: </strong>
        {id}
      </p>

      <p className="">
        <strong>Title: </strong>
        {title}
      </p>

      <p className="">
        <strong>Description:</strong>{" "}
        {description || "No description provided."}
      </p>

      <p className="">
        <strong>Status: </strong>
        {status}
      </p>

      <p className="">
        <strong>Priority: </strong>
        {priority}
      </p>

      <p className="">
        <strong>Tags: </strong>
        {tags || "No tags"}
      </p>

      <p className="">
        <strong>Author: </strong>
        {author ? author.username : "Unknown"}
      </p>

      <p className="">
        <strong>Assignee: </strong>
        {assignee ? assignee.username : "Unassigned"}
      </p>

      <p className="">
        <strong>Start Date: </strong>
        {startDate ? format(new Date(startDate), "P") : "Not set"}
      </p>

      <p className="">
        <strong>Due Date: </strong>
        {dueDate ? format(new Date(dueDate), "P") : "Not set"}
      </p>
    </div>
  );
}

export default TaskCard;
