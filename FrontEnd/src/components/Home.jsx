
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex min-h-screen">

      {/* Page content */}
      <div className="flex-1 md:ml-[16%] pb-16 md:pb-0">
        <Outlet />
      </div>

    </div>
  )
}

export default Home
