import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const fullName = body.fullName?.trim()
    const company = body.company?.trim()
    const email = body.email?.trim()
    const message = body.message?.trim()

    if (!fullName || !company || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const subject = `[CONTACT FORM] ${fullName} – ${company}`

    const text = `
NEW CONTACT FORM SUBMISSION

Full Name: ${fullName}
Company Name: ${company}
Email: ${email}

Message:
${message}
    `.trim()

    const { error } = await resend.emails.send({
      from: 'Equipra Website <onboarding@resend.dev>',
      to: 'nastya.zubenko.05@gmail.com',
      replyTo: email,
      subject,
      text,
    })

    if (error) {
      console.error('Resend error:', error)

      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
