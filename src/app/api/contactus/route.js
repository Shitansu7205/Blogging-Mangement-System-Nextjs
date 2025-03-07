import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();
    // console.log('Form data received:', data);

    // Create reusable transporter object using SMTP
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    // Setup email data
    let mailOptions = {
      from: `${data.mail}`, // Sender address
      to: 'shitansu.gochhayat@bookingjini.co', // Receiver address (use the email that receives the form submission)
      subject: `Blogify form submission!`,
      text: `You have a new Contact Form Submission for Blogify.
      Name: ${data.name}
      Mail id: ${data.mail}
      Phone: ${data.phone}
      Message: ${data.message}`,
    };

    // console.log('Mail Options:', mailOptions);

    try {
      // Send email
      let info = await transporter.sendMail(mailOptions);
      // console.log('Email sent:', info); // Log the result of sending the email

      return NextResponse.json(
        { message: "Email sent successfully", messageId: info.messageId },
        { status: 200 }
      );
    } catch (error) {
      // If sending email fails
      // console.error("Error sending email: ", error);
      return NextResponse.json(
        { message: "Error sending email", error: error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    // If there's an issue processing the request
    // console.error("Error processing the request: ", error);
    return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
  }
}
