import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetRTM from '@/hooks/useGetRTM'
import useGetAllMessage from '@/hooks/useGetAllMessages'

const Messages = ({ selectedUser }) => {
    useGetRTM(); 
    useGetAllMessage();
    const {messages} = useSelector(store=>store.chat);
    const {user} = useSelector(store=>store.auth);

    return (
        <div className='flex flex-col h-full overflow-y-auto p-4 gap-4'>
            {/* Selected User Info */}
            <div className='flex flex-col items-center justify-center'>
                <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className='font-semibold mt-2'>{selectedUser?.username}</span>
                <Link to={`/profile/${selectedUser?._id}`}>
                    <Button className="h-8 my-2 w-32" variant="secondary">View profile</Button>
                </Link>
            </div>

            {/* Chat messages */}
            <div className='flex flex-col gap-3 flex-1 overflow-y-auto'>
                {Array.isArray(messages) && messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`p-2 rounded-lg max-w-[70%] break-words ${msg.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                            {msg.message}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Messages
