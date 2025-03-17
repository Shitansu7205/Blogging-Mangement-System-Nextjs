'use client'
import { useState, useEffect } from "react";
import { User, Home, Users, BarChart3, Settings } from "lucide-react"; // Icons
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Chart from "@/components/Chart"
export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("dashboard"); // State to track active section

    const [email, setEmail] = useState(""); // State to store user email
    const [name, setName] = useState('User name')
    const [image, setImage] = useState("https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png")
    const router = useRouter()
    const [allBlogsLenght, setAllBlogsLenght] = useState(0)
    const [myblogsLenght, setMyblogsLenght] = useState(0)
    const [number, setNumber] = useState("")
    const [allusers, setAllusers] = useState([])

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
            setNumber(data.sendingPhone)


            fetchedBlogsLenght()
            fetchedMyBlogsLength()
            fetchAllUser()

        } catch (err) {
            // toast.error("Permission Denied..")

        }

    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);




    const logOut = async () => {
        const responce = await fetch('/api/logout', {
            method: 'GET'
        })
        if (responce.ok) {
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




    const fetchAllUser = async () => {
        const responce = await fetch('/api/userlist', { method: 'GET' })
        const data = await responce.json()
        if (responce.ok) {
            // alert("Users Fecthed sucessfully....")
            // console.log(data.extractingAllUsers)
            setAllusers(data.extractingAllUsers)
        }

    }






    return (
        <>
            <div className="hidden md:block">
                <div className="flex min-h-screen bg-gray-100 ">
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
                                    <Link href="/blogpost" className="block">
                                        <div className="group relative bg-white rounded-lg border border-gray-200 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                                                        09
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                                                        Add Blogs
                                                    </div>
                                                </div>
                                                {/* Icon or Badge */}
                                                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow-md transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                                                    📝
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
                                <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-blue-800 to-blue-300 text-white">
                                            <th className="border p-4 text-left font-semibold">Profile</th>
                                            <th className="border p-4 text-left font-semibold">User Name</th>
                                            <th className="border p-4 text-left font-semibold">Contact No</th>
                                            <th className="border p-4 text-left font-semibold">Chat With Me</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {allusers.map((user, index) => (
                                            <tr
                                                key={user.id || index}
                                                className="bg-white hover:bg-gray-100 transition duration-300"
                                            >
                                                <td className="border p-4 flex items-center gap-4">
                                                    <img
                                                        src={user.profileImage}
                                                        alt="Profile"
                                                        className="h-16 w-16 rounded-full shadow-md border-2 border-gray-300 transition transform hover:scale-105"
                                                    />
                                                </td>
                                                <td className="border p-4 font-medium text-gray-700">{user.name}</td>
                                                <td className="border p-4 text-gray-600">{user.phone || "876XXXX123"}</td>
                                                <td className="border p-4 text-center">
                                                    <button
                                                        className="flex items-center gap-x-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition transform hover:scale-105 text-sm"
                                                        onClick={() => router.push(`/authorprofile?author=${user.name}`)}
                                                    >
                                                        <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4" />
                                                        Chat with Me
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        )}

                        {activeTab === "reports" && (
                        <Chart />
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
                                        {/* <p className="text-gray-500 text-sm">{email}</p> */}
                                    </div>

                                    {/* Profile Details */}
                                    <div className="w-full space-y-4 text-gray-700">
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-gray-500 text-sm">Username</span>
                                            <p className="font-medium">{name}</p>
                                        </div>

                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-gray-500 text-sm">Role</span>
                                            <p className="font-medium">User</p>
                                        </div>

                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-gray-500 text-sm">Location</span>
                                            <p className="font-medium">Bhubaneswar , India </p>
                                        </div>

                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-gray-500 text-sm">Phone</span>
                                            <p className="font-medium">{number}</p>
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
            </div>












































































            <div className="block md:hidden">
                <div className="flex min-h-screen bg-gray-100 ">
                    {/* Sidebar (Hidden on Mobile, Visible on Desktop) */}
                    <aside className="hidden md:block w-64 bg-blue-100 shadow-lg p-5 space-y-6 fixed h-full">
                        {/* User Profile */}
                        <div className="flex flex-col items-center space-y-3">
                            <div className="relative">
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
                            <button className={`flex items-center space-x-3 w-full px-4 py-2 rounded ${activeTab === "dashboard" ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`} onClick={() => setActiveTab("dashboard")}>
                                <Home size={20} />
                                <span>Dashboard</span>
                            </button>
                            <button className={`flex items-center space-x-3 w-full px-4 py-2 rounded ${activeTab === "profile" ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`} onClick={() => setActiveTab("profile")}>
                                <User size={20} />
                                <span>Profile</span>
                            </button>
                            <button className={`flex items-center space-x-3 w-full px-4 py-2 rounded ${activeTab === "users" ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`} onClick={() => setActiveTab("users")}>
                                <Users size={20} />
                                <span>Users</span>
                            </button>
                            <button className={`flex items-center space-x-3 w-full px-4 py-2 rounded ${activeTab === "reports" ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`} onClick={() => setActiveTab("reports")}>
                                <BarChart3 size={20} />
                                <span>Reports</span>
                            </button>

                        </nav>
                    </aside>

                    {/* Mobile View - Minimal Sidebar */}
                    <aside className="md:hidden fixed bottom-0 w-full bg-white shadow-lg p-3 flex justify-around items-center">

                        <button onClick={() => setActiveTab("dashboard")} className="text-gray-700">
                            🏠
                            <span className="text-xs block">Dashboard</span>
                        </button>
                        <button onClick={() => setActiveTab("profile")} className="flex flex-col items-center text-gray-700">
                            👤
                            {/* <img src={image} alt="User" className="w-10 h-10 rounded-full" /> */}
                            {/* <span className="text-xs">{name}</span> */}
                            <span className="text-xs block">Profile</span>
                        </button>
                        <Link href='/blogs'>
                            <button className="text-gray-700">
                                📄 <span className="text-xs block">All Blogs</span>
                            </button>
                        </Link>
                        <Link href='/blogpost'>
                            <button className="text-gray-700">
                                📝 <span className="text-xs block">Add Blogs</span>
                            </button>
                        </Link>
                        <button onClick={() => setActiveTab("users")} className="text-gray-700">
                            👥 <span className="text-xs block">Users</span>
                        </button>

                    </aside>

                    {/* Main Content (Adjust for Mobile & Desktop) */}
                    <main className="ml-0 md:ml-64 w-full p-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>

                        {activeTab === "dashboard" && (
                            <>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
                                            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow-md transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                                                📄
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                                    </div>
                                </Link>
                                <Link href="/blogpost" className="block">
                                    <div className="group relative bg-white rounded-lg border border-gray-200 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                                                    {allBlogsLenght}
                                                </div>
                                                <div className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                                                    Add Blogs
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


                            </div>
                            <Chart/>
                            </>
                        )}

                        {/* Render Profile in a Compact View on Mobile */}
                        {activeTab === "profile" && (
                            <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-lg">
                                <div className="flex flex-col items-center space-y-4">
                                    <img src={image} alt="User Profile" className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-md" />
                                    <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
                                    {/* <p className="text-gray-500">{email}</p> */}
                                    <p className="text-gray-500">{number}</p>
                                    <p className="text-gray-500">Bhubaneswar, India</p>
                                </div>
                                <div className="flex w-full mt-6 space-x-3">
                                    <button className="w-1/2 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all">
                                        Edit Profile
                                    </button>
                                    <button onClick={logOut} className="w-1/2 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition-all">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Render Profile in a Compact View on Mobile */}
                        {activeTab === "users" && (
                            <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800">
                                        <th className="border p-4 text-left font-semibold">Profile</th>
                                        <th className="border p-4 text-left font-semibold"> Name</th>
                                        <th className="border p-4 text-center font-semibold">Profile</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {allusers.map((user, index) => (
                                        <tr
                                            key={user.id || index}
                                            className="bg-white hover:bg-gray-100 transition duration-300"
                                        >
                                            <td className="border p-3 flex items-center gap-4">
                                                <img
                                                    src={user.profileImage}
                                                    alt="Profile"
                                                    className="h-10 w-h-10 rounded-full shadow-md border-2 border-gray-300 transition transform hover:scale-105"
                                                />
                                            </td>
                                            <td className="border p-3 font-medium text-gray-700 text-xs ">    {user.name.split(" ")[0].charAt(0).toUpperCase() + user.name.split(" ")[0].slice(1)}
                                                {user.name.split(" ")[1] ? " " + user.name.split(" ")[1].charAt(0).toUpperCase() : ""}</td>
                                            <td className="border p-3 text-center">
                                                <button
                                                    className="flex items-center gap-x-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition transform hover:scale-105 text-sm"
                                                    onClick={() => router.push(`/authorprofile?author=${user.name}`)}
                                                >
                                                    <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4" />
                                                    Chat
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}
