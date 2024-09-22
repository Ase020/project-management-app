import Modal from "@/components/Modal";
import { useCreateProjectMutation } from "@/state/api";
import React from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");

  const handleSubmit = async () => {
    if (!name || !start || !end) return;

    const startDate = formatISO(new Date(start), {
      representation: "complete",
    });
    const endDate = formatISO(new Date(end), {
      representation: "complete",
    });

    await createProject({
      name,
      description,
      startDate,
      endDate,
    });
  };

  const isFormValid = () => {
    return name && description && start && end;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";
  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create new project">
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
          placeholder="Project name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <textarea
          className={inputStyles}
          placeholder="Project description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={start}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStart(e.target.value)
            }
          />
          <input
            type="date"
            className={inputStyles}
            value={end}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEnd(e.target.value)
            }
          />
        </div>

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

export default ModalNewProject;
