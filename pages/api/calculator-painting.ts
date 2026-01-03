import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    const logoUrl = 'https://www.homeglazer.com/assets/images/home-glazer-logo-1.png';

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
              <h1>New Painting Estimate Request</h1>
            </div>
            <div class="content">
              <p>Dear HomeGlazer Team,</p>
              <p>A new painting estimate request has been received from the website calculator.</p>
              
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
                <h2 style="margin: 0;">Grand Total Estimate: ₹${formatIndianCurrency(grandTotal)}</h2>
              </div>
            </div>
            <div class="footer">
              <p><strong>Home Glazer</strong> - We Paint Your Imagination</p>
              <p>H-16/137 Sangam Vihar, New Delhi – 110080</p>
              <p>Email: homeglazer@gmail.com | Phone: +91-9717256514</p>
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
            .tagline { text-align: center; color: #666; font-style: italic; font-size: 14px; margin-top: 5px; }
            .header { background-color: #299dd7; color: white; padding: 30px; text-align: center; }
            .content { background-color: #ffffff; padding: 30px; }
            .total-box { background-color: #ED276E; color: white; padding: 20px; border-radius: 5px; text-align: center; margin-top: 20px; }
            .cta-section { background-color: #f0f0f0; padding: 30px 20px; text-align: center; }
            .cta-button { display: block; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; text-align: center; margin: 10px auto; max-width: 250px; }
            .cta-button.visualizer { background-color: #ED276E; }
            .cta-button.calculator { background-color: #299dd7; }
            .cta-button.wood { background-color: #8B4513; }
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
              <h1>Your Painting Estimate</h1>
            </div>
            <div class="content">
              <p>Dear ${fullName},</p>
              <p>Thank you for using Home Glazer's Paint Calculator! Here is the summary of your estimated costs.</p>
              
              ${summaryHtml}
              
              <div class="total-box">
                <h2 style="margin: 0;">Estimated Total: ₹${formatIndianCurrency(grandTotal)}</h2>
              </div>
            </div>
            <div class="cta-section">
              <h3 style="margin-top: 0; color: #333;">Explore Our Tools</h3>
              <a href="https://www.homeglazer.com/colour-visualiser" class="cta-button visualizer">Try Color Visualizer</a>
              <a href="https://www.homeglazer.com/wood-calculator" class="cta-button wood">Wood Polishing Calculator</a>
              <a href="https://www.homeglazer.com/paint-budget-calculator" class="cta-button calculator">Paint Budget Calculator</a>
            </div>
            <div class="footer">
              <p><strong>Home Glazer</strong> - We Paint Your Imagination</p>
              <p>H-16/137 Sangam Vihar, New Delhi – 110080</p>
              <p>Email: homeglazer@gmail.com | Phone: +91-9717256514</p>
              <div style="margin-top: 10px;">
                <a href="https://www.facebook.com/homeglazers/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 5px;">Facebook</a>
                <a href="https://in.linkedin.com/company/home-glazer" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 5px;">LinkedIn</a>
                <a href="https://www.instagram.com/homeglazer/" target="_blank" style="color: #299dd7; text-decoration: none; margin: 0 5px;">Instagram</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to HomeGlazer (Primary)
    let mainMailSent = false;
    try {
      await transporter.sendMail({
        from: `"Home Glazer" <${gmailUser}>`,
        to: gmailUser,
        replyTo: email,
        subject: `New Painting Estimate Request - ${fullName}`,
        html: homeglazerEmailHtml,
      });
      mainMailSent = true;
      console.log('Main estimate email sent successfully to', gmailUser);
    } catch (mainMailError) {
      console.error('Error sending main estimate email:', mainMailError);
      throw mainMailError; // Re-throw to be caught by the outer catch block
    }

    // Send confirmation to customer (Secondary)
    if (mainMailSent) {
      try {
        await transporter.sendMail({
          from: `"Home Glazer" <${gmailUser}>`,
          to: email,
          subject: 'Your Home Glazer Painting Estimate',
          html: customerEmailHtml,
        });
        console.log('Confirmation email sent successfully to customer:', email);
      } catch (customerMailError) {
        console.error('Error sending customer confirmation email:', customerMailError);
        // We don't throw here so the user still sees a success message 
        // because the primary email to the company was sent.
      }
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Final API Error:', error);
    return res.status(500).json({
      error: 'Failed to send email. Please try again later.',
      details: error.message
    });
  }
}
