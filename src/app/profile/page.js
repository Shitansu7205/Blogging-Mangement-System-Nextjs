'use client'
import { useState ,useEffect } from "react";
import { User, Home, Users, BarChart3, Settings } from "lucide-react"; // Icons
import Link from "next/link";
import { toast } from "react-toastify";
import {useRouter} from "next/navigation";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("dashboard"); // State to track active section

    const [email, setEmail] = useState(""); // State to store user email
    const [name, setName] = useState('User name')
    const [image, setImage] = useState("https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png")
    const router = useRouter()
    const [allBlogsLenght,setAllBlogsLenght] = useState(0)
    const [myblogsLenght , setMyblogsLenght] = useState(0)

        const fetchCurrentUser = async () => {

            
            try {
                const response = await fetch("/api/currentuser", {
                    method: "GET",
                    credentials: "include", // Ensures cookies (JWT token) are sent
                });
    
                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }
    
                const data = await response.json();
    
                setName(data.sendingUsername); // Set user email in state
                setImage(data.sendimageurl)
                setEmail(data.extractedEmailFromToken)



                fetchedBlogsLenght()
                fetchedMyBlogsLength()
    
            } catch (err) {
                // toast.error("Permission Denied..")
               
            }
            
        };
    
        useEffect(() => {
            fetchCurrentUser();
        }, []);




        const logOut = async()=>{
            const responce = await fetch('/api/logout',{
                method:'GET'
            })
            if(responce.ok){
                toast.success('Logout Sucessfully...')
                            // Refresh the page
                            window.location.reload(); // This will reload the page
                router.push('/login')
            }
        }


        const fetchedBlogsLenght = async () => {
            fetch('/api/getblogs', { method: 'GET' })  // ✅ Correct fetch syntax
                .then((res) => res.json())            // ✅ Return JSON data
                .then((data) => {
                    setAllBlogsLenght(data.fetchedBlogs.length)     // ✅ Store received blogs in state
                })
                .catch((err) => {
                    console.error("Error fetching blogs:", err)
                })
               
        }
        const fetchedMyBlogsLength = async () => {
            fetch('/api/getmyblogs', { method: 'GET' })  // ✅ Correct fetch syntax
                .then((res) => res.json())            // ✅ Return JSON data
                .then((data) => {
                    setMyblogsLenght(data.fetchedBlogs.length)     // ✅ Store received blogs in state
                })
                .catch((err) => {
                    console.error("Error fetching blogs:", err)
                })
          
        }
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-100 shadow-lg p-5 space-y-6 fixed h-full">
                {/* User Profile */}
                <div className="flex flex-col items-center space-y-3">
                    <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                    <img
                        src={image}
                        alt="User"
                        className="w-20 h-20 rounded-full shadow-md"
                    />
                    <div className="top-10 left-20 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping" />
                    <div className="top-10 left-20 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
                    <p className="text-sm text-gray-500">User</p>
                </div>

                {/* Sidebar Navigation */}
                <nav className="space-y-3">
                <button
                        className={`flex items-center space-x-3 w-full px-4 py-2 rounded ${activeTab === "dashboard" ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`}
                        onClick={() => setActiveTab("dashboard")}
                    >
                        <Home size={20} />
                        <span>Dashboard</span>
                    </button>
                 <button
                        className={`flex items-center space-x-3 w-full px-4 py-2 rounded ${activeTab === "profile" ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`}
                        onClick={() => setActiveTab("profile")}
                    >
                        <User size={20} />
                        <span>Profile</span>
                    </button>
              

                    <button
                        className={`flex items-center space-x-3 w-full px-4 py-2 rounded ${activeTab === "users" ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`}
                        onClick={() => setActiveTab("users")}
                    >
                        <Users size={20} />
                        <span>Users</span>
                    </button>

                    <button
                        className={`flex items-center space-x-3 w-full px-4 py-2 rounded ${activeTab === "reports" ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`}
                        onClick={() => setActiveTab("reports")}
                    >
                        <BarChart3 size={20} />
                        <span>Reports</span>
                    </button>

                    <button
                        className={`flex items-center space-x-3 w-full px-4 py-2 rounded ${activeTab === "settings" ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`}
                        onClick={() => setActiveTab("settings")}
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
               
                </nav>
            </aside>

            {/* Main Content */}
            <main className="ml-64 w-full p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>

                {/* Render different content based on active tab */}
                {activeTab === "dashboard" && (
                    <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 ">
                        <Link href="/myblogs" className="block">
                            <div className="group relative bg-white rounded-lg border border-gray-200 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                                            {myblogsLenght}
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                                            My Blogs
                                        </div>
                                    </div>
                                    {/* Icon or Badge */}
                                    <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow-md transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                                        📄
                                    </div>
                                </div>

                                {/* Hover Overlay Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                            </div>
                        </Link>
                        <Link href="/blogs" className="block">
                            <div className="group relative bg-white rounded-lg border border-gray-200 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                                           20
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                                            Commnets
                                        </div>
                                    </div>
                                    {/* Icon or Badge */}
                                    <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow-md transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                                        📄
                                    </div>
                                </div>

                                {/* Hover Overlay Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                            </div>
                        </Link>
                        <Link href="/blogs" className="block">
                            <div className="group relative bg-white rounded-lg border border-gray-200 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                                            09
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                                            Posts
                                        </div>
                                    </div>
                                    {/* Icon or Badge */}
                                    <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow-md transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                                        📄
                                    </div>
                                </div>

                                {/* Hover Overlay Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                            </div>
                        </Link>
                        <Link href="/blogs" className="block">
                            <div className="group relative bg-white rounded-lg border border-gray-200 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                                            {allBlogsLenght}
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                                            All Blogs
                                        </div>
                                    </div>
                                    {/* Icon or Badge */}
                                    <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow-md transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                                        📄
                                    </div>
                                </div>

                                {/* Hover Overlay Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                            </div>
                        </Link>
                    </div>
                    
                    </>

                )}

                {activeTab === "users" && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Users List</h2>
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-3">Name</th>
                                    <th className="border p-3">Role</th>
                                    <th className="border p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-3">Alice</td>
                                    <td className="border p-3">Editor</td>
                                    <td className="border p-3 text-green-600">Active</td>
                                </tr>
                                <tr>
                                    <td className="border p-3">Bob</td>
                                    <td className="border p-3">User</td>
                                    <td className="border p-3 text-red-600">Inactive</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "reports" && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Reports Overview</h2>
                        <p className="text-gray-600">Analyze sales, revenue, and more.</p>
                    </div>
                )}

                {activeTab === "settings" && (
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Settings</h2>
                        <p className="text-gray-600">Adjust your preferences and configurations.</p>
                    </div>
                )}

                {activeTab === "profile" && (
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto">
            {/* Profile Picture & Status */}
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    <img 
                        src={image}
                        alt="User Profile" 
                        className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-md"
                    />
                    <span className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 border-2 border-white rounded-full"></span>
                </div>
        
                {/* User Info */}
                <div className="text-center">
                    <h3 className="text-2xl font-semibold text-gray-900">{name}</h3>
                    <p className="text-gray-500 text-sm">{email}</p>
                </div>
        
                {/* Profile Details */}
                <div className="w-full space-y-4 text-gray-700">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500 text-sm">Username</span>
                        <p className="font-medium">johndoe_123</p>
                    </div>
        
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500 text-sm">Role</span>
                        <p className="font-medium">User</p>
                    </div>
        
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500 text-sm">Location</span>
                        <p className="font-medium">New York, USA</p>
                    </div>
        
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500 text-sm">Phone</span>
                        <p className="font-medium">+1 (123) 456-7890</p>
                    </div>
        
                    
                </div>
        
                {/* Social Media Icons */}
                <div className="flex space-x-4 mt-4">
                    <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                        <i className="ri-facebook-circle-fill text-2xl"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-400 transition">
                        <i className="ri-twitter-fill text-2xl"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-red-500 transition">
                        <i className="ri-instagram-fill text-2xl"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition">
                        <i className="ri-github-fill text-2xl"></i>
                    </a>
                </div>
        
                {/* Buttons */}
                <div className="flex w-full mt-6 space-x-3">
                    <button className="w-1/2 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all">
                        Edit Profile
                    </button>
                    <button onClick={logOut} className="w-1/2 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition-all">
                        Logout
                    </button>
                </div>
            </div>
        </div>
        
         
             
                )}

            </main>
        </div>
    );
}
