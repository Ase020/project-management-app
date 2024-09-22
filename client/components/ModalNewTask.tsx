import React from "react";
import { formatISO } from "date-fns";
import Modal from "./Modal";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";

type Props = {
  id?: string | null;
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewTask = ({ id = null, isOpen, onClose }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState<Status>(Status.ToDo);
  const [priority, setPriority] = React.useState<Priority>(Priority.Backlog);
  const [tags, setTags] = React.useState("");
  const [authorUserId, setAuthorUserId] = React.useState("");
  const [assignedUserId, setAssignedUserId] = React.useState("");
  const [projectId, setProjectId] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [dueDate, setdueDate] = React.useState("");

  const handleSubmit = async () => {
    if (!title || !authorUserId || !(id !== null || projectId)) return;

    await createTask({
      title,
      description,
      status,
      priority,
      tags,
      projectId: id !== null ? Number(id) : Number(projectId),
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
      startDate: formatISO(new Date(startDate), {
        representation: "complete",
      }),
      dueDate: formatISO(new Date(dueDate), {
        representation: "complete",
      }),
    });
  };

  const isFormValid = () => {
    return title || authorUserId || id !== null || projectId;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create new task">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mt-4 space-y-6"
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            value={status}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setStatus(Status[e.target.value as keyof typeof Status])
            }
            className={selectStyles}
          >
            <option value="">Select status</option>
            <option value={Status.ToDo}>To Do</option>
            <option value={Status.Completed}>Completed</option>
            <option value={Status.UnderReview}>Under Review</option>
            <option value={Status.WorkInProgress}>Work In Progress</option>
          </select>

          <select
            value={priority}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setPriority(Priority[e.target.value as keyof typeof Priority])
            }
            className={selectStyles}
          >
            <option value="">Select priority</option>
            <option value={Priority.Backlog}>Backlog</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Urgent}>Urgent</option>
          </select>
        </div>

        <input
          type="text"
          className={inputStyles}
          placeholder="Tags(comma separated)"
          value={tags}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTags(e.target.value)
          }
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStartDate(e.target.value)
            }
          />

          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setdueDate(e.target.value)
            }
          />
        </div>

        <input
          type="text"
          className={inputStyles}
          placeholder="Author User ID"
          value={authorUserId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAuthorUserId(e.target.value)
          }
        />

        <input
          type="text"
          className={inputStyles}
          placeholder="Assigned User ID"
          value={assignedUserId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAssignedUserId(e.target.value)
          }
        />

        {id === null && (
          <input
            type="text"
            className={inputStyles}
            placeholder="ProjectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        )}

        <button
          type="submit"
          className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${!isFormValid || isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
