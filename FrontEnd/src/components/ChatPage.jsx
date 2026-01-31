import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Button } from './ui/button';
import { MessageCircleCode } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
  const { onlineUsers, messages } = useSelector(store => store.chat);
  const dispatch = useDispatch();

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `https://insta-clone-td88.onrender.com/api/v1/message/send/${receiverId}`,
        { textMessage },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
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
    return () => dispatch(setSelectedUser(null));
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Left sidebar: Users list */}
      <aside className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 h-[30vh] md:h-auto overflow-y-auto bg-white">
        <div className="p-3 border-b border-gray-200">
          <h1 className="font-bold text-lg md:text-xl">{user?.username}</h1>
        </div>

        <div className="flex flex-col">
          {suggestedUsers.map((suggestedUser) => {
            const isOnline = onlineUsers.includes(suggestedUser?._id);
            return (
              <div
                key={suggestedUser?._id}
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                className="flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer"
              >
                <Avatar className="w-12 h-12 md:w-14 md:h-14">
                  <AvatarImage src={suggestedUser?.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{suggestedUser?.username}</span>
                  <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                    {isOnline ? 'online' : 'offline'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Right chat section */}
      {selectedUser ? (
        <section className="flex-1 flex flex-col h-screen md:h-auto">
          {/* Chat header */}
          <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-200 sticky top-0 bg-white z-10">
            <Avatar>
              <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">{selectedUser?.username}</span>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
            <Messages selectedUser={selectedUser} />
          </div>

          {/* Input section */}
          <div className="flex items-center p-3 border-t border-gray-200 bg-white">
            <input
              type="text"
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 mr-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Button onClick={() => sendMessageHandler(selectedUser?._id)} className="bg-blue-600 hover:bg-blue-700">
              Send
            </Button>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1">
          <MessageCircleCode className="w-32 h-32 text-gray-400 mb-4" />
          <h1 className="font-medium text-lg">Your messages</h1>
          <span className="text-gray-500">Send a message to start a chat.</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
