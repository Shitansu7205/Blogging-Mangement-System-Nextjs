'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import { Pencil, Trash2, User } from "lucide-react"; // Importing icons
import { toast } from 'react-toastify';
import Image from 'next/image';
import { PuffLoader } from "react-spinners"; // Import a beautiful loader
import { ClipLoader  } from "react-spinners";
import { PropagateLoader } from "react-spinners";
import { MoonLoader } from "react-spinners";


const Blogs = () => {

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true); // State for loader

    const router = useRouter()


    const fetchedBlogs = async () => {
        fetch('/api/getblogs', { method: 'GET' })  // ✅ Correct fetch syntax
            .then((res) => res.json())            // ✅ Return JSON data
            .then((data) => {
                setBlogs(data.fetchedBlogs)     // ✅ Store received blogs in state
            })
            .catch((err) => {
                console.error("Error fetching blogs:", err)
            })
            .finally(() => {
                setLoading(false); // ✅ Stop loading after fetching data (Fixed syntax)
            });
    }


    useEffect(() => {
        fetchedBlogs()
    }, [])





    const deleteOne = async (id) => {
        try {
            const confirmation = confirm("Are you sure you want to delete this blog?");
            if (confirmation) {
                const response = await fetch(`/api/deleteblog/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    toast.success("Blog Deleted Successfully!");
                    // Remove deleted blog from UI
                    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
                } else {
                    toast.error("Unable to delete the blog.");
                }
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            toast.error("Something went wrong.");
        }
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    };

    return (
        <>
            

            {loading ? (
                
                <div className="flex justify-center items-center min-h-screen">
                <PropagateLoader color="#4caf50" size={15} />
                </div>
            ) : (


                <div className="container mx-auto lg:px-24 lg:py-10 py-5">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">All Blogs</h1>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 px-6 sm:px-6">
                        {blogs.map((fetchedBlogs) => (
                            <div key={fetchedBlogs._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-xl">
                                {/* Feature Image */}
                                <div className="relative w-full h-48">
                                    <Image src={fetchedBlogs.featureImage} alt={fetchedBlogs.title} className="w-full h-full object-cover" width={300} height={200} />
                                </div>

                                {/* Blog Content */}
                                <div className="p-4">
                                    <div className="flex items-center justify-between text-gray-600 text-sm mt-3">
                                        {/* Author Section */}
                                        <div className="flex items-center space-x-2">
                                            <User size={18} className="text-gray-500" />
                                            <span className="font-medium"> {fetchedBlogs.author}</span><br />
                                            {/* <span className="font-medium"> {formatDate(fetchedBlogs.publishedAt)}</span> */}
                                        </div>

                                        {/* Category Section */}
                                        <div className="flex items-center space-x-2">

                                            <span className="bg-gray-200 px-2 py-1 rounded-md text-gray-700 text-xs font-semibold">
                                                {fetchedBlogs.category}
                                            </span>
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-semibold text-gray-800 truncate mb-3 mt-2">{fetchedBlogs.title}</h2>
                                    <p dangerouslySetInnerHTML={{
                                        __html: fetchedBlogs.contents.split(" ").slice(0, 10).join(" ") +
                                            (fetchedBlogs.contents.split(" ").length > 10 ? "..." : "")
                                    }}></p>


                                    <div className="mt-4 flex justify-between items-center">
                                        {/* View More Button */}
                                        <button
                                            onClick={() => router.push(`/blogdetails/${fetchedBlogs._id}`)}
                                            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md shadow-md hover:bg-gray-900 transition-all"
                                        >
                                            View More
                                        </button>

                                        {/* Edit & Delete Buttons */}
                                        <div className="flex space-x-2">
                                            {/* Edit Button */}
                                            <button
                                                onClick={() => router.push(`/modify?id=${fetchedBlogs._id}&title=${fetchedBlogs.title}`)}
                                                className="p-2 text-gray-700 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 hover:scale-105 transition-all"
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => deleteOne(fetchedBlogs._id)}
                                                className="p-2 text-gray-700 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 hover:scale-105 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </>



    )
}

export default Blogs
