import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
export async function POST(req) {
    const { messageText } = await req.json()


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD_EMAIL,
        },
    });

    const mailOptions = {
        from: process.env.USER,
        to: ["mgaballa41@gmail.com"],
        bcc: ['hassanrageh.236@gmail.com'],
        subject: 'New Lead In Aqary Store',
        html: `
            <h3>Hello Mr. Mohamed Gaballa</h3>
            <p>I hope this message finds you will, there is a new Lead in your Aqary Store Platform</p>
            <h4>Check him: <a href='https://www.aqarystore.com/dashboard/users'></a></h4>
            ${messageText}
        `
    }

    await transporter.sendMail(mailOptions)
    
    return NextResponse.json({message: 'Email Sent'} , {status: 200})
}
