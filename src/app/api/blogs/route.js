import connect from '@/dbConfig/dbconfig'
import Blog from '@/models/blogModels'



export async function POST(req,res) {
    try {
        await connect()
        console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        const data = await req.json()
        console.log(data.Title_data)

        const newBlog = new Blog({
            title : data.Title_data
        })
        await newBlog.save()


        return new Response("success" , {status :200})
    }
    catch (err) {
        console.log("modelu catch returned")
        return new Response("error" , {status:400})
    }

}