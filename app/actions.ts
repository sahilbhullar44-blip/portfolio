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
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Submission</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
              body { margin: 0; padding: 0; background-color: #000000; font-family: 'JetBrains Mono', 'Courier New', Courier, monospace; color: #e0e0e0; }
              .wrapper { width: 100%; table-layout: fixed; background-color: #000000; padding-bottom: 40px; }
              .container { max-width: 600px; margin: 0 auto; background-color: #050505; border: 1px solid #333; border-radius: 12px; overflow: hidden; box-shadow: 0 0 40px rgba(6, 182, 212, 0.15); position: relative; }
              
              /* Neon Top Border */
              .neon-line { height: 4px; width: 100%; background: linear-gradient(90deg, #a855f7, #06b6d4, #22c55e); }
              
              .header { background-color: #0a0a0a; padding: 30px 40px; border-bottom: 1px solid #222; position: relative; overflow: hidden; }
              .header-bg { position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1; background-image: linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px); background-size: 20px 20px; z-index: 0; }
              .header-content { position: relative; z-index: 1; }
              
              .badge { display: inline-block; padding: 4px 8px; background-color: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); color: #22c55e; font-size: 10px; border-radius: 4px; letter-spacing: 1px; margin-bottom: 12px; }
              .title { color: #fff; font-size: 24px; font-weight: bold; letter-spacing: -0.5px; margin: 0; text-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
              .subtitle { color: #666; font-size: 12px; margin-top: 8px; font-family: sans-serif; letter-spacing: 1px; text-transform: uppercase; }

              .content { padding: 40px; position: relative; }
              
              .grid-row { display: flex; margin-bottom: 24px; align-items: flex-start; }
              .icon-box { width: 40px; height: 40px; background-color: #111; border: 1px solid #333; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0; color: #888; }
              .info-col { flex: 1; }
              .label { color: #555; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px; display: block; font-weight: bold; }
              .value { color: #fff; font-size: 16px; font-weight: 500; }
              .email-link { color: #06b6d4; text-decoration: none; border-bottom: 1px dashed #06b6d4; padding-bottom: 2px; }

              .message-card { background-color: #0c0c0c; border: 1px solid #222; border-radius: 8px; padding: 20px; margin-top: 10px; position: relative; }
              .message-card::before { content: '"'; position: absolute; top: -20px; left: 20px; font-size: 60px; color: #222; font-family: serif; }
              .message-text { color: #ccc; line-height: 1.8; font-size: 14px; white-space: pre-wrap; position: relative; z-index: 1; }

              .footer { background-color: #080808; padding: 20px; text-align: center; border-top: 1px solid #222; }
              .footer-text { color: #444; font-size: 10px; letter-spacing: 1px; margin-bottom: 10px; }
              .sys-info { display: inline-block; padding: 4px 12px; background-color: #111; border-radius: 100px; border: 1px solid #222; color: #666; font-size: 10px; }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div style="height: 40px;"></div>
              <div class="container">
                <div class="neon-line"></div>
                <div class="header">
                  <div class="header-bg"></div>
                  <div class="header-content">
                    <div class="badge">● ENCRYPTED TRANSMISSION</div>
                    <h1 class="title">New Project Inquiry</h1>
                    <div class="subtitle">Received via Quantum Uplink</div>
                  </div>
                </div>
                
                <div class="content">
                  <!-- Sender -->
                  <div class="grid-row">
                    <div class="icon-box" style="border-color: rgba(168, 85, 247, 0.3); color: #a855f7;">
                      <span>ID</span>
                    </div>
                    <div class="info-col">
                      <span class="label">Sender Identity</span>
                      <div class="value">${name}</div>
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="grid-row">
                    <div class="icon-box" style="border-color: rgba(6, 182, 212, 0.3); color: #06b6d4;">
                      <span>@</span>
                    </div>
                    <div class="info-col">
                      <span class="label">Return Address</span>
                      <div class="value">
                        <a href="mailto:${email}" class="email-link">${email}</a>
                      </div>
                    </div>
                  </div>

                  <!-- Message -->
                  <div style="margin-top: 30px;">
                    <span class="label" style="margin-bottom: 12px;">Decrypted Payload</span>
                    <div class="message-card">
                      <div class="message-text">${message}</div>
                    </div>
                  </div>
                </div>

                <div class="footer">
                  <div class="footer-text">SECURE SYSTEM NOTIFICATION // AUTOMATED DISPATCH</div>
                  <div class="sys-info">
                    SERVER_TIME: ${new Date().toISOString().split('T')[0]} // PORT: 443
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `, // html body
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
