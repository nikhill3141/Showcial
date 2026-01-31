import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import MobileNav from "./MobileNav";

function MainLayout() {
  return (
    <div className="flex min-h-screen">
      
      {/* Left Sidebar (desktop only) */}
      <div className="hidden md:block w-[16%] fixed left-0 top-0 h-full">
        <LeftSidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-[16%] md:mr-[20%] px-2">
        <Outlet />
      </main>

      {/* Right Sidebar (desktop only) */}
      <div className="hidden lg:block w-[20%] fixed right-0 top-0 h-full">
        <RightSidebar />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}

export default MainLayout;
