import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import MobileNav from "./MobileNav";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-6 lg:px-12 py-6">
        <Outlet />
      </main>

      {/* Right Sidebar */}
      <RightSidebar />

      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <MobileNav />
      </div>

    </div>
  );
}

export default MainLayout;
