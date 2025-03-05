import connect from "@/dbConfig/dbconfig";
import Blog from "@/models/blogModels";

export async function POST() {
    try {
        // console.log("Starting DB Reset...");

        await connect(); // Connect to MongoDB
        await Blog.deleteMany(); // Delete all blog posts

        // console.log("Database Reset Successfully!");

        return new Response(JSON.stringify({ message: "Database reset successfully!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        // console.error("Error resetting database:", error);
        return new Response(JSON.stringify({ error: "Failed to reset database" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
