import connect from "@/dbConfig/dbconfig";
import { NextResponse } from "next/server";
import Blog from "@/models/blogModels";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function DELETE(req, { params }) {
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

        // console.log("Logged-in user:", username);

        // ✅ Find the blog in the database
        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        // console.log("Blog author:", blog.author);

        // ✅ Authorization Check: Only the author can delete their blog
        if (blog.author !== username) {
            return NextResponse.json({ message: "Unauthorized - You can only delete your own blog" }, { status: 403 });
        }

        // ✅ Delete the blog
        await Blog.findByIdAndDelete(id);

        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting blog:", error.message);
        return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
    }
}
