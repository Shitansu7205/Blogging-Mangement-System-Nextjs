import connect from "@/dbConfig/dbconfig";
import Blog from "@/models/blogModels";
import { NextResponse } from "next/server";

export async function GET(req) {

    try {
        await connect();
        console.log("Connected to DB ✅");

          // Extract the blog ID from query parameters
          const { searchParams } = new URL(req.url);
          const currentBlogId = searchParams.get("id");
          
          // Fetch other blogs excluding the current one
        const otherBlogs = await Blog.find({ _id: { $ne: currentBlogId } }).limit(5);
        

    
        console.log(otherBlogs)



        return NextResponse.json({ message: "Getting other blogs", status: 200 , extractingOtherBlogs:otherBlogs })
    } catch (error) {
        return NextResponse.json({ message: "Unable to fetch the Other Blogs", status: 400 }, error)
    }

}