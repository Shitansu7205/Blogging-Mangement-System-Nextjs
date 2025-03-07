import connect from "@/dbConfig/dbconfig";
import User from "@/models/userModels";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        await connect()
        const url = new URL(req.url);
        const getAuthorename = url.searchParams.get('author'); // This will get the 'id' from the query string
        console.log(getAuthorename)



        const findUser = await User.findOne({ name: getAuthorename }); // Corrected: Pass the id directly as an argument        
        const userName = findUser.name
        const userMail = findUser.mail
        const userImage = findUser.profileImage


        return NextResponse.json({ message: "sucessfull", name: userName, mail: userMail, image: userImage })
    } catch (err) {
        return NextResponse.json({ message: "fail" })
    }
}