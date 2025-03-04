import connect from '@/dbConfig/dbconfig'
import Blog from '@/models/blogModels'

export async function GET(req, res) {
    try {
        await connect()
        console.log("get blogs")
        const fetchedBlogs = await Blog.find();



        return new Response(JSON.stringify({ message: "Fetched blogs successfully", fetchedBlogs }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.log(error)
        return new Response("Unable to fech the data from the DB")
    }
}