import connect from '@/dbConfig/dbconfig'
import Blog from '@/models/blogModels'
import { cookies } from "next/headers"; // Import cookies() for Next.js App Router
import jwt from 'jsonwebtoken'



export async function POST(req, res) {

    try {
        await connect()
        // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        const data = await req.json()
        // console.log(data.Title_data)
        // console.log(data.BlogContents)
        // console.log(data.BlogCategory)

        // ✅ Await cookies() to get the token
        const cookieStore = await cookies();
        const token = cookieStore.get("jwttoken")?.value;

        // console.log(token)

        // ✅ Decode JWT to get the user
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const username = decoded.username; // Assuming your token contains 'username'
        //  console.log(username)

        const newBlog = new Blog({
            title: data.Title_data,
            contents: data.BlogContents,
            category: data.BlogCategory,
            featureImage: data.FeatureImage,
            publishedAt: new Date(), // ✅ Store current date,
            author: username, // ✅ Save logged-in user's username


        })
        await newBlog.save()


        return new Response("success", { status: 200 })
    }
    catch (err) {
        console.log("modelu catch returned")
        return new Response("error", { status: 400 })
    }

}