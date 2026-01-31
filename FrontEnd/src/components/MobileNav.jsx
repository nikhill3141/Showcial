import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, MessageCircle, PlusSquare } from "lucide-react";
import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";

function MobileNav() {
  const location = useLocation();
  const { user } = useSelector(store => store.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 md:hidden flex justify-around py-2 shadow-md z-50">
        
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center text-sm ${
            location.pathname === "/" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <Home size={24} />
          <span>Home</span>
        </Link>

        {/* Create Post (CHANGED) */}
        <button
          onClick={() => setOpen(true)}
          className="flex flex-col items-center text-sm text-gray-600"
        >
          <PlusSquare size={24} />
          <span>Create</span>
        </button>

        {/* Messages */}
        <Link
          to="/chat"
          className={`flex flex-col items-center text-sm ${
            location.pathname === "/chat" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          <MessageCircle size={24} />
          <span>Messages</span>
        </Link>

        {/* Profile */}
        <Link
          to={`/profile/${user?._id}`}
          className={`flex flex-col items-center text-sm ${
            location.pathname.startsWith("/profile")
              ? "text-blue-600"
              : "text-gray-600"
          }`}
        >
          <User size={24} />
          <span>Profile</span>
        </Link>
      </div>

      {/* SAME CreatePost dialog used everywhere */}
      <CreatePost open={open} setOpen={setOpen} />
    </>
  );
}

export default MobileNav;
