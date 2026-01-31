import React from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

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
    </div>
  );
}

export default MainLayout;
