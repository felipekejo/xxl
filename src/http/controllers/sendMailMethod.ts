import { app } from "@/app";

interface EmailRequestBody {
  to: string;
  subject: string;
  text: string;
}

export async function sendMail(emailData: EmailRequestBody) {
  const { to, subject, text } = emailData;

  try {
    const mailer = app.mailer;

    await mailer.sendMail({
      to,
      subject,
      text,
    });

    return { message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
