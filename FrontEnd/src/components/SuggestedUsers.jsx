import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function SuggestedUsers() {
  const { suggestedUsers } = useSelector(store => store.auth);

  return (
    <div className="my-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-600">Suggested for you</h2>
        <span className="text-blue-600 text-sm font-medium cursor-pointer">View all</span>
      </div>

      {/* Users List */}
      <div className="flex flex-col gap-4">
        {suggestedUsers.map(user => (
          <div
            key={user?._id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <Link to={`/profile/${user?._id}`} className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>NN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="font-semibold">{user?.username}</h3>
                <p className="text-gray-500 text-sm truncate max-w-xs">
                  {user?.bio || "Full Stack Developer"}
                </p>
              </div>
            </Link>
            <button className="text-blue-600 text-sm font-bold hover:text-blue-700">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestedUsers;
