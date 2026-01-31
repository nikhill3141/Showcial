import React from "react";
import Posts from "./Posts";

function Feed() {
  return (
    <div className="flex-1 flex flex-col items-center w-full md:w-3/4 lg:w-2/3 mx-auto my-8 px-2 md:px-4">
      <Posts />
    </div>
  );
}

export default Feed;
