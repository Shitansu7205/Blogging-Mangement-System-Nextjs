'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, ChevronDown, Menu, X, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpenmob, setDropdownOpenmob] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    // const user = { name: 'John Doe', image: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' }; // Dummy user data
    const [name, setName] = useState('')
    const [image, setImage] = useState('https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png')

    const router = useRouter()



    const fetchCurrentUser = async () => {
        try {
            const response = await fetch("/api/currentuser", {
                method: "GET",
                credentials: "include",      // Ensures cookies (JWT token) are sent
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }

            const data = await response.json();

            setName(data.sendingUsername); // Set user email in state
            setImage(data.sendimageurl)
            // setEmail(data.extractedEmailFromToken)



            fetchedBlogsLenght()
            fetchedMyBlogsLength()

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
            router.push('/login')
        }
    }











    return (
        <nav className="flex items-center justify-between px-9 lg:px-32 py-4 bg-blue-700  shadow-lg w-full text-white  sticky top-0 z-20">
            {/* Left - Logo */}
            <div className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="w-8 h-8 text-white" />
                <span className="hidden md:block">Blogify</span> {/* Visible on larger screens */}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>

            {/* Center - Nav Menu (Desktop) */}
            <ul className="md:flex hidden gap-6 text-lg font-medium">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/services">Services</Link></li>

                {/* Blogs Dropdown */}
                <li className="relative group">
                    <button className="flex items-center gap-1 hover:text-gray-300">
                        Blogs <span className="text-sm">▼</span>
                    </button>
                    <ul className="absolute hidden group-hover:flex flex-col bg-white text-gray-800 shadow-md rounded-lg w-40 py-2 top-12">
                        <li>
                            <Link href="/blogs" className="block px-4 py-2 hover:bg-gray-200 text-sm">All Blogs</Link>
                        </li>
                        <li>
                            <Link href="/blogs/myblogs" className="block px-4 py-2 hover:bg-gray-200 text-sm">My Blogs</Link>
                        </li>
                        <li>
                            <Link href="/blogs/add" className="block px-4 py-2 hover:bg-gray-200 text-sm">Add New Blog</Link>
                        </li>
                    </ul>
                </li>
                <li><Link href="/contact">Contact</Link></li>

            </ul>


            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white text-gray-800 shadow-md md:hidden flex flex-col items-center py-4 gap-2">
                    <Link href="/" className="block px-4 py-2 hover:bg-gray-200 w-full text-center">Home</Link>
                    <Link href="/about" className="block px-4 py-2 hover:bg-gray-200 w-full text-center">About</Link>
                    <Link href="/services" className="block px-4 py-2 hover:bg-gray-200 w-full text-center">Services</Link>
                    <Link href="/contact" className="block px-4 py-2 hover:bg-gray-200 w-full text-center">Contact</Link>

                    {/* Blogs Dropdown for Mobile */}
                    <div className="w-full text-center">
                        <button
                            className="block w-full px-4 py-2 hover:bg-gray-200 text-gray-800"
                            onClick={() => setDropdownOpenmob(!dropdownOpenmob)}
                        >
                            Blogs <span className="text-sm">{dropdownOpenmob ? "▲" : "▼"}</span>
                        </button>

                        {dropdownOpenmob && (
                            <ul className="w-full bg-gray-100 text-gray-800 shadow-md flex flex-col py-2">
                                <li>
                                    <Link href="/blogs" className="block px-4 py-2 hover:bg-gray-300 text-sm">All Blogs</Link>
                                </li>
                                <li>
                                    <Link href="/myblogs" className="block px-4 py-2 hover:bg-gray-300 text-sm">My Blogs</Link>
                                </li>
                                <li>
                                    <Link href="/blogpost" className="block px-4 py-2 hover:bg-gray-300 text-sm">Add New Blog</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            )}


            {/* Right - Profile & Notifications */}
            <div className="flex items-center gap-4 relative">
                {/* Notification Icon */}
                <Bell className="w-6 h-6 cursor-pointer hover:text-yellow-400 transition" />

                {/* Profile Image */}
                <div className="relative flex items-center gap-2 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <Image src={image} alt="Profile" width={40} height={40} className="rounded-full border-2 border-white hover:scale-105 transition" />
                    <span className="hidden md:block font-medium">{name}</span>
                    <ChevronDown className="w-5 h-5" />
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="absolute right-0 mt-52 w-48 bg-white text-gray-800 shadow-lg rounded-lg py-2 z-10">
                        <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                        <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">Sign In</Link>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={logOut}>Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
}