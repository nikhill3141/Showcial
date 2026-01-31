import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart, MessageCircle, MoreVertical, Bookmark, BookmarkCheck, Send } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import CommentDilog from "./CommentDilog";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Badge } from "./ui/badge";

function Post({ post }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  const { posts } = useSelector(store => store.post);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [postLikeCount, setPostLikeCount] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(`https://insta-clone-td88.onrender.com/api/v1/post/${post._id}/${action}`, { withCredentials: true });
      if (res.data.success) {
        setPostLikeCount(liked ? postLikeCount - 1 : postLikeCount + 1);
        setLiked(!liked);
        const updatedPosts = posts.map(p => p._id === post._id
          ? { ...p, likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id] }
          : p
        );
        dispatch(setPosts(updatedPosts));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error liking post");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Avatar><AvatarImage src={post.author.profilePicture} /><AvatarFallback>NN</AvatarFallback></Avatar>
          <h2 className="font-semibold">{post.author.username}</h2>
          {user?._id === post?.author._id && <Badge variant="secondary">Author</Badge>}
        </div>
        <Dialog>
          <DialogTrigger asChild><MoreVertical className="cursor-pointer" /></DialogTrigger>
          <DialogContent className="flex flex-col items-start">
            <Button variant="ghost" className="text-red-600">Delete</Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Post Image */}
      <img src={post.image} alt="post" className="w-full aspect-square object-cover rounded-lg mb-2" />

      {/* Actions */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-4">
          {liked ? <FaHeart className="text-red-600 cursor-pointer" onClick={handleLike}/> : <Heart className="cursor-pointer" onClick={handleLike}/>}
          <MessageCircle className="cursor-pointer" onClick={()=>{dispatch(setSelectedPost(post)); setOpen(true)}}/>
          <Send className="cursor-pointer"/>
        </div>
        {bookmarked ? <BookmarkCheck className="cursor-pointer" /> : <Bookmark className="cursor-pointer"/>}
      </div>

      <p className="font-medium">{postLikeCount} Likes</p>
      <p><span className="font-semibold">{post.author.username}</span> {post.caption}</p>

      <CommentDilog open={open} setOpen={setOpen} post={post}/>

      <div className="flex gap-2 mt-2">
        <input type="text" value={text} onChange={e=>setText(e.target.value)} placeholder="Add a comment..." className="flex-1 p-2 border rounded"/>
        {text && <Button size="sm" onClick={()=>{}}>Post</Button>}
      </div>
    </div>
  );
}

export default Post;
