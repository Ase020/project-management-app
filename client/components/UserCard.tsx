import { User } from "@/state/api";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  const { username, email, profilePictureUrl } = user;
  return (
    <div className="flex items-center gap-2 rounded border p-4 shadow">
      {profilePictureUrl && (
        <Image
          src={`/${profilePictureUrl}`}
          alt="profile picture"
          width={32}
          height={32}
          className="size-12 rounded-full object-cover"
        />
      )}
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold">{username}</h3>
        <p className="text-xs italic">{email}</p>
      </div>
    </div>
  );
};

export default UserCard;
