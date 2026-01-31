import MobileNav from "./MobileNav";

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
        <Feed />
        <Outlet />
      </div>

      {/* Mobile navigation */}
      <MobileNav />
    </div>
  )
}
