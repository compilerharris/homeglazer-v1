import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import {
  calculateInteriorPrice,
  calculateCeilingPrice,
  calculateExteriorPrice,
  calculateRoofPrice,
  formatIndianCurrency,
  getDisplayArea,
  getPaintName,
  getBrandName
} from '../../src/lib/calculator-utils';
import { generatePaintingEstimatePdf } from '../../src/lib/paintingEstimatePdf';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/874e2949-a1fd-446f-87e0-e88cc166ea30',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'calculator-painting.ts:18',message:'Handler called',data:{method:req.method},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const {
      fullName,
      email,
      phone,
      serviceType,
      location,
      selectedPaintingType,
      workType,
      area,
      areaTypes,
      paintCategory,
      paintBrand,
      paintType,
      roofWorkType,
      roofArea,
      roofAreaTypes,
      roofPaintCategory,
      roofPaintBrand,
      roofPaintType,
      exteriorPaintCategory,
      exteriorPaintBrand,
      exteriorPaintType,
      samePaintForCeiling,
      ceilingPaintCategory,
      ceilingPaintBrand,
      ceilingPaintType
    } = req.body;

    // Logo URL
    // Use local logo file for email (embedded as CID attachment)
    const logoPath = path.join(process.cwd(), 'public', 'assets', 'images', 'home-glazer-logo-1.png');
    const logoCid = 'homeglazer-logo@cid';
    const logoUrl = `cid:${logoCid}`; // CID reference for email

    // Calculate costs on server side to ensure accuracy
    let interiorTotal = 0;
    let exteriorTotal = 0;
    let summaryHtml = '';

    if (selectedPaintingType === 'interior' || selectedPaintingType === 'both') {
      const wallCost = calculateInteriorPrice(area, paintType, areaTypes, samePaintForCeiling);
      let ceilingCost = 0;

      if (samePaintForCeiling && ceilingPaintType) {
        ceilingCost = calculateCeilingPrice(area, ceilingPaintType, areaTypes);
      }

      interiorTotal = wallCost + ceilingCost;

      summaryHtml += `
        <div class="field">
          <div class="label" style="font-weight: bold; color: #ED276E; margin-bottom: 8px; font-size: 16px;">Interior Painting Details</div>
          <div class="value">
            <p style="margin: 5px 0;"><strong>Work Type:</strong> ${workType === 'fresh' ? 'Fresh Painting' : 'Repainting'}</p>
            <p style="margin: 5px 0;"><strong>Area:</strong> ${area} sq.ft</p>
            <p style="margin: 5px 0;"><strong>Wall Paint:</strong> ${getBrandName(paintBrand)} - ${getPaintName(paintCategory, paintBrand, paintType)}</p>
            <p style="margin: 5px 0;"><strong>Wall Paint Cost:</strong> ₹${formatIndianCurrency(wallCost)}</p>
            ${samePaintForCeiling && ceilingPaintType ? `
              <p style="margin: 5px 0;"><strong>Ceiling Paint:</strong> ${getBrandName(ceilingPaintBrand)} - ${getPaintName(ceilingPaintCategory, ceilingPaintBrand, ceilingPaintType)}</p>
              <p style="margin: 5px 0;"><strong>Ceiling Paint Cost:</strong> ₹${formatIndianCurrency(ceilingCost)}</p>
            ` : ''}
            <p style="margin: 10px 0 5px 0; font-weight: bold; color: #ED276E;">Interior Total: ₹${formatIndianCurrency(interiorTotal)}</p>
          </div>
        </div>
      `;
    }

    if (selectedPaintingType === 'exterior' || selectedPaintingType === 'both') {
      const wallCost = calculateExteriorPrice(area, exteriorPaintType);
      let roofCost = 0;

      if (roofPaintType) {
        roofCost = calculateRoofPrice(roofArea, roofPaintType);
      }

      exteriorTotal = wallCost + roofCost;

      summaryHtml += `
        <div class="field">
          <div class="label" style="font-weight: bold; color: #ED276E; margin-bottom: 8px; font-size: 16px;">Exterior Painting Details</div>
          <div class="value">
            <p style="margin: 5px 0;"><strong>Work Type:</strong> ${roofWorkType === 'fresh' ? 'Fresh Painting' : 'Repainting'}</p>
            <p style="margin: 5px 0;"><strong>Area:</strong> ${area} sq.ft</p>
            <p style="margin: 5px 0;"><strong>Wall Paint:</strong> ${getBrandName(exteriorPaintBrand)} - ${getPaintName(exteriorPaintCategory, exteriorPaintBrand, exteriorPaintType)}</p>
            <p style="margin: 5px 0;"><strong>Wall Paint Cost:</strong> ₹${formatIndianCurrency(wallCost)}</p>
            ${roofPaintType ? `
              <p style="margin: 5px 0;"><strong>Roof Area:</strong> ${roofArea} sq.ft</p>
              <p style="margin: 5px 0;"><strong>Roof Paint:</strong> ${getBrandName(roofPaintBrand)} - ${getPaintName(roofPaintCategory, roofPaintBrand, roofPaintType)}</p>
              <p style="margin: 5px 0;"><strong>Roof Paint Cost:</strong> ₹${formatIndianCurrency(roofCost)}</p>
            ` : ''}
            <p style="margin: 10px 0 5px 0; font-weight: bold; color: #ED276E;">Exterior Total: ₹${formatIndianCurrency(exteriorTotal)}</p>
          </div>
        </div>
      `;
    }

    const grandTotal = interiorTotal + exteriorTotal;
    const grandTotalFormatted = formatIndianCurrency(grandTotal);

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
      // Increase timeouts for stability
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
            .tagline { text-align: center; color: #666; font-style: italic; font-size: 14px; margin-top: 5px; }
            .header { background-color: #299dd7; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #ED276E; }
            .value { margin-top: 5px; }
            .total-box { background-color: #ED276E; color: white; padding: 20px; border-radius: 5px; text-align: center; margin-top: 20px; }
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
              <h1>New Paint Calculator Summary Received</h1>
            </div>
            <div class="content">
              <p>Dear HomeGlazer Team,</p>
              
              <p>I am writing to share my painting calculation from your calculator. I would like to get an estimate for my project based on the following details:</p>
              
              <div class="field">
                <div class="label">Customer Name:</div>
                <div class="value">${fullName}</div>
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
                <div class="label">Location:</div>
                <div class="value">${location}</div>
              </div>
              ${serviceType ? `
              <div class="field">
                <div class="label">Service Type:</div>
                <div class="value">${serviceType}</div>
              </div>
              ` : ''}
              
              ${summaryHtml}
              
              <div class="total-box">
                <h2 style="margin: 0;">Grand Total Estimate: ₹${grandTotalFormatted}</h2>
              </div>
              
              <p style="margin-top: 20px;">I look forward to hearing from you soon.</p>
              
              <p>Best regards,<br>
              <strong>${fullName}</strong></p>
            </div>
            <div class="footer" style="text-align: center; padding: 20px; color: #666; font-size: 12px; background-color: #f9f9f9;">
              <p style="margin: 0 0 10px 0;"><strong>Home Glazer</strong> - We Paint Your Imagination</p>
              <p style="margin: 0 0 10px 0;">B-474, Basement, Greenfield Colony, Faridabad, Haryana - 121010</p>
              <p style="margin: 0 0 15px 0;">Email: <a href="mailto:homeglazer@gmail.com" style="color: #299dd7; text-decoration: none;">homeglazer@gmail.com</a> | Phone: <a href="tel:+919717256514" style="color: #299dd7; text-decoration: none;">+91-9717256514</a></p>
              <p style="margin: 0 0 15px 0;">
                <a href="https://www.facebook.com/homeglazers/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px;">Facebook</a> |
                <a href="https://in.linkedin.com/company/home-glazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px;">LinkedIn</a> |
                <a href="https://www.instagram.com/homeglazer/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px;">Instagram</a> |
                <a href="https://www.quora.com/profile/Home-Glazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px;">Quora</a> |
                <a href="https://in.pinterest.com/homeglazer/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px;">Pinterest</a> |
                <a href="https://twitter.com/homeglazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px;">Twitter</a>
              </p>
              <p style="margin-top: 15px; font-size: 11px; color: #999;">This estimate was submitted through the Home Glazer website paint calculator.</p>
              <p style="font-size: 11px; color: #999; margin: 5px 0 0 0;">Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
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
            .logo-wrapper { display: inline-block; }
            .logo-section img { max-width: 150px; height: auto; display: block; margin: 0 auto; }
            .generated-date { text-align: center; color: #666; font-size: 12px; margin-top: 10px; }
            .header { background-color: #299dd7; color: white; padding: 30px; text-align: center; }
            .content { background-color: #ffffff; padding: 30px; }
            .total-box { background-color: #ED276E; color: white; padding: 20px; border-radius: 5px; text-align: center; margin-top: 20px; }
            .cta-section { background-color: #f0f0f0; padding: 30px 20px; text-align: center; }
            .cta-buttons { text-align: center; }
            .cta-button { display: inline-block; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; text-align: center; }
            .cta-button.visualizer { background-color: #ED276E; }
            .cta-button.visualizer:hover { background-color: #d51e5f; }
            .cta-button.calculator { background-color: #299dd7; }
            .cta-button.calculator:hover { background-color: #237bb0; }
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
              <h1>Your Paint Calculator Summary</h1>
            </div>
            <div class="content">
              <p>Dear ${fullName},</p>
              
              <p>Thank you for using Home Glazer's Paint Calculator! We've received your calculation and here is the summary of your estimated costs.</p>
              
              <p>We've also attached this estimate as a PDF for your reference and to share with others.</p>
              
              ${summaryHtml}
              
              <div class="total-box">
                <h2 style="margin: 0;">Estimated Total: ₹${grandTotalFormatted}</h2>
              </div>
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
                <a href="https://twitter.com/homeglazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 4px; display: inline-block;">Twitter</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Optionally generate PDF attachment for customer email
    // #region agent log
    setImmediate(() => { fetch('http://127.0.0.1:7242/ingest/874e2949-a1fd-446f-87e0-e88cc166ea30',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'calculator-painting.ts:313',message:'About to generate PDF',data:{summaryHtmlLength:summaryHtml.length,hasRupeeInHtml:summaryHtml.includes('₹'),grandTotalFormatted},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{}); });
    // #endregion
    let pdfBuffer: Buffer | null = null;
    try {
      pdfBuffer = await generatePaintingEstimatePdf({
        fullName,
        email,
        phone,
        location,
        serviceType,
        selectedPaintingType,
        grandTotalFormatted,
        summaryHtml,
      });
      // #region agent log
      setImmediate(() => { fetch('http://127.0.0.1:7242/ingest/874e2949-a1fd-446f-87e0-e88cc166ea30',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'calculator-painting.ts:326',message:'PDF generated successfully',data:{pdfBufferSize:pdfBuffer?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{}); });
      // #endregion
    } catch (pdfError: any) {
      // #region agent log
      setImmediate(() => { fetch('http://127.0.0.1:7242/ingest/874e2949-a1fd-446f-87e0-e88cc166ea30',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'calculator-painting.ts:328',message:'PDF generation error',data:{error:pdfError?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{}); });
      // #endregion
      console.error('Error generating painting estimate PDF:', pdfError);
      // Continue without PDF attachment
    }

    // Send email to HomeGlazer (Primary)
    let mainMailSent = false;
    try {
      const homeglazerMailOptions: nodemailer.SendMailOptions = {
        from: `"Home Glazer" <${gmailUser}>`,
        to: gmailUser,
        replyTo: email,
        subject: `New Painting Estimate Request - ${fullName}`,
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
          filename: 'homeglazer-paint-estimate.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        });
      }
      homeglazerMailOptions.attachments = attachments;

      await transporter.sendMail(homeglazerMailOptions);
      mainMailSent = true;
      console.log('Main estimate email sent successfully to', gmailUser);
    } catch (mainMailError) {
      console.error('Error sending main estimate email:', mainMailError);
      throw mainMailError; // Re-throw to be caught by the outer catch block
    }

    // Send confirmation to customer (Secondary)
    if (mainMailSent) {
      try {
        const customerMailOptions: nodemailer.SendMailOptions = {
          from: `"Home Glazer" <${gmailUser}>`,
          to: email,
          subject: 'Your Home Glazer Painting Estimate',
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
            filename: 'homeglazer-paint-estimate.pdf',
            content: pdfBuffer,
            contentType: 'application/pdf',
          });
        }
        customerMailOptions.attachments = customerAttachments;

        await transporter.sendMail(customerMailOptions);
        console.log('Confirmation email sent successfully to customer:', email);
      } catch (customerMailError) {
        console.error('Error sending customer confirmation email:', customerMailError);
        // We don't throw here so the user still sees a success message 
        // because the primary email to the company was sent.
      }
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/874e2949-a1fd-446f-87e0-e88cc166ea30',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'calculator-painting.ts:423',message:'API Error caught',data:{error:error?.message,stack:error?.stack,errorType:error?.constructor?.name},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    console.error('Final API Error:', error);
    return res.status(500).json({
      error: 'Failed to send email. Please try again later.',
      details: error.message
    });
  }
}
