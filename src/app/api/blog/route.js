import dbconnect from '../'

export async function POST(req) {
    try {
        await dbConnect();

        const body = await req.json();
        const { title, description, author } = body;

        if (!title || !description || !author) {
            return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
        }




        console.log("Received Blog:", { title, description, author });

        return new Response(JSON.stringify({ message: "Blog received successfully" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error processing request" }), { status: 500 });
    }
}
