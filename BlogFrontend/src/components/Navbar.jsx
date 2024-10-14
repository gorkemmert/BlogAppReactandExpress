import { useState } from "react"
import { Link } from "react-router-dom";
import { logo, menu, close } from "../assets"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContex";

const Navbar = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleClick = () => setOpen(!open)
    const handleLogout = () => {
        navigate('/login')
        logout()
    }
  return (
    <div className="w-full h-[80px] z-10 bg-[#E1D7C6] fixed drop-shadow-lg relative">
        <div className="flex justify-between items-center w-full h-full md:max-w-[1240px] m-auto">
            <div className="flex items-center">
                <img src={logo} alt="logo" className="xs:ml-10 sm:ml-10 ss:ml-10 md:ml-3 ml-3 opacity-[60%] w-full h-[35px]"/>
            </div>
            <div className="flex items-center">
                <ul className="hidden md:flex">
                    <Link to={"/"}><li>Home</li></Link>
                    <li>About</li>
                    <li>Support</li>
                    <li>Platform</li>
                    <li>Pricing</li>
                </ul>
            </div>
            <div className="hidden md:flex sm:mr-10 md:mr-10 xs:mr-10">
                {token ? (
                    <button onClick={handleLogout} className="border-none bg-transparent text-black mr-4">Logout</button>
                ): (
                    <button onClick={()=>navigate('/login')} className="border-none bg-transparent text-black mr-4">Login</button>
                )}
                
                
                {/* <button className="px-5 py-3">Sign up</button> */}
            </div>
            <div className="md:hidden" onClick={handleClick}>
                <img src={!open ? menu : close} alt="menu" className="w-[28px] h-[28px] object-contain mr-10"/>
            </div>
        </div>
        <ul className={open ? "w-full absolute bg-[#E1D7C6] md:hidden": "hidden"}>
                <li className="flex justify-center">Home</li>
                <li className="flex justify-center">About</li>
                <li className="flex justify-center">Support</li>
                <li className="flex justify-center">Platform</li>
                <li className="flex justify-center">Pricing</li>
                <div className="flex flex-col px-4">

                    {token ? (
                        <button onClick={handleLogout} className="bg-transparent text-black mb-4 py-3 px-8">Logout</button>
                    ): (
                        <button onClick={()=>navigate('/login')} className="bg-transparent text-black mb-4 py-3 px-8">Login</button>
                    )}
                    {/* <button onClick={()=>navigate('/login')} className="bg-transparent text-black mb-4 py-3 px-8">Login</button> */}
                    {/* <button className="px-5 py-3">Sign up</button> */}
                </div>
            </ul>
    </div>
  )
}

export default Navbar