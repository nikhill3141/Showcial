import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HeartIcon, Home, MessageCircle, PlusCircle, TrendingUp, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import CreatePost from "./CreatePost";
import { setAuthUser } from "@/redux/authSlice";

function LeftSidebar() {
  const { likeNotification } = useSelector(store => store.realTimeNotification);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const barItems = [
    { icon: <Home />, text: "Home" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <HeartIcon />, text: "Notifications" },
    { icon: <PlusCircle />, text: "Create" },
    {
      icon: (
        <Avatar className="w-10 h-10">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];

  const handleLogout = async () => {
    try {
      const res = await axios.get('https://insta-clone-td88.onrender.com/api/v1/user/logout');
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate('/login');
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSidebar = (text) => {
    switch (text) {
      case "Logout": return handleLogout();
      case "Create": return setOpen(true);
      case "Profile": return navigate(`/profile/${user?._id}`);
      case "Home": return navigate('/');
      case "Messages": return navigate('/chat');
      default: return;
    }
  };

  return (
    <aside className="hidden md:flex flex-col w-64 px-4 py-6 border-r bg-white fixed h-full">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-2">
        <span className="text-2xl font-bold text-blue-600">Showcial</span>
      </div>

      {/* Sidebar Items */}
      <nav className="flex-1">
        {barItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSidebar(item.text)}
            className="flex items-center gap-3 px-3 py-2 my-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            {item.icon}
            <span className="font-medium">{item.text}</span>

            {/* Notifications */}
            {item.text === "Notifications" && likeNotification.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="icon" className="absolute top-2 right-2 rounded-full bg-red-600 text-white">
                    {likeNotification.length}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  {likeNotification.length === 0 ? (
                    <p>No new notifications</p>
                  ) : likeNotification.map(n => (
                    <div key={n.userId} className="flex items-center gap-2 my-2">
                      <Avatar>
                        <AvatarImage src={n.userDetails?.profilePicture} />
                        <AvatarFallback>NN</AvatarFallback>
                      </Avatar>
                      <p className="text-sm">
                        <span className="font-bold">{n.userDetails?.username}</span> liked your post
                      </p>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            )}
          </div>
        ))}
      </nav>

      {/* Create Post Modal */}
      <CreatePost open={open} setOpen={setOpen} />
    </aside>
  );
}

export default LeftSidebar;
