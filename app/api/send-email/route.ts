import { NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeTemplate from "@/emails/WelcomeTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST() {
  await resend.emails.send({
    from: "kajal10395@gmail.com",
    to: "cert10kajal@gmail.com",
    subject: "Welcome to PS Project",
    react: WelcomeTemplate({ name: "Kajal" }),
  });
  return NextResponse.json({ message: "Email Sent Successfully" });
}
