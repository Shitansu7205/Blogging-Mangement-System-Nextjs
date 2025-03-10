import connect from '@/dbConfig/dbconfig'
import Blog from '@/models/blogModels'
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // Import cookies() for Next.js App Router


export async function GET(req, res) {
    try {
        await connect()
        
        // ✅ Await cookies() to get the token
        const cookieStore = await cookies();
        const token = cookieStore.get("jwttoken")?.value;

        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // console.log(decoded.mail)
        const fetchedBlogs = await Blog.find({author : decoded.username});
        // console.log(fetchedBlogs)


        return new Response(JSON.stringify({ message: "Fetched blogs successfully", fetchedBlogs }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        // console.log(error)
        return new Response("Unable to fech the data from the DB")
    }
}