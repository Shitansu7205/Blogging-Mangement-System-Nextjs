'use client'
import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'

const Blogs = () => {

    const [blogs, setBlogs] = useState([])

    const router = useRouter()

    const fetchedBlogs = async () => {
        fetch('/api/getblogs', { method: 'GET' })  // ✅ Correct fetch syntax
            .then((res) => res.json())  // ✅ Return JSON data
            .then((data) => {
                setBlogs(data.fetchedBlogs)  // ✅ Store received blogs in state
            })
            .catch((err) => {
                console.error("Error fetching blogs:", err)
            })
    }


    useEffect(() => {
        fetchedBlogs()
    }, [])





    const deleteOne = async (id) => {
        alert(`Deleting blog with ID: ${id}`);

        try {
            const response = await fetch(`/api/deleteblog/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Deleted successfully!");
                // Update the UI by removing the deleted blog from the blogs state
                setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));

            } else {
                alert("Failed to delete blog.");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };




    const modifyBlog = async (id, title) => {
        try {
            console.log(id, title)

            const newTitle = prompt("Enter the New Title", title)

            const response = await fetch(`/api/updateblog/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'Application/json'
                },
                body: JSON.stringify({ title: newTitle })
            })
            if(response.ok){
                alert("Blog Modified Sucessufuly ..!")
                setBlogs(prevBlogs =>
                        prevBlogs.map(blog =>
                      blog._id === id ? { ...blog, title: newTitle } : blog
                    ))
            }

        } catch (error) {
            console.log(error)
        }
    }









    return (
        <>
            <h1>All Blogs</h1>
            {
                blogs.map((fetchedBlogs) => (
                    // <div key={fetchedBlogs._id}>{fetchedBlogs.title}</div>  // ✅ Add a unique key
                    <div
                        key={fetchedBlogs._id}
                        className="flex items-center p-3 bg-white shadow-md rounded-lg"
                    >
                        <button
                            // onClick={() => modifyBlog(fetchedBlogs._id, fetchedBlogs.title)}
                            onClick={()=>router.push(`/modify?id=${fetchedBlogs._id}&title=${fetchedBlogs.title}`)}
                            className="mr-3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
                        >
                            Modify
                        </button>
                        <button
                            // onClick={deleteOne(fetchedBlogs._id)}
                            onClick={() => deleteOne(fetchedBlogs._id)}
                            className="mr-3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
                        >
                            Delete
                        </button>
                        <span className="text-lg font-medium text-gray-800">{fetchedBlogs.title}</span>
                    </div>
                ))
            }




        </>
    )
}

export default Blogs
