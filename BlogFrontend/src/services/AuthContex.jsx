/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Uygulama yüklendiğinde token kontrolü
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (username , password) => {
    try {
      
      const response = await axios.post('http://localhost:5000/user/login', {
        name : username,
        password: password,
      });


      // Eğer yanıt başarılıysa
      if (response.status === 200) {
        // Token'ı kaydet ve durumu güncelle
        localStorage.setItem('token', response.data.access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        localStorage.setItem('user', JSON.stringify({
            "authorName": username,
            "authorDesc": "Frontend Developer",
            "authorImg": "https://i.ibb.co/ZWq3sjz/Whats-App-Image-2024-10-12-at-12-18-57.jpg"
        }));
        setToken(response.data.access_token);
        // Blog listeleme sayfasına yönlendir
        navigate('/');
      } else {
        throw new Error('Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed.');
    }
  };

  const logout = () => {
    // Token'ı sil ve kullanıcıyı çıkış yap
    localStorage.removeItem('token');
    localStorage.clear();
    setToken(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook: useAuth
export const useAuth = () => {
  return useContext(AuthContext);
};