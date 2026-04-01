export const buildQuoteEmail = ({
  fullName,
  company,
  email,
  requestDetails,
}: {
  fullName: string
  company: string
  email: string
  requestDetails: string
}) => {
  return {
    subject: `[REQUEST A QUOTE] ${fullName} – ${company}`,
    text: `
NEW REQUEST A QUOTE SUBMISSION

Client Information
------------------
Full Name: ${fullName}
Company Name: ${company}
Work Email: ${email}

Request
-------
${requestDetails}
    `.trim(),
  }
}
