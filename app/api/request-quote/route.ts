import { buildQuoteEmail } from '@/app/_lib/email-templates'
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
    const requestDetails = body.requestDetails?.trim()

    if (!fullName || !company || !email || !requestDetails) {
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

    const { subject, text } = buildQuoteEmail({
      fullName,
      company,
      email,
      requestDetails,
    })

    const { error } = await resend.emails.send({
      from: 'Equipra Website <onboarding@resend.dev>',
      to: 'nastya.zubenko.05@gmail.com',
      replyTo: email,
      subject,
      text,
    })

    if (error) {
      console.error('Resend quote error:', error)

      return NextResponse.json(
        { error: 'Failed to send quote request' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Quote request error:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
