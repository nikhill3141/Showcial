import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SuggestedUsers from "./SuggestedUsers";

function RightSidebar() {
  const { user } = useSelector(store => store.auth);

  return (
    <aside className="hidden lg:flex flex-col w-80 px-4 py-6 border-l bg-white fixed right-0 top-0 h-full overflow-y-auto">
      {/* Current User */}
      <Link to={`/profile/${user?._id}`} className="flex items-center gap-3 mb-6">
        <Avatar>
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>NN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-semibold">{user?.username}</h1>
          <p className="text-gray-500 text-sm">{user?.bio || "Full Stack Developer"}</p>
        </div>
      </Link>

      {/* Suggested Users */}
      <SuggestedUsers />
    </aside>
  );
}

export default RightSidebar;
