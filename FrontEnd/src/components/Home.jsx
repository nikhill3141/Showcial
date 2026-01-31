import React from "react";
import Feed from "./Feed";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";

function Home() {
  useGetAllPost();
  useGetSuggestedUsers();

  return (
    <div className="flex justify-center">
      <Feed />
    </div>
  );
}

export default Home;
