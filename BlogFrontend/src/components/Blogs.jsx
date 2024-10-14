/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { TfiPencilAlt } from "react-icons/tfi";
import { useAuth } from "../services/AuthContex";
import Loading from "./Loading";
import axios from "axios";


const Blogs = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    
    const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get('http://localhost:5000/blog');
          setData(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };


      useEffect(() => {
        fetchData();
      }, []);
    

    const handleNewBlogClick = () => {
        if (token) {
          navigate('/blog/new');
        } else {
          alert('Yeni blog eklemek için giriş yapmalısınız.');
        }
      };
  
  if(loading){
    return <Loading />
  }

  return (
    <div className="w-full bg-[#f9f9f9] py-[50px]">
        <div className="max-w-[1240px] mx-auto">
            <div className="flex justify-end w-full mb-2 px-4">
                <button onClick={handleNewBlogClick} className="flex justify-between items-center gap-2 px-2 py-2 bg-transparent text-black border-none">
                    <TfiPencilAlt />
                    <p>Yeni Yazı</p>
                </button>
            </div>
            {data.length<1 ? (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-700 mb-4">Data Not Found</h1>
                        
                    </div>
                </div>
            ): (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 ss:grid-cols-1 gap-8 px-4 text-black">
                    {data?.map((blog)=>
                    <Link to={`/blog/${blog._id}`}>
                        <div className="bg-[#f3f1ee] rounded-xl overflow-hidden drop-shadow-md">
                            <img className="h-56 w-full object-cover" src={blog?.image}/>
                            <div className="p-8">
                                <h3 className="font-bold text-2xl my-1">{blog?.title}</h3>
                                <p className="text-gray-600 text-xl">{blog?.desc}</p>
                            </div>
                        </div>
                    </Link> 
                    )}
                </div>
            )}
            
        </div>
    </div>
  )
}

export default Blogs