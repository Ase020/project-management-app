"use client";

import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import UserCard from "@/components/UserCard";
import { useSearchQuery } from "@/state/api";
import { debounce } from "lodash";
import React from "react";

function Search() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  React.useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />

      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleSearch}
        />
      </div>

      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching search results.</p>}
        {!isLoading && !isError && searchResults && (
          <div className="flex flex-col gap-3">
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <h2 className="text-lg font-semibold">Tasks</h2>
            )}
            {searchResults.tasks?.map((task) => (
              <TaskCard task={task} key={task.id} />
            ))}

            {searchResults.projects && searchResults.projects?.length > 0 && (
              <h2 className="text-lg font-semibold">Projects</h2>
            )}
            {searchResults.projects?.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}

            {searchResults.users && searchResults.users?.length > 0 && (
              <h2 className="text-lg font-semibold">Users</h2>
            )}
            {searchResults.users?.map((user) => (
              <UserCard user={user} key={user.userId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
