import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload directly to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(`data:image/jpeg;base64,${buffer.toString("base64")}`, {
            folder: "Featured_images",
        });

        return NextResponse.json({ imageUrl: uploadResponse.secure_url }, { status: 200 });

    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
    }
}
