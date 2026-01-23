import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { calculateWoodPolishingEstimate, formatIndianCurrency } from '../../src/lib/calculator-utils';
import { generateWoodPolishingEstimatePdf } from '../../src/lib/woodPolishingEstimatePdf';

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

        // Use local logo file for email (embedded as CID attachment)
        const logoPath = path.join(process.cwd(), 'public', 'assets', 'images', 'home-glazer-logo-1.png');
        const logoCid = 'homeglazer-logo@cid';
        const logoUrl = `cid:${logoCid}`; // CID reference for email

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
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
                                <tr>
                                    <td align="center" bgcolor="#ffffff" style="background-color: #ffffff; padding: 15px; border-radius: 8px;">
                                        <img src="${logoUrl}" alt="Home Glazer Logo" style="display: block; border: 0; outline: none; text-decoration: none; background-color: #ffffff;" />
                                    </td>
                                </tr>
                            </table>
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
                        <div class="footer" style="text-align: center; padding: 20px; color: #666; font-size: 12px; background-color: #f9f9f9; clear: both; display: block; width: 100%; overflow: visible;">
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
                        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; background-color: #f9f9f9; clear: both; display: block; width: 100%; overflow: visible; }
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
                            <h1>Your Wood Polishing Estimate</h1>
                        </div>
                        <div class="content">
                            <p>Dear ${fullName},</p>
                            
                            <p>Thank you for using Home Glazer's Wood Polishing Calculator! We've received your calculation and here is the summary of your estimated costs.</p>
                            
                            <p>We've also attached this estimate as a PDF for your reference and to share with others.</p>
                            
                            ${summaryHtml}
                            
                            <div class="total-box">
                                <h2 style="margin: 0;">Estimated Total: ₹${formattedEstimate}</h2>
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

        // Generate PDF attachment for customer email
        let pdfBuffer: Buffer | null = null;
        try {
            pdfBuffer = await generateWoodPolishingEstimatePdf({
                fullName,
                email,
                phone,
                location,
                serviceType,
                inputMethod,
                area,
                itemCounts,
                selectedWoodFinishType,
                selectedWoodFinishBrand,
                selectedWoodFinish,
                grandTotalFormatted: formattedEstimate,
                summaryHtml,
            });
        } catch (pdfError: any) {
            console.error('Error generating wood polishing estimate PDF:', pdfError);
            // Continue without PDF attachment
        }

        // Send primary email to HomeGlazer
        let mainMailSent = false;
        try {
            const homeglazerMailOptions: nodemailer.SendMailOptions = {
                from: `"Home Glazer" <${process.env.GMAIL_USER}>`,
                to: process.env.GMAIL_USER,
                replyTo: email,
                subject: `New Wood Polishing Estimate Request - ${fullName}`,
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
                    filename: 'homeglazer-wood-polishing-estimate.pdf',
                    content: pdfBuffer,
                    contentType: 'application/pdf',
                });
            }
            homeglazerMailOptions.attachments = attachments;

            await transporter.sendMail(homeglazerMailOptions);
            mainMailSent = true;
            console.log('Main wood polishing estimate email sent successfully to', process.env.GMAIL_USER);
        } catch (mainMailError) {
            console.error('Error sending main wood polishing estimate email:', mainMailError);
            return res.status(500).json({ error: 'Failed to notify HomeGlazer team' });
        }

        // Send secondary email to customer
        if (mainMailSent && email) {
            try {
                const customerMailOptions: nodemailer.SendMailOptions = {
                    from: `"Home Glazer" <${process.env.GMAIL_USER}>`,
                    to: email,
                    subject: 'Your Home Glazer Wood Polishing Estimate',
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
                        filename: 'homeglazer-wood-polishing-estimate.pdf',
                        content: pdfBuffer,
                        contentType: 'application/pdf',
                    });
                }
                customerMailOptions.attachments = customerAttachments;

                await transporter.sendMail(customerMailOptions);
                console.log('Confirmation email sent successfully to customer:', email);
            } catch (customerMailError) {
                console.error('Error sending customer wood polishing confirmation email:', customerMailError);
                // We don't throw here so the user still sees a success message 
                // because the primary email to the company was sent.
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
