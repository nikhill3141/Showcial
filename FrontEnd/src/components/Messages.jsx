import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetRTM from '@/hooks/useGetRTM'
import useGetAllMessage from '@/hooks/useGetAllMessages'

const Messages = ({ selectedUser }) => {
  useGetRTM()
  useGetAllMessage()
  const { messages } = useSelector(store => store.chat)
  const { user } = useSelector(store => store.auth)

  return (
    <div className="flex flex-col h-full w-full">
      {/* User Info */}
      <div className="flex flex-col items-center py-4 border-b border-gray-200 bg-white">
        <Avatar className="w-20 h-20 md:w-24 md:h-24">
          <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-semibold mt-2 text-lg md:text-xl">{selectedUser?.username}</span>
        <Link to={`/profile/${selectedUser?._id}`}>
          <Button variant="secondary" className="mt-2 h-8 px-3 text-sm md:text-base">
            View Profile
          </Button>
        </Link>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages &&
          messages.map(msg => {
            const isSender = msg.senderId === user?._id
            return (
              <div
                key={msg._id}
                className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-2 md:p-3 rounded-lg max-w-xs md:max-w-md break-words ${
                    isSender ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Messages
