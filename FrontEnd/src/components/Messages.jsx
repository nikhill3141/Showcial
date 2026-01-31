import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetRTM from "@/hooks/useGetRTM";
import useGetAllMessage from "@/hooks/useGetAllMessages";

const Messages = ({ selectedUser }) => {
  useGetRTM();
  useGetAllMessage();
  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="flex flex-col h-full p-4 w-full max-w-md mx-auto md:max-w-lg lg:max-w-xl">
      {/* User Info */}
      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-20 w-20 md:h-24 md:w-24">
          <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="mt-2 font-semibold text-lg md:text-xl">
          {selectedUser?.username}
        </span>
        <Link to={`/profile/${selectedUser?._id}`}>
          <Button
            className="mt-2 h-8 md:h-10 text-sm md:text-base"
            variant="secondary"
          >
            View profile
          </Button>
        </Link>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-3 overflow-y-auto h-[60vh] md:h-[65vh] px-2">
        {messages &&
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.senderId === user?._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs break-words ${
                  msg.senderId === user?._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Messages;
