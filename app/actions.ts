"use server";

import os from "os";
import nodemailer from "nodemailer";

export async function getSystemSpecs() {
  try {
    const cpus = os.cpus();
    const model = cpus[0]?.model || "UNKNOWN CPU";
    // Clean up model name (remove speed, extra spaces)
    const cleanModel = model
      .replace(/\(R\)/g, "")
      .replace(/\(TM\)/g, "")
      .replace(/@.*/, "")
      .trim();

    const threads = cpus.length;

    return {
      cpuModel: cleanModel,
      threads: threads,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return {
      cpuModel: "UNKNOWN SYSTEM",
      threads: 4,
    };
  }
}

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // REPLACE THESE WITH YOUR ACTUAL CREDENTIALS
  // NOTE: For Gmail, you need to use an App Password, not your regular password.
  // Go to https://myaccount.google.com/apppasswords to generate one.
  const EMAIL_USER = "sahilbhullar44@gmail.com";
  const EMAIL_PASS = "qqxo cdli fdje rmpf"; // <--- PUT YOUR APP PASSWORD HERE

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`, // sender address (shows up as "Name <email>")
      to: "sahilbhullar44@gmail.com", // list of receivers
      subject: `New Contact Form Submission from ${name}`, // Subject line
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // plain text body
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `, // html body
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
