import connect from "@/dbConfig/dbconfig"
import Blog from "@/models/blogModels"
import { NextResponse } from "next/server";

export async function PUT(req, content) {

    try {
        await connect();
        const resolvedContext = await content.params;
        const {id} = resolvedContext;
        console.log(id)

        const updateData = await req.json()

        const modifyBlog = await Blog.findByIdAndUpdate(id,updateData , {new:true})

        if(!modifyBlog){
        return NextResponse.json({ message: "Failed...!" }, { status: 400 })

        }



        return NextResponse.json({ message: "Blog Updated Sucessufully...!" }, { status: 200 })

    } catch (error) {
        console.log(err)
        return NextResponse.json({ message: "Updation Failed" }, { status: 400 })

    }
}