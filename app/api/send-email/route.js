import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { recipients, subject, htmlContent } = await request.json();

    // Validate input
    if (!recipients || recipients.length === 0) {
      return NextResponse.json(
        { error: 'No recipients provided' },
        { status: 400 }
      );
    }

    if (!subject) {
      return NextResponse.json(
        { error: 'No subject provided' },
        { status: 400 }
      );
    }

    if (!htmlContent) {
      return NextResponse.json(
        { error: 'No content provided' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "i221545@nu.edu.pk",
        pass: "qfaj sdrs ksnp qhlz" // App password
      }
    });

    // Send email
    await transporter.sendMail({
      from: "i221545@nu.edu.pk",
      to: recipients.join(', '),
      subject: subject,
      html: htmlContent
    });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    );
  }
}
