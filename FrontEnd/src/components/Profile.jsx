import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);

  const { userProfile, user } = useSelector(store => store.auth);
  const isLoggedIn = user?._id === userProfile?._id;
  const isFollowing = true;
  const [activeTab, setActiveTab] = useState("posts");

  const handleActiveTab = (tab) => setActiveTab(tab);
  const displayedPosts = activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-12 py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-8">
        <Avatar className="w-36 h-36">
          <AvatarImage src={userProfile?.profilePicture} />
          <AvatarFallback>NN</AvatarFallback>
        </Avatar>

        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <h1 className="text-2xl font-semibold">{userProfile?.username}</h1>

            {isLoggedIn ? (
              <Link to={`/edit`}>
                <Button className="bg-gray-500 hover:bg-gray-600 text-white rounded font-semibold">
                  Edit Profile
                </Button>
              </Link>
            ) : isFollowing ? (
              <div className="flex gap-2">
                <Button className="bg-gray-400 hover:bg-gray-500 text-white rounded w-24">Unfollow</Button>
                <Button className="bg-gray-400 hover:bg-gray-500 text-white rounded w-24">Message</Button>
              </div>
            ) : (
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded w-24">Follow</Button>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm font-semibold text-gray-700">
            <p>{userProfile?.posts.length} Posts</p>
            <p>{userProfile?.followers.length} Followers</p>
            <p>{userProfile?.following.length} Following</p>
          </div>

          {/* Bio */}
          <p className="text-gray-600">{userProfile?.bio}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-t border-b py-2 mb-6 overflow-x-auto">
        {["posts", "saved", "reel", "tagged"].map(tab => (
          <span
            key={tab}
            className={`cursor-pointer ${activeTab === tab ? "font-bold border-b-2 border-blue-600" : ""}`}
            onClick={() => handleActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </span>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedPosts?.map(post => (
          <div key={post._id} className="relative group cursor-pointer overflow-hidden rounded-lg">
            <img src={post.image} alt="post" className="w-full h-full object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-1">
                <Heart /> <span>{post.likes.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle /> <span>{post.comments.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
