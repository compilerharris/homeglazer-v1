import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { generateVisualizerEstimatePdf, ColorSelection } from '../../../src/lib/visualizerEstimatePdf';

// Helper function to format room variant name (e.g., "kidsroom1" -> "Kids Room 1")
function formatRoomVariant(variant: string): string {
  if (!variant) return variant;
  
  // Insert space before capital letters and numbers
  let formatted = variant
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase
    .replace(/([a-zA-Z])(\d)/g, '$1 $2') // letter followed by number
    .replace(/(\d)([a-zA-Z])/g, '$1 $2'); // number followed by letter
  
  // Capitalize first letter of each word
  formatted = formatted
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  return formatted;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase limit for base64 image data
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const {
      clientName,
      email,
      phone,
      roomType,
      roomVariant,
      brand,
      colorSelections,
      previewImage,
    } = req.body;

    // Validate required fields
    if (!clientName || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    if (!roomType || !roomVariant || !brand) {
      return res.status(400).json({ error: 'Room selection data is required' });
    }

    // Logo configuration (CID attachment)
    const logoPath = path.join(process.cwd(), 'public', 'assets', 'images', 'home-glazer-logo-1.png');
    const logoCid = 'homeglazer-logo@cid';
    const logoUrl = `cid:${logoCid}`;

    // Gmail credentials
    const gmailUser = process.env.GMAIL_USER || 'homeglazer@gmail.com';
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailAppPassword) {
      console.error('GMAIL_APP_PASSWORD is not set');
      return res.status(500).json({ error: 'Email service password not configured' });
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
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // Verify connection configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('Transporter verification error:', verifyError);
      return res.status(500).json({ error: 'Email service connection failed' });
    }

    // Build color selections summary HTML for email
    const colorSummaryHtml = (colorSelections as ColorSelection[]).map((color) => `
      <div style="display: flex; align-items: center; margin: 5px 0;">
        <div style="width: 20px; height: 20px; background-color: ${color.colorHex}; border: 1px solid #ccc; border-radius: 3px; margin-right: 10px;"></div>
        <span><strong>${color.wallKey}:</strong> ${color.colorName} (${color.colorCode})</span>
      </div>
    `).join('');

    // Email template for HomeGlazer
    const homeglazerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff; }
            .logo-section { text-align: center; padding: 20px; background-color: #ffffff; }
            .logo-section img { max-width: 150px; height: auto; display: block; margin: 0 auto; }
            .header { background-color: #299dd7; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #ED276E; }
            .value { margin-top: 5px; }
            .color-box { background-color: #fff; padding: 15px; border-radius: 5px; margin-top: 10px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background-color: #f9f9f9; }
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
              <h1>New Colour Visualizer Summary</h1>
            </div>
            <div class="content">
              <p>Dear HomeGlazer Team,</p>
              
              <p>A customer has submitted their colour visualization from the website. Here are the details:</p>
              
              <div class="field">
                <div class="label">Customer Name:</div>
                <div class="value">${clientName}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
              
              <div class="field">
                <div class="label">Room Type:</div>
                <div class="value">${roomType}</div>
              </div>
              <div class="field">
                <div class="label">Room Variant:</div>
                <div class="value">${formatRoomVariant(roomVariant)}</div>
              </div>
              <div class="field">
                <div class="label">Paint Brand:</div>
                <div class="value">${brand}</div>
              </div>
              <div class="field">
                <div class="label">Colours Applied (${colorSelections.length} walls):</div>
                <div class="color-box">
                  ${colorSummaryHtml}
                </div>
              </div>
              
              <p style="margin-top: 20px;">Please follow up with the customer at your earliest convenience.</p>
              
              <p>Best regards,<br>
              <strong>Home Glazer Website</strong></p>
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
              <p style="margin-top: 15px; font-size: 11px; color: #999;">Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email template for Customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff; }
            .logo-section { text-align: center; padding: 20px; background-color: #ffffff; }
            .logo-section img { max-width: 150px; height: auto; display: block; margin: 0 auto; }
            .header { background-color: #299dd7; color: white; padding: 30px; text-align: center; }
            .content { background-color: #ffffff; padding: 30px; }
            .color-box { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px; }
            .cta-section { background-color: #f0f0f0; padding: 30px 20px; text-align: center; }
            .cta-buttons { text-align: center; }
            .cta-button { display: inline-block; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; text-align: center; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background-color: #f9f9f9; }
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
              <h1>Your Colour Visualizer Summary</h1>
            </div>
            <div class="content">
              <p>Dear ${clientName},</p>
              
              <p>Thank you for using Home Glazer's Colour Visualizer! We've received your colour selection and here is your summary.</p>
              
              <p><strong>We've also attached your visualization as a PDF</strong> for your reference and to share with others.</p>
              
              <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
                <p style="margin: 5px 0;"><strong>Room:</strong> ${roomType} - ${formatRoomVariant(roomVariant)}</p>
                <p style="margin: 5px 0;"><strong>Paint Brand:</strong> ${brand}</p>
                <p style="margin: 5px 0;"><strong>Colours Applied:</strong> ${colorSelections.length} walls</p>
              </div>
              
              <div class="field">
                <div style="font-weight: bold; color: #ED276E; margin-bottom: 10px;">Your Colour Selections:</div>
                <div class="color-box">
                  ${colorSummaryHtml}
                </div>
              </div>
              
              <p style="margin-top: 20px;">Our team will be in touch shortly to help you bring this look to life!</p>
            </div>
            <div class="cta-section">
              <h3 style="margin-top: 0; color: #333;">Ready to Transform Your Space?</h3>
              <p style="color: #666; margin-bottom: 20px;">Contact us today to get started with your painting project.</p>
              <div class="cta-buttons">
                <a href="tel:+919717256514" class="cta-button" style="color: white !important; background-color: #ED276E;">Call Us: +91-9717256514</a>
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

    // Generate PDF
    let pdfBuffer: Buffer | null = null;
    try {
      pdfBuffer = await generateVisualizerEstimatePdf({
        clientName,
        email,
        phone,
        roomType,
        roomVariant,
        brand,
        colorSelections,
        previewImage,
      });
      console.log('PDF generated successfully, size:', pdfBuffer?.length);
    } catch (pdfError: any) {
      console.error('Error generating visualizer PDF:', pdfError);
      // Continue without PDF attachment
    }

    // Send email to HomeGlazer (Primary)
    let mainMailSent = false;
    try {
      const homeglazerMailOptions: nodemailer.SendMailOptions = {
        from: `"Home Glazer" <${gmailUser}>`,
        to: gmailUser,
        replyTo: email,
        subject: `New Colour Visualizer Summary - ${clientName}`,
        html: homeglazerEmailHtml,
      };

      // Attach logo and PDF to Home Glazer email
      const attachments: any[] = [
        {
          filename: 'home-glazer-logo.png',
          path: logoPath,
          cid: logoCid,
        },
      ];
      if (pdfBuffer) {
        attachments.push({
          filename: 'homeglazer-colour-visualizer-summary.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        });
      }
      homeglazerMailOptions.attachments = attachments;

      await transporter.sendMail(homeglazerMailOptions);
      mainMailSent = true;
      console.log('Main visualizer email sent successfully to', gmailUser);
    } catch (mainMailError) {
      console.error('Error sending main visualizer email:', mainMailError);
      throw mainMailError;
    }

    // Send confirmation to customer (Secondary)
    if (mainMailSent) {
      try {
        const customerMailOptions: nodemailer.SendMailOptions = {
          from: `"Home Glazer" <${gmailUser}>`,
          to: email,
          subject: 'Your Home Glazer Colour Visualizer Summary',
          html: customerEmailHtml,
        };

        // Attach logo and PDF to customer email
        const customerAttachments: any[] = [
          {
            filename: 'home-glazer-logo.png',
            path: logoPath,
            cid: logoCid,
          },
        ];
        if (pdfBuffer) {
          customerAttachments.push({
            filename: 'homeglazer-colour-visualizer-summary.pdf',
            content: pdfBuffer,
            contentType: 'application/pdf',
          });
        }
        customerMailOptions.attachments = customerAttachments;

        await transporter.sendMail(customerMailOptions);
        console.log('Confirmation email sent successfully to customer:', email);
      } catch (customerMailError) {
        console.error('Error sending customer confirmation email:', customerMailError);
        // Don't throw - primary email was sent
      }
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Final API Error:', error);
    return res.status(500).json({
      error: 'Failed to send email. Please try again later.',
      details: error.message,
    });
  }
}
