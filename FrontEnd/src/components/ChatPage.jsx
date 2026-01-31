import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setSelectedUser } from "@/redux/authSlice";
import { Button } from "./ui/button";
import { ArrowLeft, MessageCircleCode } from "lucide-react";
import Messages from "./Messages";
import axios from "axios";
import { setMessages } from "@/redux/chatSlice";

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `https://insta-clone-td88.onrender.com/api/v1/message/send/${receiverId}`,
        { textMessage },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);

  return (
    <div className="flex h-[calc(100vh-64px)] md:h-screen w-full bg-white">
      {/* ================= USERS LIST ================= */}
      <aside
        className={`
          border-r border-gray-200
          w-full md:w-[320px]
          ${selectedUser ? "hidden md:flex" : "flex"}
          flex-col
        `}
      >
        <div className="p-4 border-b font-bold text-lg">
          {user?.username}
        </div>

        <div className="flex-1 overflow-y-auto">
          {suggestedUsers.map((suggestedUser) => {
            const isOnline = onlineUsers.includes(suggestedUser?._id);
            return (
              <div
                key={suggestedUser?._id}
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100"
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage src={suggestedUser?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {suggestedUser?.username}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      isOnline ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {isOnline ? "online" : "offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* ================= CHAT AREA ================= */}
      <section
        className={`
          flex-1 flex flex-col
          ${!selectedUser ? "hidden md:flex" : "flex"}
        `}
      >
        {selectedUser ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b sticky top-0 bg-white z-10">
              {/* Mobile back button */}
              <button
                className="md:hidden"
                onClick={() => dispatch(setSelectedUser(null))}
              >
                <ArrowLeft />
              </button>

              <Avatar>
                <AvatarImage src={selectedUser?.profilePicture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-medium">
                {selectedUser?.username}
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
              <Messages selectedUser={selectedUser} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 p-3 border-t bg-white">
              <input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none"
                placeholder="Type a message..."
              />
              <Button
                disabled={!textMessage.trim()}
                onClick={() => sendMessageHandler(selectedUser?._id)}
              >
                Send
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageCircleCode className="w-24 h-24 mb-4" />
            <h1 className="font-medium text-lg">Your messages</h1>
            <p className="text-sm">
              Select a user to start chatting
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ChatPage;
