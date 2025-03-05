'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { User, Calendar, MessageSquare } from "lucide-react";
import { toast } from 'react-toastify';
import Image from 'next/image';

const BlogDetails = () => {
    const { id } = useParams(); // Get blog ID from URL

    const [title, setTitle] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState('https://erp.bookingjini.com/files/Group%2019889%201.png')
    const [date, setDate] = useState("")

    const [otherBlogs, setOtherBlogs] = useState([])

    const fecthedBlogs = async () => {
        try {
            const response = await fetch(`/api/getblogdetails/${id}`, {
                method: 'GET',
            })
            const data = await response.json();
            console.log(data.sendingDeatilBlogs)
            if (response.ok) {
                toast.success("Blog Fetched Sucessufully...")
                setTitle(data.sendingDeatilBlogs.title)
                setName(data.sendingDeatilBlogs.author)
                setDescription(data.sendingDeatilBlogs.contents)
                setImage(data.sendingDeatilBlogs.featureImage)
                setDate(data.sendingDeatilBlogs.publishedAt)


                // calling the other blogs functions
                fetchOtherBlogs()
            }
        } catch (error) {
            toast.error("Unable to fetch the blog")
        }

    }


    const fetchOtherBlogs = async () => {
        try {
            const response = await fetch(`/api/getotherblogs?id=${id}`, {
                method: 'GET',
            })
            const data = await response.json();

            if (response.ok) {
                // alert("Gettings Other Blogs")
                // console.log(data.extractingOtherBlogs)
                setOtherBlogs(data.extractingOtherBlogs)
            }

        } catch (error) {
            alert("Not gettoing other vloskg")
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    };

    useEffect(() => {
        fecthedBlogs()
    }, [id])

    return (
        <>
            {/* <h1>Hello {name}</h1>
            <h1 >title : {title}</h1>
            <p dangerouslySetInnerHTML={{ __html: description }}></p> */}
            {/* <img src={image} alt='net' /> */}



            <div className="max-w-7xl mx-auto px-5 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column - Blog Content */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Blog Image */}
                    <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                        <Image src={image} alt="Blog Title" className="w-full h-full object-cover" width={500} height={300} />
                    </div>

                    {/* Blog Title & Author Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-gray-600 bg-gray-100 p-4 rounded-lg shadow-md border border-gray-200">
                            {/* Left Section - User Info */}
                            <div className="flex items-center space-x-3">
                                <User className="w-5 h-5 text-gray-500" />
                                <p className="text-sm font-semibold"> {name}</p>
                            </div>

                            {/* Middle Section - Date */}
                            <div className="flex items-center space-x-3">
                                <Calendar className="w-5 h-5 text-gray-500" />
                                <p className="text-sm text-gray-500">{formatDate(date)}</p>
                            </div>

                            {/* Right Section - Comments */}
                            <div className="flex items-center space-x-3">
                                <MessageSquare className="w-5 h-5 text-gray-500" />
                                <p className="text-sm font-medium text-gray-600">12 Comments</p>
                            </div>
                        </div>

                        {/* Blog Title */}
                        <h1 className="lg:text-4xl font-extrabold text-gray-900 leading-tight sm:text-sm">{title}</h1>
                    </div>

                    {/* Blog Content */}
                    <div className="prose prose-lg text-gray-800 leading-relaxed">
                        <p dangerouslySetInnerHTML={{ __html: description }} className='text-justify'></p>

                    </div>
                </div>


                {/* Right Column - Sidebar */}
                <aside className="space-y-8 ">
                    {/* Related Blogs Section */}
                    <div className="bg-gradient-to-r from-gray-100 to-white p-6 rounded-2xl shadow-lg border">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Related Blogs</h2>
                        <div className="space-y-3">
                            {
                                otherBlogs.map((blog) => (
                                    <a href={`/blogdetails/${blog._id}`} key={blog._id} className="flex items-center space-x-4 p-1 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:bg-gray-50 transition">
                                        {/* Blog Image (Left) */}
                                        <Image width={50} height={50} src={blog.featureImage} alt={blog.title} className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm" />

                                        {/* Blog Details (Right) */}
                                        <div>
                                            <h3 className="lg:text-lg font-semibold text-gray-900 text-sm">{blog.title.split(" ").slice(0, 3).join(" ")}{blog.title.split(" ").length > 3 ? "..." : ""}</h3>
                                            <div className='flex justify-between items-center'>
                                                <p className="text-sm text-gray-600 lg:mr-6 ">{blog.author.split(" ")[0]}</p>
                                                <p className="text-sm text-gray-600"> {formatDate(blog.publishedAt)}</p>
                                            </div>
                                        </div>
                                    </a>
                                ))
                            }

                        </div>
                    </div>

                    {/* Categories Section */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
                        <div className="flex flex-wrap gap-3">
                            <a href="#" className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition">Technology</a>
                            <a href="#" className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition">Business</a>
                            <a href="#" className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition">Design</a>
                        </div>
                    </div>

                    {/* Social Media Share Section */}
                    <div className="bg-gray-100 p-6 rounded-2xl shadow-lg text-center">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Share This Post</h2>
                        <div className="flex justify-center space-x-5">
                            <a href="#" className="text-blue-600 hover:text-blue-800 text-2xl transition"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="text-blue-400 hover:text-blue-600 text-2xl transition"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-red-600 hover:text-red-800 text-2xl transition"><i className="fab fa-youtube"></i></a>
                            <a href="#" className="text-pink-500 hover:text-pink-700 text-2xl transition"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </aside>
            </div>





        </>
    )
}

export default BlogDetails
