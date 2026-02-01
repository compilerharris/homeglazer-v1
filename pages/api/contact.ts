import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
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
      phone,
      service,
      message,
    }: ContactFormData = req.body;

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'service', 'message'];
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

    // Validate phone format
    const phoneRegex = /^[0-9+\- ]{10,15}$/;
    if (!phoneRegex.test(phone.trim())) {
      return res.status(400).json({ error: 'Invalid phone number' });
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
      secure: false, // true for 465, false for other ports
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Format service type for display
    const serviceTypeMap: { [key: string]: string } = {
      interior: 'Interior Painting',
      exterior: 'Exterior Painting',
      texture: 'Texture Painting',
      stencil: 'Stencil Painting',
      'wood-polish': 'Wood Polishing',
      'wood-coat': 'Wood Coating',
      carpentry: 'Carpentry Services',
    };

    const serviceType = serviceTypeMap[service] || service;

    // Use local logo file for email (embedded as CID attachment)
    const logoPath = path.join(process.cwd(), 'public', 'assets', 'images', 'home-glazer-logo-1.png');
    const logoCid = 'homeglazer-logo@cid';
    const logoUrl = `cid:${logoCid}`; // CID reference for email

    // Create email content for HomeGlazer
    const emailSubject = `New Contact Message from ${name}`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff; }
            .logo-section { text-align: center; padding: 20px; background-color: #ffffff; }
            .logo-section img { max-width: 150px; height: auto; display: block; margin: 0 auto; }
            .tagline { text-align: center; color: #666; font-style: italic; font-size: 14px; margin-top: 5px; }
            .header { background-color: #299dd7; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #ED276E; }
            .value { margin-top: 5px; }
            .cta-section { background-color: #f0f0f0; padding: 30px 20px; text-align: center; }
            .cta-buttons { text-align: center; }
            .cta-button { display: inline-block; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; text-align: center; }
            .cta-button.visualizer { background-color: #ED276E; }
            .cta-button.visualizer:hover { background-color: #d51e5f; }
            .cta-button.calculator { background-color: #299dd7; }
            .cta-button.calculator:hover { background-color: #237bb0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background-color: #f9f9f9; }
            .social-links { margin: 15px 0; }
            .social-links a { display: inline-block; margin: 0 8px; color: #299dd7; text-decoration: none; font-size: 13px; }
            .social-links a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo-section">
              <img src="${logoUrl}" alt="Home Glazer Logo" />
              <div class="tagline">We Paint Your Imagination</div>
            </div>
            <div class="header">
              <h1>New Contact Message Received</h1>
            </div>
            <div class="content">
              <p>Dear HomeGlazer Team,</p>
              
              <p>I am writing to contact you regarding your services. I would like to share the following information:</p>
              
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              <div class="field">
                <div class="label">Service Required:</div>
                <div class="value">${serviceType}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <p style="margin-top: 20px;">I look forward to hearing from you soon.</p>
              
              <p>Best regards,<br>
              <strong>${name}</strong></p>
            </div>
            <div class="cta-section">
              <h3 style="margin-top: 0; color: #333;">Explore Our Tools</h3>
              <div class="cta-buttons">
                <a href="https://www.homeglazer.com/colour-visualiser" class="cta-button">Try Visualizer</a><br><br>
                <a href="https://www.homeglazer.com/paint-budget-calculator" class="cta-button">Budget Calculator</a>
              </div>
            </div>
            <div class="footer" style="text-align: center; padding: 20px; color: #666; font-size: 12px; background-color: #f9f9f9; clear: both; display: block; width: 100%; overflow: visible;">
              <p style="margin: 0 0 10px 0;"><strong>Home Glazer</strong> - We Paint Your Imagination</p>
              <p style="margin: 0 0 10px 0;">B-474, Basement, Greenfield Colony, Faridabad, Haryana - 121010</p>
              <p style="margin: 0 0 15px 0;">Email: <a href="mailto:homeglazer@gmail.com" style="color: #299dd7; text-decoration: none;">homeglazer@gmail.com</a> | Phone: <a href="tel:+919717256514" style="color: #299dd7; text-decoration: none;">+91-9717256514</a></p>
              <p style="margin: 0 0 15px 0;">
                <a href="https://www.facebook.com/homeglazers/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">Facebook</a> |
                <a href="https://in.linkedin.com/company/home-glazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">LinkedIn</a> |
                <a href="https://www.instagram.com/homeglazer/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">Instagram</a> |
                <a href="https://www.quora.com/profile/Home-Glazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">Quora</a> |
                <a href="https://in.pinterest.com/homeglazer/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">Pinterest</a> |
                <a href="https://twitter.com/homeglazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">X</a>
              </p>
              <p style="margin-top: 15px; font-size: 11px; color: #999;">This message was submitted through the Home Glazer website contact form.</p>
              <p style="font-size: 11px; color: #999; margin: 5px 0 0 0;">Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
Home Glazer - We Paint Your Imagination

New Contact Message from ${name}

Dear HomeGlazer Team,

I am writing to contact you regarding your services. I would like to share the following information:

Contact Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Service Details:
- Service Required: ${serviceType}

Message:
${message}

I look forward to hearing from you soon.

Best regards,
${name}

---
Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
This message was submitted through the Home Glazer website contact form.

Home Glazer - We Paint Your Imagination
B-474, Basement, Greenfield Colony, Faridabad, Haryana - 121010
Email: homeglazer@gmail.com | Phone: +91-9717256514
    `;

    // Send email to Home Glazer with contact message
    const homeglazerMailOptions = {
      from: `"Home Glazer Contact" <${gmailUser}>`,
      to: gmailUser, // Send to homeglazer@gmail.com
      replyTo: email, // Allow replying directly to the customer
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
            .logo-section img { max-width: 150px; height: auto; display: block; margin: 0 auto; }
            .tagline { text-align: center; color: #666; font-style: italic; font-size: 14px; margin-top: 5px; }
            .header { background-color: #299dd7; color: white; padding: 30px; text-align: center; }
            .content { background-color: #ffffff; padding: 30px; }
            .summary-box { background-color: #f9f9f9; border-left: 4px solid #299dd7; padding: 20px; margin: 20px 0; }
            .summary-item { margin-bottom: 10px; }
            .summary-label { font-weight: bold; color: #ED276E; display: inline-block; min-width: 150px; }
            .cta-section { background-color: #f0f0f0; padding: 30px 20px; text-align: center; }
            .cta-buttons { text-align: center; }
            .cta-button { display: inline-block; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; text-align: center; }
            .cta-button.visualizer { background-color: #ED276E; }
            .cta-button.visualizer:hover { background-color: #d51e5f; }
            .cta-button.calculator { background-color: #299dd7; }
            .cta-button.calculator:hover { background-color: #237bb0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background-color: #f9f9f9; }
            .social-links { margin: 15px 0; }
            .social-links a { display: inline-block; margin: 0 8px; color: #299dd7; text-decoration: none; font-size: 13px; }
            .social-links a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo-section">
              <img src="${logoUrl}" alt="Home Glazer Logo" />
              <div class="tagline">We Paint Your Imagination</div>
            </div>
            <div class="header">
              <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              
              <p>Thank you for reaching out to Home Glazer! We've received your message and our team will get back to you as soon as possible.</p>
              
              <div class="summary-box">
                <h2 style="color: #299dd7; margin-top: 0;">Your Message Summary</h2>
                <div class="summary-item">
                  <span class="summary-label">Service Required:</span>
                  <span>${serviceType}</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">Your Message:</span>
                  <span>${message.replace(/\n/g, '<br>')}</span>
                </div>
              </div>
              
              <p><strong>What Happens Next?</strong></p>
              <ul>
                <li>Our team will review your message</li>
                <li>We'll respond to your inquiry within 24 hours</li>
                <li>We'll provide you with the information or assistance you need</li>
                <li>If needed, we'll schedule a consultation to discuss your project</li>
              </ul>
              
              <p>If you have any immediate questions or need to provide additional details, feel free to reply to this email or call us at <strong>+91-9717256514</strong>.</p>
              
              <p style="margin-top: 30px;">We look forward to assisting you!</p>
              
              <p>Best regards,<br>
              <strong>The Home Glazer Team</strong></p>
            </div>
            <div class="cta-section">
              <h3 style="margin-top: 0; color: #333;">Explore Our Tools</h3>
              <div class="cta-buttons">
                <a href="https://www.homeglazer.com/colour-visualiser" class="cta-button visualizer" style="color: white !important; background-color: #ED276E;">Try Visualizer</a><br><br>
                <a href="https://www.homeglazer.com/paint-budget-calculator" class="cta-button calculator" style="color: white !important; background-color: #299dd7;">Budget Calculator</a>
              </div>
            </div>
            <div class="footer" style="text-align: center; padding: 20px; color: #666; font-size: 12px; background-color: #f9f9f9; clear: both; display: block; width: 100%; overflow: visible;">
              <p style="margin: 0 0 10px 0;"><strong>Home Glazer</strong> - We Paint Your Imagination</p>
              <p style="margin: 0 0 10px 0;">B-474, Basement, Greenfield Colony, Faridabad, Haryana - 121010</p>
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

Thank You for Contacting Us!

Dear ${name},

Thank you for reaching out to Home Glazer! We've received your message and our team will get back to you as soon as possible.

Your Message Summary:
- Service Required: ${serviceType}
- Your Message: ${message}

What Happens Next?
- Our team will review your message
- We'll respond to your inquiry within 24 hours
- We'll provide you with the information or assistance you need
- If needed, we'll schedule a consultation to discuss your project

If you have any immediate questions or need to provide additional details, feel free to reply to this email or call us at +91-9717256514.

We look forward to assisting you!

Best regards,
The Home Glazer Team

---
Home Glazer - We Paint Your Imagination
B-474, Basement, Greenfield Colony, Faridabad, Haryana - 121010
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
      to: email, // Send to customer
      subject: 'Thank You for Contacting Us - Home Glazer',
      text: customerThankYouText,
      html: customerThankYouHtml,
      attachments: [{
        filename: 'home-glazer-logo.png',
        path: logoPath,
        cid: logoCid,
      }],
    };

    // Send customer email (don't fail if this fails, but log it)
    try {
      await transporter.sendMail(customerMailOptions);
    } catch (customerEmailError) {
      console.error('Error sending thank you email to customer:', customerEmailError);
      // Continue even if customer email fails - the main contact email was sent
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully. We will get back to you within 24 hours.',
    });
  } catch (error: any) {
    console.error('Error sending contact email:', error);

    // Handle specific SMTP errors
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        error: 'Email authentication failed. Please check Gmail credentials.',
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
