import { Navbar, Footer, BlogContent } from "../components"

const BlogDetail = () => {
  return (
    <div className="w-full flex flex-col justify-between min-h-screen">
      <Navbar/>
      <BlogContent  />
      <Footer/>
    </div>
  )
}

export default BlogDetail