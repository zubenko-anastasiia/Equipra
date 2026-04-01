import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const MAX_CV_SIZE_BYTES = 10 * 1024 * 1024
const PDF_MIME_TYPE = 'application/pdf'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const fullName = formData.get('fullName')
    const email = formData.get('email')
    const position = formData.get('position')
    const cvFile = formData.get('cvFile')

    if (
      typeof fullName !== 'string' ||
      typeof email !== 'string' ||
      typeof position !== 'string' ||
      !(cvFile instanceof File)
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const normalizedFullName = fullName.trim()
    const normalizedEmail = email.trim()
    const normalizedPosition = position.trim()

    if (
      !normalizedFullName ||
      !normalizedEmail ||
      !normalizedPosition ||
      cvFile.size === 0
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const isPdf =
      cvFile.type === PDF_MIME_TYPE ||
      cvFile.name.toLowerCase().endsWith('.pdf')

    if (!isPdf) {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      )
    }

    if (cvFile.size > MAX_CV_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'PDF must be 10 MB or smaller' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await cvFile.arrayBuffer())
    const subject = `[JOB APPLICATION] ${normalizedFullName} – ${normalizedPosition}`
    const submittedAt = new Date().toISOString()

    const text = `
NEW JOB APPLICATION

Candidate Information
---------------------
Full Name: ${normalizedFullName}
Work Email: ${normalizedEmail}
Position Applied For: ${normalizedPosition}
Submitted At: ${submittedAt}

Attachment
----------
CV: Attached as PDF
    `.trim()

    const { error } = await resend.emails.send({
      from: 'Equipra Website <onboarding@resend.dev>',
      to: 'nastya.zubenko.05@gmail.com',
      replyTo: normalizedEmail,
      subject,
      text,
      attachments: [
        {
          filename: cvFile.name,
          content: buffer,
          contentType: PDF_MIME_TYPE,
        },
      ],
    })

    if (error) {
      console.error('Resend application error:', error)

      return NextResponse.json(
        { error: 'Failed to send application' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Apply form error:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
