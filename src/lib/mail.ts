import nodemailer from "nodemailer";

interface MailOptions {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

// Smart Host Recovery: If the user mistakenly puts their email as the host, 
// we automatically help correct it to the standard Gmail SMTP host.
const rawHost = process.env.SMTP_HOST || "";
const smtpHost = rawHost.includes("gmail.com") ? "smtp.gmail.com" : rawHost;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true", 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendMail = async ({
  firstName,
  lastName,
  email,
  subject,
  message,
}: MailOptions) => {
  const mailContentText = `
    New Inquiry from ${firstName} ${lastName}
    -----------------------------------------
    Email: ${email}
    Subject: ${subject}
    
    Message:
    ${message}
  `;

  const mailContentHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #fafafa; color: #111; }
        .container { max-width: 600px; margin: 40px auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); }
        .header { background: #FF5E41; padding: 40px 32px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.04em; text-transform: uppercase; }
        .status-badge { display: inline-block; padding: 6px 14px; background: rgba(255, 255, 255, 0.2); color: #ffffff; border-radius: 100px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 16px; }
        .content { padding: 48px 40px; }
        .field-group { margin-bottom: 32px; }
        .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin-bottom: 8px; }
        .field-value { font-size: 17px; font-weight: 600; color: #111827; }
        .message-block { padding: 32px; background: #fff8f7; border-left: 4px solid #FF5E41; border-radius: 8px; font-size: 16px; line-height: 1.8; color: #374151; margin-top: 8px; }
        .footer { padding: 32px; background: #f9fafb; border-top: 1px solid #f3f4f6; text-align: center; }
        .footer-text { font-size: 12px; color: #9ca3af; letter-spacing: 0.02em; }
        .link { color: #FF5E41; text-decoration: none; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="status-badge">New Workspace Inquiry</div>
          <h1>LEGENDARIUM</h1>
        </div>
        <div class="content">
          <div class="field-group">
            <div class="field-label">From Participant</div>
            <div class="field-value">${firstName} ${lastName}</div>
          </div>
          
          <div class="field-group">
            <div class="field-label">Contact Channel</div>
            <div class="field-value"><a href="mailto:${email}" class="link">${email}</a></div>
          </div>
          
          <div class="field-group">
            <div class="field-label">Declared Subject</div>
            <div class="field-value">${subject}</div>
          </div>
          
          <div class="field-group">
            <div class="field-label">The Message</div>
            <div class="message-block">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="footer-text">
            This inquiry was dispatched from your <span class="link">Portfolio Workspace</span>.
            <br>
            &copy; ${new Date().getFullYear()} Legendarium Engine.
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const info = await transporter.sendMail({
    from: `"${firstName} ${lastName}" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    replyTo: email,
    subject: `[LEGENDARIUM] New Message: ${subject}`,
    text: mailContentText,
    html: mailContentHtml,
  });

  return info;
};
