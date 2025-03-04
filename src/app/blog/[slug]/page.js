
'use client'
import React from 'react'
import RecentBlogs from '@/components/RecentBlogs'
const page = () => {

    const [recentBlogs, setRecentBlogs] = useState([]);

    useEffect(() => {
      async function fetchRecentBlogs() {
        const res = await fetch("/api/blogs/recent"); // Fetch latest 5 blogs
        const data = await res.json();
        setRecentBlogs(data);
      }
      fetchRecentBlogs();
    }, []);
  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 p-6">
    {/* Left: Blog Content */}
    <div className="lg:w-2/3 w-full bg-white p-6 rounded-lg shadow-md">
      <img src={blog.featureImage} alt={blog.title} className="w-full h-96 object-cover rounded-md mb-4" />
      <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
      <p className="text-gray-600 text-sm mt-2">
        By {blog.author} | {new Date(blog.createdAt).toDateString()}
      </p>
      <div className="mt-4 text-gray-700 leading-7" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>

    {/* Right: Recent Blogs Sidebar */}
    <div className="lg:w-1/3 w-full">
      <RecentBlogs />
    </div>
  </div>
  )
}

export default page
