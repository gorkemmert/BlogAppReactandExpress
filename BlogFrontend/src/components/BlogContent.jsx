/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { useParams, useNavigate} from "react-router-dom"
import CreatingBlogPost from "./CreatingBlog";
import { TfiPencilAlt, TfiEraser } from "react-icons/tfi";
import {  useState, useEffect } from "react";
import { useAuth } from "../services/AuthContex";
import axios from "axios";
import Loading from "./Loading";

const BlogContent = () => {
    const navigate = useNavigate(); 
    const { token } = useAuth();
    const user = JSON.parse(localStorage.getItem('user'));
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reflesh , setReflesh] = useState(false)
    const [isUpdateClick, setIsUpdateClick] = useState(false)
    const  [openCommentForm, setopenCommentForm] = useState(false)
    const [comments, setComments] = useState([]); 
    const [newComment, setNewComment] = useState("");
    const {id} = useParams();

    const fetchById = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/blog/${id}`);
        setData(response.data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };


    const deleteById = async () => {
      setLoading(true);
      try {
        const response = await axios.delete(`http://localhost:5000/blog/${id}`);
        navigate('/')
        alert('kayıt silindi')
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
     // yorumları blog id ye göre getirme
      try {
        const response = await axios.get(`http://localhost:5000/comment/byBlogId/${id}`);
        setComments(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const handleCommentDelete = async (commentId, comment) => {
      if(user.authorName !== comment.authorName){
        alert("Yorumu Size ait değil")
      }else {
        try {
          await axios.delete(`http://localhost:5000/comment/${commentId}`);
          fetchComments()
          setComments(comments.filter((comment) => comment.id !== commentId));
        } catch (err) {
          console.error(err);
        }
      }
      
    };

    const handleCommentSubmit = async (e) => {
      e.preventDefault();
      // Yeni yorum ekleme
      try {
        const response = await axios.post(`http://localhost:5000/comment`, {
          blogId: id,
          content: newComment,
          authorName: user.authorName,
        });
        // setComments([...comments, response.data]); // Yeni yorumu ekler
        fetchComments();
        setNewComment(""); 
      } catch (err) {
        console.error(err);
      }
    };
  

    useEffect(() => {
      if(id !== 'new'){
        fetchById();
        fetchComments();
      }
    }, [id]);

    useEffect(() => {
      if (reflesh && id !== "new") {
      fetchById();
      setReflesh(false)
      setIsUpdateClick(false)
      }
    }, [reflesh]);

    const deleteClicked = () => {
      if(token){
        if(user.authorName !== data.authorName){
          alert('Silmek için yetkiniz yok');
        }else {
          deleteById();
        }
      }else{
        alert('Blog silmek için lütfen giriş yapınız');
      }
      
    }

    const updateClicked = () => {
      if(token){
        if(user.authorName !== data.authorName){
          alert('Güncelleme için yetkiniz yok');
        }else {
          setIsUpdateClick(true)
        }
       
      }else {
        alert('Blog güncellemek için lütfen giriş yapınız');
      }
      
    }

    const addCommentClick = () => {
      if(token){
        setopenCommentForm(true)
      }else{
        alert('Yorum eklemek için lütfen giriş yapınız');
      }
      
    }

  
    
    if(loading){
      return <Loading />
    }
  
    return (
      <div className="w-full pb-10 bg-[#f9f9f9] ">
          <div className="max-w-[1240px] mx-auto ">
              {id === "new" && (
                <CreatingBlogPost setReflesh={setReflesh}/>
              )}
              {id !== "new" && (  
                <div className="grid lg:grid-cols-3 sm:grid-cols-3 ss:grid-cols-1 xs:grid-cols-1 xxs:grid-cols-1 gap-8 px-4 sm:pt-20 md:mt-0 ss:pt-20 text-black">
                  <div className="col-span-2">
                      <img className="h-56 w-full object-cover" src={data.image}/>
                      <div className="flex items-center my-1 pt-5">
                        <h1 className="font-bold text-2xl">{data.title}</h1>
                        <button onClick={updateClicked} className="flex justify-between items-center gap-2 px-2 py-2 bg-transparent text-black border-none">
                          <TfiPencilAlt />
                          <p>Güncelle</p>
                        </button>
                        <button onClick={deleteClicked} className="flex justify-between items-center gap-2 px-2 py-2 bg-transparent text-red-500 border-none">
                          <TfiEraser />
                          <p>Sil</p>
                        </button>
                      </div>
                      <div className="pt-5">{data.content}</div>
                      {isUpdateClick && (
                        <CreatingBlogPost currentFormData={data} setReflesh={setReflesh}/>
                      )}
                      <div className="mt-8">
                        <div className="flex items-center my-1 pt-5">
                          <h1 className="text-xl font-bold">Yorumlar</h1>
                          <button onClick={addCommentClick} className="flex justify-between items-center gap-2 px-2 py-2 bg-transparent text-black border-none">
                            <TfiPencilAlt />
                            
                          </button>
                        </div>
                        {openCommentForm && (
                          <form onSubmit={handleCommentSubmit} className="mt-6">
                            <textarea
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="w-full p-3 border rounded-lg"
                              rows="4"
                              placeholder="Yorumunuzu yazın"
                              required
                            />
                            <button
                              type="submit"
                              className="mt-2 bg-transparent text-blue-500  py-2 px-4 rounded-lg border-none"
                            >
                              Gönder
                            </button>
                            <button
                              className="mt-2 bg-transparent text-red-400 py-2 px-4 rounded-lg border-none"
                              onClick={()=>{
                                setopenCommentForm(false);
                                setNewComment(""); 
                              }}
                            >
                              iptal
                            </button>
                          </form>
                        )}
                        <div className="space-y-4">
                          {comments.map((comment) => (
                            <div
                              key={comment._id}
                              className="bg-white p-4 rounded-lg shadow relative"
                            >
                              <p className="font-bold">@{comment.authorName}</p>
                              <p className="font-bold text-xs">{comment.createdAt.split('T')[0]}</p>
                              <p>{comment.content}</p>
                              <button onClick={() => handleCommentDelete(comment._id, comment)} className="absolute top-2 right-2 bg-transparent text-red-500 border-none">
                                <TfiEraser />
                                
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                  </div>

                  <div className="w-full max-h-[225px] bg-white rounded-xl overflow-hidden drop-shadow-md py-5">
                      <div>
                          <img className="p-2 w-32 h-32 rounded-full mx-auto" src={data.authorImg}/>
                          <h1 className="text-center text-gray-900 pt-3 font-bold text-2xl">{data.authorName}</h1>
                          <p className="font-medium text-gray-900 text-center">{data.authorDesc}</p>
                      </div>
                  </div>
                </div>
              )}
          </div>
      </div>
    )
}

export default BlogContent