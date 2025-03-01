import connect from "@/dbConfig/dbconfig";
import { NextResponse } from "next/server";
import Blog from "@/models/blogModels";

export async function DELETE(req, context) {
    try {
        await connect(); // Ensures the database connection

        // Await the dynamic parameters before using them
        const resolvedParams = await context.params;
        const { id } = resolvedParams;

        const deletedBlog = await Blog.findByIdAndDelete(id);
        
        if (!deletedBlog) {
            return NextResponse.json({ message: "Blog Not Found" }, { status: 400 });
        }
        console.log("Received ID:", id); // This will now log the correct ID


        return NextResponse.json({ message: "shitansu logs" }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 });
    }
}
