import LeftSidebar from './LeftSidebar'
import MobileNav from './MobileNav'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex min-h-screen">

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[16%] fixed h-screen">
        <LeftSidebar />
      </div>

      {/* Page content */}
      <div className="flex-1 md:ml-[16%] pb-16 md:pb-0">
        <Outlet />
      </div>

      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <MobileNav />
      </div>

    </div>
  )
}

export default Home
