import connect from "@/dbConfig/dbconfig";
import { NextResponse } from "next/server";
import User from "@/models/userModels";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
export async function POST(req) {
    try {
        await connect();

        const { mail, password } = await req.json();
        console.log("Received data:", { mail });

        // Find user by email
        const findUser = await User.findOne({ mail });

        if (!findUser) {
            console.log("User Not Found");
            return NextResponse.json({ message: "User Not Found" }, { status: 404 });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, findUser.password);
        if (!isMatch) {
            console.log("Invalid Password");
            return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
        }

        const token = jwt.sign(
            {
                id: findUser._id,
                mail: findUser.mail,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )
        console.log(token)

        console.log("Login Successful");
        return NextResponse.json({ message: "Login Successful", token }, { status: 200 } );

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
