import { useEffect, useState } from "react";
import Link from "next/link";

export default function RecentBlogs() {
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
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Blogs</h2>
      <ul className="space-y-3">
        {recentBlogs.map((blog) => (
          <li key={blog._id} className="border-b pb-2">
            <Link href={`/blog/${blog.slug}`} className="flex gap-3 items-center">
              <img src={blog.featureImage} alt={blog.title} className="w-14 h-14 object-cover rounded-md" />
              <span className="text-sm text-gray-700 font-medium">{blog.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
