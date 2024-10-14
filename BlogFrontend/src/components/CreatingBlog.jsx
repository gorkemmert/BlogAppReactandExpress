/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import Loading from "./Loading";
import axios from "axios";



const CreatingBlogPost = ({currentFormData, setReflesh}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState({
    title: "",
    desc: "",
    content: "",
    image: "",
    authorName: user.authorName,
    authorDesc: user.authorDesc,
    authorImg: user.authorImg
  });

  const createData = async () => {
    setLoading(true);
    try {
      if(currentFormData?._id){
        const response = await axios.put(`http://localhost:5000/blog/${id}`, blogPost);
        setData(response.data)
        setReflesh(true)
      }else {
        const response = await axios.post(`http://localhost:5000/blog`, blogPost);
        setData(response.data)
        navigate('/')
        alert('Kayıt eklendi')
       
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(currentFormData?._id){
      setBlogPost(
        {
          ...blogPost,
          title: currentFormData.title,
          desc: currentFormData.desc,
          content: currentFormData.content,
          image: currentFormData.image,
        }
      )
    }
  },[currentFormData])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogPost((prevPost) => ({
      ...prevPost,
      [name]: value
    }));
  };


  // const handleImageChange = (e) => {
  //   setBlogPost((prevPost) => ({
  //     ...prevPost,
  //     coverImg: e.target.files[0] // Save image file
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    createData();
  };

  if(loading){
    return <Loading />
  }

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{id==="new" ? "Create a New Blog Post" : "Update Post"}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={blogPost.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="desc"
            value={blogPost.desc}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            name="content"
            value={blogPost.content}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows="6"
            required
          />
        </div>

       
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">Cover Image</label>
          <input
            type="file"
            name="coverImg"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700">Cover Image Url</label>
          <input
            type="text"
            name="image"
            value={blogPost.image}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

    
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatingBlogPost;