import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { calculateWoodPolishingEstimate, formatIndianCurrency } from '../../src/lib/calculator-utils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const {
            fullName,
            email,
            phone,
            serviceType,
            location,
            inputMethod,
            area,
            itemCounts,
            selectedWoodFinishType,
            selectedWoodFinishBrand,
            selectedWoodFinish,
            woodPolishingTotalEstimate
        } = req.body;

        const logoUrl = 'https://www.homeglazer.com/assets/images/home-glazer-logo-1.png';

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000,
        });

        // Verify connection configuration
        try {
            await transporter.verify();
        } catch (verifyError) {
            console.error('Nodemailer verification failed:', verifyError);
            return res.status(500).json({ error: 'Email service configuration error' });
        }

        const formattedEstimate = formatIndianCurrency(woodPolishingTotalEstimate);

        const generateWoodPolishingDetails = () => {
            let details = '';
            if (inputMethod === 'area') {
                details += `<p style="margin: 5px 0;"><strong>Total Area:</strong> ${area} sq.ft</p>`;
            } else {
                if (itemCounts.doors > 0) details += `<p style="margin: 5px 0;"><strong>No. of Doors:</strong> ${itemCounts.doors} (${itemCounts.doors * 65} sq.ft)</p>`;
                if (itemCounts.windows > 0) details += `<p style="margin: 5px 0;"><strong>No. of Windows:</strong> ${itemCounts.windows} (${itemCounts.windows * 30} sq.ft)</p>`;
                if (itemCounts.wallPanels > 0) details += `<p style="margin: 5px 0;"><strong>No. of Wall Panels & Wardrobes:</strong> ${itemCounts.wallPanels} (${itemCounts.wallPanels * 80} sq.ft)</p>`;
                if (itemCounts.furnitureArea > 0) details += `<p style="margin: 5px 0;"><strong>Furniture Area:</strong> ${itemCounts.furnitureArea} sq.ft</p>`;
            }
            details += `<p style="margin: 5px 0;"><strong>Finish:</strong> ${selectedWoodFinish.name} (${selectedWoodFinishBrand})</p>`;
            return details;
        };

        const summaryHtml = `
            <div class="field" style="margin-bottom: 15px;">
                <div class="label" style="font-weight: bold; color: #ED276E; margin-bottom: 8px; font-size: 16px;">Wood Polishing Details</div>
                <div class="value">
                    <p style="margin: 5px 0;"><strong>Input Method:</strong> ${inputMethod === 'area' ? 'Direct Area' : 'Item Count'}</p>
                    ${generateWoodPolishingDetails()}
                    <p style="margin: 10px 0 5px 0; font-weight: bold; color: #ED276E;">Wood Polishing Total: ₹${formattedEstimate}</p>
                </div>
            </div>
        `;

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
                            <h1 style="color: white; margin: 0;">New Wood Polishing Estimate Request</h1>
                        </div>
                        <div class="content">
                            <p>Dear HomeGlazer Team,</p>
                            <p>A new wood polishing estimate request has been received from the website calculator.</p>
                            
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
                            
                            ${summaryHtml}
                            
                            <div class="total-box">
                                <h2 style="margin: 0;">Grand Total Estimate: ₹${formattedEstimate}</h2>
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
                        .field { margin-bottom: 15px; }
                        .label { font-weight: bold; color: #ED276E; }
                        .value { margin-top: 5px; }
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
                            <h1 style="color: white; margin: 0;">Your Wood Polishing Estimate</h1>
                        </div>
                        <div class="content">
                            <p>Dear ${fullName},</p>
                            <p>Thank you for using Home Glazer's Wood Polishing Calculator! Here is the summary of your estimated costs.</p>
                            
                            ${summaryHtml}
                            
                            <div class="total-box">
                                <h2 style="margin: 0;">Estimated Total: ₹${formattedEstimate}</h2>
                            </div>
                        </div>
                        <div class="cta-section">
                            <h3 style="margin-top: 0; color: #333;">Explore Our Tools</h3>
                            <a href="https://www.homeglazer.com/colour-visualiser" class="cta-button visualizer">Try Color Visualizer</a>
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

        // Send primary email to HomeGlazer
        try {
            await transporter.sendMail({
                from: `"Home Glazer" <${process.env.GMAIL_USER}>`,
                to: process.env.GMAIL_USER,
                replyTo: email,
                subject: `New Wood Polishing Estimate Request - ${fullName}`,
                html: homeglazerEmailHtml,
            });
        } catch (primaryError) {
            console.error('Failed to send primary wood polishing email:', primaryError);
            return res.status(500).json({ error: 'Failed to notify HomeGlazer team' });
        }

        // Send secondary email to customer
        if (email) {
            try {
                await transporter.sendMail({
                    from: `"Home Glazer" <${process.env.GMAIL_USER}>`,
                    to: email,
                    subject: 'Your Home Glazer Wood Polishing Estimate',
                    html: customerEmailHtml,
                });
            } catch (customerError) {
                console.error('Failed to send customer wood polishing confirmation:', customerError);
            }
        }

        return res.status(200).json({ success: true, message: 'Estimates sent successfully' });
    } catch (error) {
        console.error('Wood polishing calculator API error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
