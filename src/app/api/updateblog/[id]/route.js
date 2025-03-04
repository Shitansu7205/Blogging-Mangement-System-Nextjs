import connect from "@/dbConfig/dbconfig";
import Blog from "@/models/blogModels";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PUT(req, { params }) {
    try {
        await connect(); // ✅ Ensure DB connection

        const { id } = params; // ✅ Get blog ID from dynamic route
        if (!id) {
            return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
        }

        // ✅ Get JWT token from cookies
        const cookieStore = cookies();
        const token = cookieStore.get("jwttoken")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized - No token" }, { status: 401 });
        }

        // ✅ Decode JWT to get logged-in user
        let username;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            username = decoded.username; // Extract username from token
        } catch (error) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 403 });
        }

        console.log("Logged-in user:", username);

        // ✅ Find the blog in the database
        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        console.log("Blog author:", blog.author);

        // ✅ Authorization Check: Only the author can modify their blog
        if (blog.author !== username) {
            return NextResponse.json({ message: "Unauthorized - You can only modify your own blog" }, { status: 403 });
        }

        // ✅ Get the update data
        const updateData = await req.json();

        // ✅ Update the blog
        const modifiedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

        if (!modifiedBlog) {
            return NextResponse.json({ message: "Failed to update blog" }, { status: 400 });
        }

        return NextResponse.json({ message: "Blog Updated Successfully!", blog: modifiedBlog }, { status: 200 });

    } catch (error) {
        console.error("Error updating blog:", error.message);
        return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
    }
}
