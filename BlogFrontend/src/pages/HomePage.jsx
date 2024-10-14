import { Navbar, Blogs, Footer } from "../components"

const HomePage = () => {
  return (
    <div className="w-full flex flex-col justify-between min-h-screen">
      <Navbar/>
      <Blogs />
      <Footer/>
    </div>
  )
}

export default HomePage