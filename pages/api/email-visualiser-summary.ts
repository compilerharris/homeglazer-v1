import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import path from 'path';
import { generateVisualiserSummaryPdf } from '../../src/lib/visualiserSummaryPdf';

const LOGO_CID = 'homeglazer-logo@cid';

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const body = req.body || {};
    const fullName = (body.fullName || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || body.mobile || '').trim();
    const roomTypeLabel = (body.roomTypeLabel || '').trim();
    const roomVariantLabel = (body.roomVariantLabel || '').trim();
    const brandName = (body.brandName || '').trim();
    const colorSelections = Array.isArray(body.colorSelections) ? body.colorSelections : [];
    const previewImageBase64 = body.previewImageBase64 || '';
    const mainImagePath = body.mainImagePath || '';
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'ea0ce9'},body:JSON.stringify({sessionId:'ea0ce9',location:'email-visualiser-summary.ts:30',message:'Received email request',data:{hasPreviewImage:!!previewImageBase64,previewImageLength:previewImageBase64.length,previewImagePrefix:previewImageBase64.substring(0,50),hasMainImagePath:!!mainImagePath,mainImagePath},timestamp:Date.now(),runId:'pdf-debug',hypothesisId:'E'})}).catch(()=>{});
    // #endregion

    if (!fullName || !email || !phone) {
      return res.status(400).json({
        error: 'Please fill in all fields: Name, Email, and Mobile are required.',
      });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    if (!roomTypeLabel || !brandName) {
      return res.status(400).json({
        error: 'Visualisation data is missing. Please try again from the visualiser page.',
      });
    }

    const gmailUser = process.env.GMAIL_USER || 'homeglazer@gmail.com';
    const gmailAppPassword = (process.env.GMAIL_APP_PASSWORD || '').trim().replace(/\s+/g, '');

    if (!gmailAppPassword) {
      console.error('GMAIL_APP_PASSWORD is not set');
      return res.status(500).json({
        error: 'Email service is temporarily unavailable. Please try again later or contact us.',
      });
    }

    // Validate App Password length (should be 16 characters)
    if (gmailAppPassword.length !== 16) {
      console.error('GMAIL_APP_PASSWORD invalid:', {
        length: gmailAppPassword.length,
        hasValue: !!gmailAppPassword,
      });
      return res.status(500).json({
        error: 'Email service is temporarily unavailable. Please try again later or contact us.',
      });
    }

    // Helper function to create transporter
    const createTransporter = (port: number, secure: boolean) => {
      return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port,
        secure,
        auth: { user: gmailUser, pass: gmailAppPassword },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 15000,
      });
    };

    // Try port 587 first, then 465 as fallback
    let transporter = createTransporter(587, false);
    let verifyError: unknown = null;

    try {
      await transporter.verify();
    } catch (err) {
      verifyError = err;
      console.error('Port 587 verification failed:', {
        message: err instanceof Error ? err.message : String(err),
        code: (err as any)?.code,
        command: (err as any)?.command,
      });

      // Try port 465 as fallback
      try {
        transporter = createTransporter(465, true);
        await transporter.verify();
        console.log('Port 465 verification succeeded');
      } catch (err2) {
        console.error('Port 465 verification also failed:', {
          message: err2 instanceof Error ? err2.message : String(err2),
          code: (err2 as any)?.code,
        });
        return res.status(500).json({
          error: 'Email service is temporarily unavailable. Please try again later or contact us.',
          // Include error details in development
          ...(process.env.NODE_ENV !== 'production' && {
            debug: {
              port587: err instanceof Error ? err.message : String(err),
              port465: err2 instanceof Error ? err2.message : String(err2),
            },
          }),
        });
      }
    }

    const logoPath = path.join(process.cwd(), 'public', 'assets', 'images', 'home-glazer-logo-1.png');
    const logoUrl = `cid:${LOGO_CID}`;

    const colorRowsHtml = colorSelections
      .map(
        (s: { wallLabel?: string; colorName?: string; colorCode?: string }) =>
          `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee;">${s.wallLabel || '-'}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;">${s.colorName || '-'}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;">${s.colorCode || '-'}</td></tr>`
      )
      .join('');

    const summaryTableHtml =
      colorSelections.length > 0
        ? `
      <div class="field">
        <div class="label" style="font-weight: bold; color: #ED276E; margin-bottom: 8px; font-size: 16px;">Colours applied</div>
        <div class="value">
          <table style="width:100%; border-collapse: collapse;">
            <thead><tr style="background:#f0f0f0;"><th style="padding:8px 10px;text-align:left;">Surface</th><th style="padding:8px 10px;text-align:left;">Colour name</th><th style="padding:8px 10px;text-align:left;">Code</th></tr></thead>
            <tbody>${colorRowsHtml}</tbody>
          </table>
        </div>
      </div>`
        : '';

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
            .tagline { text-align: center; color: #666; font-style: italic; font-size: 14px; margin-top: 5px; }
            .header { background-color: #299dd7; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #ED276E; }
            .value { margin-top: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo-section">
              <img src="${logoUrl}" alt="Home Glazer Logo" />
              <div class="tagline">We Paint Your Imagination</div>
            </div>
            <div class="header">
              <h1>New Colour Visualiser Summary Received</h1>
            </div>
            <div class="content">
              <p>A customer has shared their colour visualiser summary.</p>
              <div class="field">
                <div class="label">Customer name</div>
                <div class="value">${fullName}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              <div class="field">
                <div class="label">Room type</div>
                <div class="value">${roomTypeLabel}</div>
              </div>
              <div class="field">
                <div class="label">Room variant</div>
                <div class="value">${roomVariantLabel}</div>
              </div>
              <div class="field">
                <div class="label">Paint brand</div>
                <div class="value">${brandName}</div>
              </div>
              ${summaryTableHtml}
              <p style="margin-top: 20px;">The full summary and room preview are attached as a PDF.</p>
            </div>
            <div class="footer">
              <p style="margin: 0;">Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          </div>
        </body>
      </html>
    `;

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
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo-section">
              <img src="${logoUrl}" alt="Home Glazer Logo" />
            </div>
            <div class="header">
              <h1>Your Visualiser Summary</h1>
            </div>
            <div class="content">
              <p>Dear ${fullName},</p>
              <p>Thank you for using Home Glazer's Colour Visualiser. Your summary is attached to this email as a PDF.</p>
              <p>We've also received a copy and will be happy to help you bring this look to life. Contact us anytime.</p>
              <p>Best regards,<br><strong>Home Glazer</strong></p>
            </div>
            <div class="footer">
              <p style="margin: 0 0 10px 0;"><strong>Home Glazer</strong> – We Paint Your Imagination</p>
              <p style="margin: 0;">B-474, Basement, Greenfield Colony, Faridabad, Haryana - 121010</p>
              <p style="margin: 0;">Email: homeglazer@gmail.com | Phone: +91-9717256514</p>
            </div>
          </div>
        </body>
      </html>
    `;

    let pdfBuffer: Buffer | null = null;
    try {
      pdfBuffer = await generateVisualiserSummaryPdf({
        fullName,
        email,
        phone,
        roomTypeLabel,
        roomVariantLabel,
        brandName,
        colorSelections,
        previewImageBase64,
        mainImagePath,
      });
    } catch (pdfError: unknown) {
      console.error('Error generating visualiser summary PDF:', pdfError);
    }

    const hasValidPdf = pdfBuffer && pdfBuffer.length > 500;
    const pdfForCustomer = hasValidPdf ? Buffer.from(pdfBuffer!) : null;

    if (!hasValidPdf) {
      console.error('Visualiser summary PDF missing or empty – not sending customer email');
      return res.status(500).json({
        error: "We couldn't generate your summary PDF. Please try again.",
      });
    }

    const homeglazerAttachments: nodemailer.SendMailOptions['attachments'] = [
      { filename: 'home-glazer-logo.png', path: logoPath, cid: LOGO_CID },
      {
        filename: 'homeglazer-visualiser-summary.pdf',
        content: pdfBuffer!,
        contentType: 'application/pdf',
      },
    ];

    try {
      await transporter.sendMail({
        from: `"Home Glazer" <${gmailUser}>`,
        to: gmailUser,
        replyTo: email,
        subject: `New Colour Visualiser Summary – ${fullName}`,
        html: homeglazerEmailHtml,
        attachments: homeglazerAttachments,
      });
    } catch (sendError) {
      console.error('Error sending email to HomeGlazer:', sendError);
      return res.status(500).json({
        error: 'Failed to send. Please try again.',
      });
    }

    const customerAttachments: nodemailer.SendMailOptions['attachments'] = [
      { filename: 'home-glazer-logo.png', path: logoPath, cid: LOGO_CID },
      {
        filename: 'homeglazer-visualiser-summary.pdf',
        content: pdfForCustomer!,
        contentType: 'application/pdf',
      },
    ];

    const customerTextBody =
      `Dear ${fullName},\n\n` +
      `Thank you for using Home Glazer's Colour Visualiser. Your summary is attached to this email as a PDF.\n\n` +
      `We've also received a copy and will be happy to help you bring this look to life. Contact us anytime.\n\n` +
      `Best regards,\nHome Glazer\n\n` +
      `--\nHome Glazer – We Paint Your Imagination\nB-474, Basement, Greenfield Colony, Faridabad, Haryana - 121010\nEmail: homeglazer@gmail.com | Phone: +91-9717256514`;

    try {
      await transporter.sendMail({
        from: `"Home Glazer" <${gmailUser}>`,
        to: email,
        subject: 'Your Home Glazer Visualiser Summary',
        text: customerTextBody,
        html: customerEmailHtml,
        attachments: customerAttachments,
      });
    } catch (customerMailError) {
      console.error('Error sending customer confirmation email:', customerMailError);
    }

    return res.status(200).json({ success: true });
  } catch (error: unknown) {
    console.error('Email visualiser summary API error:', error);
    return res.status(500).json({
      error: 'Failed to send email. Please try again later.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
