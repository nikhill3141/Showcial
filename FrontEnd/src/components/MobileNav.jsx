import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, MessageCircle, PlusSquare } from "lucide-react";
import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";

function MobileNav() {
  const location = useLocation();
  const { user } = useSelector(store => store.auth);
  const [open, setOpen] = useState(false);


  const handleOnClick = () => {
    return setOpen(true);
  };

  const navItems = [
    { name: "Home", icon: <Home size={24} />, path: "/" },
    { name: "Create Post", icon: <PlusSquare size={24} />, onclick: handleOnClick},
    { name: "Messages", icon: <MessageCircle size={24} />, path: "/chat" },
    { name: "Profile", icon: <User size={24} />, path: `/profile/${user?._id}` },
  ];
  

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 md:hidden flex justify-around py-2 shadow-md z-50">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex flex-col items-center justify-center text-sm ${
            location.pathname === item.path ? "text-blue-600" : "text-gray-600"
          }`}
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      ))}
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
}

export default MobileNav;
