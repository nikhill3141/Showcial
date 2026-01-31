import useGetAllPost from "@/hooks/useGetAllPost";
import MobileNav from "./MobileNav";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import RightSidebar from "./RightSidebar";
import Feed from "./Feed";

function Home() {
  useGetAllPost()
  useGetSuggestedUsers()

  return (
    <div className="flex ">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <RightSidebar />
      </div>

      {/* Main content */}
      <div className="flex-grow">
        <Feed/>
        <Outlet/>
      </div>

      {/* Mobile navigation */}
      <MobileNav/>
    </div>
  )
}
export default Home;