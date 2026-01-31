import React from "react";
import Feed from "./Feed";
import RightSidebar from "./RightSidebar";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";

function Home() {
  useGetAllPost();
  useGetSuggestedUsers();

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <Feed />
      </div>
    </div>
  );
}

export default Home;
