import connect from "@/dbConfig/dbconfig";
import { NextResponse } from "next/server";
import User from "@/models/userModels";
import { v4 as uuidv4 } from "uuid"; // Import the uuid library
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
export async function POST(req,res) {
    try {
        // Connect to the database
        await connect();

        // Parse the incoming JSON data
        const data = await req.json();
        // console.log("Received data:", data);

        // Check if a user with the same email already exists
        const findUser = await User.findOne({ mail: data.mail });

        // Generate a unique tenant ID using uuid
        const tenantId = uuidv4();


        if (findUser) {
            // console.log("user Exits....")
            return NextResponse.json({ message: "User Already Exists" }, { status: 400 });
        } else {


            // hash the password/
            const hashPassword = await bcrypt.hash(data.password, 10)


            // Create a new user
            const createUser = new User({
                name:data.name,
                mail: data.mail,
                password: hashPassword,
                phone :data.phone,
                tenantId: tenantId,
                profileImage:data.profileImage // Save Cloudinary image URL
            });
            await createUser.save();




            // Send AN confirmation email to the registrated client
            // Create reusable transporter object using SMTP
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL, // Your email
                    pass: process.env.EMAIL_PASSWORD // Your email password or app password
                }
            });
            // Setup email data
            let mailOptions = {
                from: process.env.EMAIL, // Sender address
                to: `${data.mail}`, // Receiver
                subject: `Thank You For Registration With Us..! : ${data.name}`,
                text: `Thannks for Connect with us , below we share the usernam and password . kinldy not share this with other.
                User name  : ${data.mail}
                Password : ${data.password}
                 `
            };
            try {
                // Send email
                let info = await transporter.sendMail(mailOptions);
                // console.log("Message sent: %s", info.messageId);
        
                return NextResponse.json(
                    { message: "Email sent successfully", messageId: info.messageId },
                    { status: 200 }
                );
            } catch (error) {
                // console.error("Error sending email: ", error);
        
                return NextResponse.json(
                    { message: "Error sending email", error: error.message },
                    { status: 500 }
                );
            }

            return NextResponse.json({ message: "User Created Successfully" }, { status: 201 }, tenantId);
        }



    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ message: "Failed!" }, { status: 500 });
    }
}
