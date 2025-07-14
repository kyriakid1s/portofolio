import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
    console.log('💥 send-email handler hit');
    const text = await request.text();
    console.log('💥 raw body:', text);
    let body;
    try {
        body = JSON.parse(text);
    } catch (err) {
        const raw = JSON.parse(text);
        console.error('Failed to parse JSON. Raw body:', raw);
        return NextResponse.json({ success: false, message: 'Invalid JSON' }, { status: 400 });
    }
    const { name, email, message } = body

    try {
        console.log('Received form data:', process.env.EMAIL_USER, process.env.EMAIL_PASSWORD)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        })

        // Email options
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New message from ${name} (${email})`,
            text: message,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        }

        // Send email
        await transporter.sendMail(mailOptions)

        return NextResponse.json({
            success: true,
            message: 'Message sent successfully'
        })
    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to send message'
            },
            { status: 500 }
        )
    }
}