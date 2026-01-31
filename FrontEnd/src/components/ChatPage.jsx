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
                { headers: { 'Content-Type': 'application/json' }, withCredentials:true }
            );
            if (res.data.success) {
                dispatch(setMessages([...messages, res.data.newMessage]));
                setTextMessage("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null));
        }
    },[]);

    return (
        <div className='flex h-screen w-full'>
            {/* Sidebar / Users list */}
            <section className='hidden md:flex md:flex-col md:w-1/4 border-r border-gray-300 overflow-y-auto h-full'>
                <h1 className='font-bold mb-4 px-3 text-xl'>{user?.username}</h1>
                <hr className='mb-4 border-gray-300' />
                {suggestedUsers.map((suggestedUser) => {
                    const isOnline = onlineUsers.includes(suggestedUser?._id);
                    return (
                        <div
                            key={suggestedUser?._id}
                            onClick={() => dispatch(setSelectedUser(suggestedUser))}
                            className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'
                        >
                            <Avatar className='w-14 h-14'>
                                <AvatarImage src={suggestedUser?.profilePicture} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <span className='font-medium'>{suggestedUser?.username}</span>
                                <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                                    {isOnline ? 'online' : 'offline'}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </section>

            {/* Messages / Chat */}
            <section className='flex-1 flex flex-col'>
                {selectedUser ? (
                    <>
                        <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
                            <Avatar>
                                <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <span>{selectedUser?.username}</span>
                            </div>
                        </div>

                        <div className='flex flex-col flex-1 h-full'>
                            <Messages selectedUser={selectedUser} />
                            <div className='flex items-center p-4 border-t border-gray-300'>
                                <input
                                    value={textMessage}
                                    onChange={(e) => setTextMessage(e.target.value)}
                                    type="text"
                                    className='flex-1 mr-2 focus-visible:ring-transparent border border-gray-300 p-2 rounded'
                                    placeholder="Type a message..."
                                />
                                <Button onClick={() => sendMessageHandler(selectedUser?._id)}>Send</Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='flex flex-col items-center justify-center mx-auto h-full'>
                        <MessageCircleCode className='w-32 h-32 my-4 text-gray-400' />
                        <h1 className='font-medium'>Your messages</h1>
                        <span className='text-gray-500'>Send a message to start a chat.</span>
                    </div>
                )}
            </section>
        </div>
    )
}

export default ChatPage
