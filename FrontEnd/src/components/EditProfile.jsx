import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";

function EditProfile() {
  const imageRef = useRef();
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    profilePhoto: user.profilePicture,
    username: user.username,
    bio: user.bio,
    gender: user?.gender,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangesHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, profilePhoto: file });
  };

  const usernameChangeHandler = (e) => setInput({ ...input, username: e.target.value });
  const bioChangeHandler = (e) => setInput({ ...input, bio: e.target.value });

  const editProfileHandler = async () => {
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("username", input.username);
    if (input.profilePhoto) formData.append("profilePhoto", input.profilePhoto);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://insta-clone-td88.onrender.com/api/v1/user/profile/edit",
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );

      if (res.data.success) {
        dispatch(
          setAuthUser({
            ...user,
            bio: res.data.user?.bio,
            profilePicture: res.data.user?.profilePicture,
          })
        );
        navigate(`/profile/${user?._id}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Edit Profile</h1>

        {/* Profile photo */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src={user.profilePicture} />
            <AvatarFallback>Nik</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-semibold">{user.username}</h2>
            <p className="text-gray-600 break-words">{user.bio}</p>
            <input className="hidden" type="file" ref={imageRef} onChange={fileChangesHandler} />
            <Button
              className="mt-2 bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
              onClick={() => imageRef?.current.click()}
            >
              Change Photo
            </Button>
          </div>
        </div>

        {/* Username input */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Username</label>
          <Textarea
            value={input.username}
            onChange={usernameChangeHandler}
            className="w-full text-gray-700 outline-none resize-none"
          />
        </div>

        {/* Bio input */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Bio</label>
          <Textarea
            value={input.bio}
            onChange={bioChangeHandler}
            className="w-full text-gray-700 outline-none resize-none"
          />
        </div>

        {/* Gender (optional) */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Gender</label>
          {/* Gender select can be added here */}
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <Button
            onClick={editProfileHandler}
            className="bg-blue-600 hover:bg-blue-700 w-full md:w-48 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="animate-spin h-5 w-5" />}
            {loading ? "Please Wait" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
