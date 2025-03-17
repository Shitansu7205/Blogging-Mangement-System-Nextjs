
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // Import cookies() for Next.js App Router
import connect from '@/dbConfig/dbconfig'
import User from "@/models/userModels";

export async function GET(request) {

    try {
        await connect()
        // ✅ Await cookies() to get the token
        const cookieStore = await cookies();
        const token = cookieStore.get("jwttoken")?.value;


        if (!token) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 });
        }

        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const helperMail = decoded.mail
        // console.log(helperMail)

        const user = await User.findOne({mail:helperMail})
        if (!user) {
            console.log("❌ User NOT Found in the DB for email:");
        } 
        const extractImageUrl  = user.profileImage
        const extractedUsername = user.name
        const extractedPhone = user.phone
        // console.log(extractImageUrl)
        // console.log(extractedUsername)




        return NextResponse.json({ extractedEmailFromToken: decoded.mail , sendimageurl: extractImageUrl , sendingUsername: extractedUsername,sendingPhone :extractedPhone},{ status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }
}
