import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import path from 'path';

interface HomepageContactFormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      mobile,
      message,
    }: HomepageContactFormData = req.body;

    // Validate required fields
    const requiredFields = ['name', 'email', 'mobile', 'message'];
    const missingFields = requiredFields.filter(
      (field) => !req.body[field] || !req.body[field].trim()
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Validate mobile format
    const mobileRegex = /^[0-9+\- ]{10,15}$/;
    if (!mobileRegex.test(mobile.trim())) {
      return res.status(400).json({ error: 'Invalid mobile number' });
    }

    // Validate message length
    if (message.trim().length < 10) {
      return res.status(400).json({ error: 'Message should be at least 10 characters' });
    }

    // Get Gmail credentials from environment variables
    const gmailUser = process.env.GMAIL_USER || 'homeglazer@gmail.com';
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailAppPassword) {
      console.error('GMAIL_APP_PASSWORD is not set in environment variables');
      return res.status(500).json({
        error: 'Email service is not configured. Please contact support.',
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Use local logo file for email (embedded as CID attachment)
    const logoPath = path.join(process.cwd(), 'public', 'assets', 'images', 'home-glazer-logo-1.png');
    const logoCid = 'homeglazer-logo@cid';
    const logoUrl = `cid:${logoCid}`;

    // Create email content for HomeGlazer
    const emailSubject = `New Homepage Inquiry - ${name}`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff; }
            .logo-section { text-align: center; padding: 20px; background-color: #ffffff; }
            .header { background-color: #299dd7; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #ED276E; }
            .value { margin-top: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background-color: #f9f9f9; clear: both; display: block; width: 100%; overflow: visible; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo-section">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="background-color: #ffffff; padding: 15px; border-radius: 8px;">
                    <img src="${logoUrl}" alt="Home Glazer Logo" style="display: block; border: 0; outline: none; text-decoration: none; background-color: #ffffff; max-width: 150px; height: auto; width: 100%;" />
                  </td>
                </tr>
              </table>
            </div>
            <div class="header">
              <h1>New Homepage Inquiry</h1>
            </div>
            <div class="content">
              <p>Dear HomeGlazer Team,</p>
              
              <p>A new inquiry has been received through the homepage contact form:</p>
              
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Mobile:</div>
                <div class="value"><a href="tel:${mobile}">${mobile}</a></div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <p style="margin-top: 20px;">Please follow up with this inquiry at your earliest convenience.</p>
            </div>
            <div class="footer">
              <p style="margin: 0 0 10px 0;"><strong>Home Glazer</strong> - We Paint Your Imagination</p>
              <p style="margin: 0 0 10px 0;">B-474, Basement, Greenfeild Colony, Faridabad, Harayana - 121010</p>
              <p style="margin: 0 0 15px 0;">Email: <a href="mailto:homeglazer@gmail.com" style="color: #299dd7; text-decoration: none;">homeglazer@gmail.com</a> | Phone: <a href="tel:+919717256514" style="color: #299dd7; text-decoration: none;">+91-9717256514</a></p>
              <p style="margin: 0 0 0 0; word-wrap: break-word; overflow-wrap: break-word;">
                <a href="https://www.facebook.com/homeglazers/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">Facebook</a> |
                <a href="https://in.linkedin.com/company/home-glazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">LinkedIn</a> |
                <a href="https://www.instagram.com/homeglazer/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">Instagram</a> |
                <a href="https://www.quora.com/profile/Home-Glazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">Quora</a> |
                <a href="https://in.pinterest.com/homeglazer/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">Pinterest</a> |
                <a href="https://twitter.com/homeglazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">X</a>
              </p>
              <p style="margin-top: 15px; font-size: 11px; color: #999;">Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
Home Glazer - We Paint Your Imagination

New Homepage Inquiry from ${name}

Contact Information:
- Name: ${name}
- Email: ${email}
- Mobile: ${mobile}

Message:
${message}

---
Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Home Glazer - We Paint Your Imagination
B-474, Basement, Greenfeild Colony, Faridabad, Harayana - 121010
Email: homeglazer@gmail.com | Phone: +91-9717256514
    `;

    // Send email to Home Glazer
    const homeglazerMailOptions = {
      from: `"Home Glazer Website" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      attachments: [{
        filename: 'home-glazer-logo.png',
        path: logoPath,
        cid: logoCid,
      }],
    };

    await transporter.sendMail(homeglazerMailOptions);

    // Send thank you email to customer
    const customerThankYouHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff; }
            .logo-section { text-align: center; padding: 20px; background-color: #ffffff; }
            .header { background-color: #299dd7; color: white; padding: 30px; text-align: center; }
            .content { background-color: #ffffff; padding: 30px; }
            .cta-section { background-color: #f0f0f0; padding: 30px 20px; text-align: center; }
            .cta-button { display: inline-block; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; text-align: center; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background-color: #f9f9f9; clear: both; display: block; width: 100%; overflow: visible; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo-section">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="background-color: #ffffff; padding: 15px; border-radius: 8px;">
                    <img src="${logoUrl}" alt="Home Glazer Logo" style="display: block; border: 0; outline: none; text-decoration: none; background-color: #ffffff; max-width: 150px; height: auto; width: 100%;" />
                  </td>
                </tr>
              </table>
            </div>
            <div class="header">
              <h1>Thank You for Reaching Out!</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              
              <p>Thank you for contacting Home Glazer! We've received your message and our team will get back to you within <strong>24 hours</strong>.</p>
              
              <div style="background-color: #f9f9f9; border-left: 4px solid #299dd7; padding: 15px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0;"><strong>Your Message:</strong></p>
                <p style="margin: 0; color: #666;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <p><strong>What Happens Next?</strong></p>
              <ul>
                <li>Our team will review your inquiry</li>
                <li>We'll respond within 24 hours</li>
                <li>We may schedule a free consultation if needed</li>
              </ul>
              
              <p>For immediate assistance, call us at <strong>+91-9717256514</strong>.</p>
              
              <p style="margin-top: 30px;">We look forward to transforming your space!</p>
              
              <p>Best regards,<br>
              <strong>The Home Glazer Team</strong></p>
            </div>
            <div class="cta-section">
              <h3 style="margin-top: 0; color: #333;">Explore Our Tools</h3>
              <div style="text-align: center;">
                <a href="https://www.homeglazer.com/colour-visualiser" class="cta-button" style="color: white !important; background-color: #ED276E; margin-bottom: 10px; display: inline-block;">Try Colour Visualizer</a><br><br>
                <a href="https://www.homeglazer.com/paint-budget-calculator" class="cta-button" style="color: white !important; background-color: #299dd7; display: inline-block;">Paint Budget Calculator</a>
              </div>
            </div>
            <div class="footer">
              <p style="margin: 0 0 10px 0;"><strong>Home Glazer</strong> - We Paint Your Imagination</p>
              <p style="margin: 0 0 10px 0;">B-474, Basement, Greenfeild Colony, Faridabad, Harayana - 121010</p>
              <p style="margin: 0 0 15px 0;">Email: <a href="mailto:homeglazer@gmail.com" style="color: #299dd7; text-decoration: none;">homeglazer@gmail.com</a> | Phone: <a href="tel:+919717256514" style="color: #299dd7; text-decoration: none;">+91-9717256514</a></p>
              <p style="margin: 0 0 0 0; word-wrap: break-word; overflow-wrap: break-word;">
                <a href="https://www.facebook.com/homeglazers/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">Facebook</a> |
                <a href="https://in.linkedin.com/company/home-glazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">LinkedIn</a> |
                <a href="https://www.instagram.com/homeglazer/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">Instagram</a> |
                <a href="https://www.quora.com/profile/Home-Glazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">Quora</a> |
                <a href="https://in.pinterest.com/homeglazer/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">Pinterest</a> |
                <a href="https://twitter.com/homeglazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">X</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const customerThankYouText = `
Home Glazer - We Paint Your Imagination

Thank You for Reaching Out!

Dear ${name},

Thank you for contacting Home Glazer! We've received your message and our team will get back to you within 24 hours.

Your Message:
${message}

What Happens Next?
- Our team will review your inquiry
- We'll respond within 24 hours
- We may schedule a free consultation if needed

For immediate assistance, call us at +91-9717256514.

We look forward to transforming your space!

Best regards,
The Home Glazer Team

---
Home Glazer - We Paint Your Imagination
B-474, Basement, Greenfeild Colony, Faridabad, Harayana - 121010
Email: homeglazer@gmail.com | Phone: +91-9717256514

Follow us on:
Facebook: https://www.facebook.com/homeglazers/
LinkedIn: https://in.linkedin.com/company/home-glazer
Instagram: https://www.instagram.com/homeglazer/
Quora: https://www.quora.com/profile/Home-Glazer
Pinterest: https://in.pinterest.com/homeglazer/
X: https://twitter.com/homeglazer
    `;

    const customerMailOptions = {
      from: `"Home Glazer" <${gmailUser}>`,
      to: email,
      subject: 'Thank You for Contacting Home Glazer',
      text: customerThankYouText,
      html: customerThankYouHtml,
      attachments: [{
        filename: 'home-glazer-logo.png',
        path: logoPath,
        cid: logoCid,
      }],
    };

    // Send customer email (don't fail if this fails)
    try {
      await transporter.sendMail(customerMailOptions);
    } catch (customerEmailError) {
      console.error('Error sending thank you email to customer:', customerEmailError);
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! We will get back to you within 24 hours.',
    });
  } catch (error: any) {
    console.error('Error sending homepage contact email:', error);

    if (error.code === 'EAUTH') {
      return res.status(500).json({
        error: 'Email authentication failed. Please try again later.',
      });
    }

    if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      return res.status(500).json({
        error: 'Unable to connect to email service. Please try again later.',
      });
    }

    return res.status(500).json({
      error: 'Failed to send message. Please try again later or contact us directly.',
    });
  }
}
