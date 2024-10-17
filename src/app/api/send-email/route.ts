import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  const { userEmail, dealId, comment } = await request.json();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Enrollment Confirmation",
    text: `You have successfully enrolled in deal ID: ${dealId}.\n\nYour comment: ${comment}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
