import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  property: string;
  area: string;
  service: string;
  timeline: string;
  budget: string;
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
      property,
      area,
      service,
      timeline,
      budget,
      message,
    }: EnquiryFormData = req.body;

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'property', 'service'];
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

    // Get Gmail credentials from environment variables
    const gmailUser = process.env.GMAIL_USER || 'homeglazer@gmail.com';
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailAppPassword) {
      console.error('GMAIL_APP_PASSWORD is not set in environment variables');
      return res.status(500).json({
        error: 'Email service is temporarily unavailable. Please try again later or contact us.',
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

    // Format property type for display
    const propertyTypeMap: { [key: string]: string } = {
      apartment: 'Apartment',
      house: 'House',
      villa: 'Villa',
      commercial: 'Commercial Space',
      office: 'Office',
      retail: 'Retail Shop',
      other: 'Other',
    };

    // Format service type for display
    const serviceTypeMap: { [key: string]: string } = {
      interior: 'Interior Painting',
      exterior: 'Exterior Painting',
      texture: 'Texture Painting',
      stencil: 'Stencil Painting',
      'wood-polish': 'Wood Polishing',
      'wood-coat': 'Wood Coating',
      carpentry: 'Carpentry Services',
      complete: 'Complete Renovation',
    };

    // Format timeline for display
    const timelineMap: { [key: string]: string } = {
      urgent: 'Urgent (ASAP)',
      '1week': 'Within 1 week',
      '2weeks': 'Within 2 weeks',
      '1month': 'Within 1 month',
      '3months': 'Within 3 months',
      flexible: 'Flexible',
    };

    // Format budget for display
    const budgetMap: { [key: string]: string } = {
      under25k: 'Under ₹25,000',
      '25-50k': '₹25,000 - ₹50,000',
      '50-100k': '₹50,000 - ₹1,00,000',
      '100-200k': '₹1,00,000 - ₹2,00,000',
      above200k: 'Above ₹2,00,000',
      flexible: 'Flexible',
    };

    const propertyType = propertyTypeMap[property] || property;
    const serviceType = serviceTypeMap[service] || service;
    const timelineDisplay = timeline ? timelineMap[timeline] || timeline : 'Not specified';
    const budgetDisplay = budget ? budgetMap[budget] || budget : 'Not specified';

    // Use local logo file for email (embedded as CID attachment)
    const logoPath = path.join(process.cwd(), 'public', 'assets', 'images', 'home-glazer-logo-1.png');
    const logoCid = 'homeglazer-logo@cid';
    const logoUrl = `cid:${logoCid}`; // CID reference for email

    // Create email content
    const emailSubject = `New Enquiry from ${name}`;
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
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="background-color: #ffffff; padding: 15px; border-radius: 8px;">
                    <img src="${logoUrl}" alt="Home Glazer Logo" style="display: block; border: 0; outline: none; text-decoration: none; background-color: #ffffff;" />
                  </td>
                </tr>
              </table>
            </div>
            <div class="header">
              <h1>New Enquiry Received</h1>
            </div>
            <div class="content">
              <p>Dear HomeGlazer Team,</p>
              
              <p>I am writing to enquire about your services. I am interested in transforming my space and would like to share the following details:</p>
              
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
                <div class="label">Property Type:</div>
                <div class="value">${propertyType}</div>
              </div>
              ${area ? `
              <div class="field">
                <div class="label">Area:</div>
                <div class="value">${area} sq.ft</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Service Required:</div>
                <div class="value">${serviceType}</div>
              </div>
              <div class="field">
                <div class="label">Preferred Timeline:</div>
                <div class="value">${timelineDisplay}</div>
              </div>
              <div class="field">
                <div class="label">Budget Range:</div>
                <div class="value">${budgetDisplay}</div>
              </div>
              ${message ? `
              <div class="field">
                <div class="label">Additional Details:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
              
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
              <p style="margin: 0 0 15px 0; word-wrap: break-word; overflow-wrap: break-word;">
                <a href="https://www.facebook.com/homeglazers/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">Facebook</a> |
                <a href="https://in.linkedin.com/company/home-glazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px;">LinkedIn</a> |
                <a href="https://www.instagram.com/homeglazer/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px;">Instagram</a> |
                <a href="https://www.quora.com/profile/Home-Glazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px;">Quora</a> |
                <a href="https://in.pinterest.com/homeglazer/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px;">Pinterest</a> |
                <a href="https://twitter.com/homeglazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px;">X</a>
              </p>
              <p style="margin-top: 15px; font-size: 11px; color: #999;">This enquiry was submitted through the Home Glazer website enquiry form.</p>
              <p style="font-size: 11px; color: #999; margin: 5px 0 0 0;">Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
Home Glazer - We Paint Your Imagination

New Enquiry from ${name}

Dear HomeGlazer Team,

I am writing to enquire about your services. I am interested in transforming my space and would like to share the following details:

Contact Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Project Details:
- Property Type: ${propertyType}
${area ? `- Area: ${area} sq.ft` : ''}
- Service Required: ${serviceType}
- Preferred Timeline: ${timelineDisplay}
- Budget Range: ${budgetDisplay}

${message ? `Additional Details:\n${message}\n` : ''}

I look forward to hearing from you soon.

Best regards,
${name}

---
Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
This enquiry was submitted through the Home Glazer website enquiry form.

Home Glazer - We Paint Your Imagination
B-474, Basement, Greenfield Colony, Faridabad, Haryana - 121010
Email: homeglazer@gmail.com | Phone: +91-9717256514
    `;

    // Send email to Home Glazer with enquiry details
    const homeglazerMailOptions = {
      from: `"Home Glazer Enquiry" <${gmailUser}>`,
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
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="background-color: #ffffff; padding: 15px; border-radius: 8px;">
                    <img src="${logoUrl}" alt="Home Glazer Logo" style="display: block; border: 0; outline: none; text-decoration: none; background-color: #ffffff;" />
                  </td>
                </tr>
              </table>
            </div>
            <div class="header">
              <h1>Thank You for Your Enquiry!</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              
              <p>Thank you for reaching out to Home Glazer! We've received your enquiry and our team is excited to help transform your space.</p>
              
              <div class="summary-box">
                <h2 style="color: #299dd7; margin-top: 0;">Your Enquiry Summary</h2>
                <div class="summary-item">
                  <span class="summary-label">Property Type:</span>
                  <span>${propertyType}</span>
                </div>
                ${area ? `
                <div class="summary-item">
                  <span class="summary-label">Area:</span>
                  <span>${area} sq.ft</span>
                </div>
                ` : ''}
                <div class="summary-item">
                  <span class="summary-label">Service Required:</span>
                  <span>${serviceType}</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">Preferred Timeline:</span>
                  <span>${timelineDisplay}</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">Budget Range:</span>
                  <span>${budgetDisplay}</span>
                </div>
              </div>
              
              <p><strong>What Happens Next?</strong></p>
              <ul>
                <li>Our expert team will review your requirements</li>
                <li>We'll prepare a detailed quote tailored to your project</li>
                <li>You'll receive a response within 24 hours</li>
                <li>We'll schedule a consultation if needed</li>
              </ul>
              
              <p>If you have any immediate questions or need to provide additional details, feel free to reply to this email or call us at <strong>+91-9717256514</strong>.</p>
              
              <p style="margin-top: 30px;">We look forward to working with you!</p>
              
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

Thank You for Your Enquiry!

Dear ${name},

Thank you for reaching out to Home Glazer! We've received your enquiry and our team is excited to help transform your space.

Your Enquiry Summary:
- Property Type: ${propertyType}
${area ? `- Area: ${area} sq.ft` : ''}
- Service Required: ${serviceType}
- Preferred Timeline: ${timelineDisplay}
- Budget Range: ${budgetDisplay}

What Happens Next?
- Our expert team will review your requirements
- We'll prepare a detailed quote tailored to your project
- You'll receive a response within 24 hours
- We'll schedule a consultation if needed

If you have any immediate questions or need to provide additional details, feel free to reply to this email or call us at +91-9717256514.

We look forward to working with you!

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
      subject: 'Thank You for Your Enquiry - Home Glazer',
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
      // Continue even if customer email fails - the main enquiry email was sent
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry submitted successfully. We will get back to you within 24 hours.',
    });
  } catch (error: any) {
    console.error('Error sending enquiry email:', error);

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
      error: 'Failed to submit enquiry. Please try again later or contact us directly.',
    });
  }
}

