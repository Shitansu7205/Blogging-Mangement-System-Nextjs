import connect from "@/dbConfig/dbconfig";
import Blog from "@/models/blogModels";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {

        await connect()
        // console.log("Data Connected ")
        const { id } = await params
        // console.log("Requested Id :", id);


        const fetchingSingleBlogDetails = await Blog.findById(id)
        const authoreName = await fetchingSingleBlogDetails.author
        console.log(authoreName)


        




        return NextResponse.json({ message: "Getting the blogs", status: 200, sendingDeatilBlogs: fetchingSingleBlogDetails })

    } catch (error) {
        return NextResponse.json({ message: "Somethinsg went wrongs!", status: 500 })
    }
}