import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image-more';

export interface ColorSelection {
  wallKey: string;
  colorHex: string;
  colorName: string;
  colorCode: string;
}

export interface RoomData {
  roomType: string;
  roomVariant: string;
  brand: string;
  colorSelections: ColorSelection[];
  previewImageUrl?: string;
}

export interface PDFOptions {
  clientName?: string;
  dateOfDesign?: string;
}

export class PDFGenerator {
  private doc: jsPDF;
  private currentY: number = 20;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number = 20;
  private contentWidth: number;

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.contentWidth = this.pageWidth - (this.margin * 2);
  }

  private addNewPageIfNeeded(requiredHeight: number): void {
    if (this.currentY + requiredHeight > this.pageHeight - this.margin) {
      this.doc.addPage();
      this.currentY = this.margin;
    }
  }

  private addText(text: string, x: number, y: number, fontSize: number = 12, fontStyle: string = 'normal'): void {
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', fontStyle);
    this.doc.text(text, x, y);
  }

  private addCenteredText(text: string, y: number, fontSize: number = 12, fontStyle: string = 'normal'): void {
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', fontStyle);
    const textWidth = this.doc.getTextWidth(text);
    const x = (this.pageWidth - textWidth) / 2;
    this.doc.text(text, x, y);
  }

  private addSectionDivider(): void {
    this.currentY += 5;
    this.doc.setDrawColor(220, 220, 220);
    this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 10;
  }

  private async addLogo(): Promise<void> {
    try {
      // Try to add the actual Home Glazer logo
      const logoUrl = '/assets/images/home-glazer-logo-1.png';
      const logoWidth = 40;
      const logoHeight = 20;
      const logoX = (this.pageWidth - logoWidth) / 2;
      
      this.doc.addImage(logoUrl, 'PNG', logoX, this.currentY, logoWidth, logoHeight);
      this.currentY += logoHeight + 10;
      
      // Add tagline below logo
      this.addCenteredText('Transforming Spaces with Colour & Creativity', this.currentY, 12, 'italic');
      this.currentY += 15;
      
    } catch (error) {
      // Fallback to text logo if image fails
      this.addCenteredText('HOME GLAZER', this.currentY, 24, 'bold');
      this.currentY += 18;
      
      this.addCenteredText('Transforming Spaces with Colour & Creativity', this.currentY, 12, 'italic');
      this.currentY += 15;
    }
    
    // Add decorative line
    this.doc.setDrawColor(237, 39, 110); // Home Glazer brand color
    this.doc.setLineWidth(2);
    this.doc.line(this.margin + 20, this.currentY, this.pageWidth - this.margin - 20, this.currentY);
    this.doc.setLineWidth(0.2);
    this.currentY += 20;
  }

  private addHeaderInfo(clientName?: string, dateOfDesign?: string): void {
    if (clientName || dateOfDesign) {
      this.addNewPageIfNeeded(40);
      
      // Add header box
      this.doc.setFillColor(248, 250, 252);
      this.doc.rect(this.margin, this.currentY - 5, this.contentWidth, 30, 'F');
      this.doc.setDrawColor(226, 232, 240);
      this.doc.rect(this.margin, this.currentY - 5, this.contentWidth, 30, 'S');
      
      if (clientName) {
        this.addText(`Client Name: ${clientName}`, this.margin + 10, this.currentY + 5, 14, 'bold');
        this.currentY += 8;
      }
      
      if (dateOfDesign) {
        this.addText(`Date of Design: ${dateOfDesign}`, this.margin + 10, this.currentY + 5, 14, 'bold');
        this.currentY += 8;
      }
      
      this.currentY += 15;
    }
  }

  private addRoomPreview(imageUrl: string): void {
    this.addNewPageIfNeeded(100);
    
    // Add section title with background
    this.doc.setFillColor(41, 157, 215); // Home Glazer blue
    this.doc.rect(this.margin, this.currentY - 5, this.contentWidth, 12, 'F');
    this.addText('Room Preview', this.margin + 10, this.currentY + 2, 14, 'bold');
    this.doc.setTextColor(255, 255, 255);
    this.doc.text('Room Preview', this.margin + 10, this.currentY + 2);
    this.doc.setTextColor(0, 0, 0);
    this.currentY += 15;
    
    try {
      // Ensure imageUrl is valid and not empty
      if (!imageUrl || imageUrl === '') {
        throw new Error('No image URL provided');
      }
      
      // Use standard aspect ratio for room previews (16:9 is common)
      const maxWidth = this.contentWidth - 4;
      const maxHeight = 70;
      
      // Standard 16:9 aspect ratio for room images
      const aspectRatio = 16 / 9;
      let displayWidth = maxWidth;
      let displayHeight = maxWidth / aspectRatio;
      
      // Adjust if height exceeds maximum
      if (displayHeight > maxHeight) {
        displayHeight = maxHeight;
        displayWidth = maxHeight * aspectRatio;
      }
      
      // Center the image horizontally
      const imageX = this.margin + (this.contentWidth - displayWidth) / 2;
      
      // Add image with border - try multiple image formats
      this.doc.setDrawColor(226, 232, 240);
      this.doc.rect(imageX - 2, this.currentY, displayWidth + 4, displayHeight + 4, 'S');
      
      // Try to add image with proper error handling
      if (imageUrl.startsWith('data:image/')) {
        // Handle data URLs
        const format = imageUrl.includes('data:image/png') ? 'PNG' : 'JPEG';
        this.doc.addImage(imageUrl, format, imageX, this.currentY + 2, displayWidth, displayHeight);
      } else {
        // Handle regular URLs
        this.doc.addImage(imageUrl, 'JPEG', imageX, this.currentY + 2, displayWidth, displayHeight);
      }
      
      this.currentY += displayHeight + 10;
      
    } catch (error) {
      console.error('Error adding room preview image:', error);
      
      // Add a more informative placeholder
      this.doc.setFillColor(248, 250, 252);
      this.doc.rect(this.margin, this.currentY, this.contentWidth, 70, 'F');
      this.doc.setDrawColor(226, 232, 240);
      this.doc.rect(this.margin, this.currentY, this.contentWidth, 70, 'S');
      
      this.addCenteredText('Room preview image could not be loaded', this.currentY + 25, 12);
      this.addCenteredText('Please check the visualizer for the complete preview', this.currentY + 40, 10);
      
      this.currentY += 75;
    }
    
    this.currentY += 10;
  }

  private addRoomDetails(roomData: RoomData): void {
    this.addNewPageIfNeeded(80);
    
    // Add section title with background
    this.doc.setFillColor(41, 157, 215);
    this.doc.rect(this.margin, this.currentY - 5, this.contentWidth, 12, 'F');
    this.addText('Room Details', this.margin + 10, this.currentY + 2, 14, 'bold');
    this.doc.setTextColor(255, 255, 255);
    this.doc.text('Room Details', this.margin + 10, this.currentY + 2);
    this.doc.setTextColor(0, 0, 0);
    this.currentY += 15;
    
    // Room information box
    this.doc.setFillColor(248, 250, 252);
    this.doc.rect(this.margin, this.currentY, this.contentWidth, 40, 'F');
    this.doc.setDrawColor(226, 232, 240);
    this.doc.rect(this.margin, this.currentY, this.contentWidth, 40, 'S');
    
    // Room type and variant
    this.addText(`Room Type: ${roomData.roomType}`, this.margin + 10, this.currentY + 8, 12);
    this.currentY += 6;
    this.addText(`Room Variant: ${roomData.roomVariant}`, this.margin + 10, this.currentY + 8, 12);
    this.currentY += 6;
    this.addText(`Paint Brand: ${roomData.brand}`, this.margin + 10, this.currentY + 8, 12);
    this.currentY += 20;
    
    // Color selections
    this.addText('Color Selections:', this.margin, this.currentY, 14, 'bold');
    this.currentY += 8;
    
    roomData.colorSelections.forEach((selection, index) => {
      this.addNewPageIfNeeded(20);
      
      // Color selection box
      this.doc.setFillColor(255, 255, 255);
      this.doc.rect(this.margin, this.currentY - 2, this.contentWidth, 18, 'F');
      this.doc.setDrawColor(226, 232, 240);
      this.doc.rect(this.margin, this.currentY - 2, this.contentWidth, 18, 'S');
      
      // Color swatch and details
      const colorBoxSize = 10;
      try {
        // Convert hex to RGB for PDF
        const hex = selection.colorHex.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        this.doc.setFillColor(r, g, b);
      } catch (error) {
        this.doc.setFillColor(128, 128, 128); // Fallback to gray
      }
      
      this.doc.rect(this.margin + 5, this.currentY, colorBoxSize, colorBoxSize, 'F');
      this.doc.setDrawColor(0, 0, 0);
      this.doc.rect(this.margin + 5, this.currentY, colorBoxSize, colorBoxSize, 'S');
      
      this.addText(`${selection.wallKey}: ${selection.colorName} (${selection.colorCode})`, 
        this.margin + colorBoxSize + 10, this.currentY + 7, 11);
      this.currentY += 12;
    });
    
    this.currentY += 10;
  }

  private addMarketingMessage(): void {
    this.addNewPageIfNeeded(50);
    
    // Add marketing message box
    this.doc.setFillColor(255, 248, 220);
    this.doc.rect(this.margin, this.currentY, this.contentWidth, 40, 'F');
    this.doc.setDrawColor(254, 215, 170);
    this.doc.rect(this.margin, this.currentY, this.contentWidth, 40, 'S');
    
    this.addText('Your dream room is one step closer!', this.margin + 10, this.currentY + 8, 14, 'bold');
    this.currentY += 8;
    
    this.addText('For professional painting, colour consultations or full project execution,', this.margin + 10, this.currentY + 8, 11);
    this.currentY += 6;
    this.addText('contact Home Glazer and let\'s bring this vision to life.', this.margin + 10, this.currentY + 8, 11);
    this.currentY += 20;
  }

  private addContactInfo(): void {
    this.addNewPageIfNeeded(100);
    
    // Add section title with background
    this.doc.setFillColor(237, 39, 110); // Home Glazer pink
    this.doc.rect(this.margin, this.currentY - 5, this.contentWidth, 12, 'F');
    this.addText('Contact Home Glazer', this.margin + 10, this.currentY + 2, 14, 'bold');
    this.doc.setTextColor(255, 255, 255);
    this.doc.text('Contact Home Glazer', this.margin + 10, this.currentY + 2);
    this.doc.setTextColor(0, 0, 0);
    this.currentY += 15;
    
    // Contact details box
    this.doc.setFillColor(248, 250, 252);
    this.doc.rect(this.margin, this.currentY, this.contentWidth, 60, 'F');
    this.doc.setDrawColor(226, 232, 240);
    this.doc.rect(this.margin, this.currentY, this.contentWidth, 60, 'S');
    
    // General Company Contact Information
    this.addText('Office Address: B-474, Basement, Greenfeild Colony, Faridabad, Harayana - 121010', this.margin + 10, this.currentY + 8, 12);
    this.currentY += 8;
    this.addText('Telephone: +91-9717256514', this.margin + 10, this.currentY + 8, 12);
    this.currentY += 8;
    this.addText('Email: homeglazer@gmail.com', this.margin + 10, this.currentY + 8, 12);
    this.currentY += 8;
    this.addText('Website: www.homeglazer.com', this.margin + 10, this.currentY + 8, 12);
    this.currentY += 15;
    
    // Call to action - styled as a clickable link
    this.doc.setFillColor(237, 39, 110);
    this.doc.rect(this.margin, this.currentY, this.contentWidth, 15, 'F');
    this.addCenteredText('Contact us to get this look!', this.currentY + 10, 16, 'bold');
    this.doc.setTextColor(255, 255, 255);
    this.addCenteredText('Contact us to get this look!', this.currentY + 10, 16, 'bold');
    this.doc.setTextColor(0, 0, 0);
    this.currentY += 25;
  }

  private addLegalDisclaimer(): void {
    this.addNewPageIfNeeded(40);
    
    // Add disclaimer box
    this.doc.setFillColor(254, 242, 242);
    this.doc.rect(this.margin, this.currentY, this.contentWidth, 30, 'F');
    this.doc.setDrawColor(254, 202, 202);
    this.doc.rect(this.margin, this.currentY, this.contentWidth, 30, 'S');
    
    this.addText('Disclaimer:', this.margin + 10, this.currentY + 8, 12, 'bold');
    this.currentY += 6;
    this.addText('Actual colour shades may vary in real conditions. For final shade matching and expert advice,', this.margin + 10, this.currentY + 8, 10);
    this.currentY += 5;
    this.addText('book a consultation with Home Glazer.', this.margin + 10, this.currentY + 8, 10);
    this.currentY += 20;
  }

  private addFooter(): void {
    this.addNewPageIfNeeded(25);
    
    // Add footer line
    this.doc.setDrawColor(200, 200, 200);
    this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 5;
    
    // Add footer text
    this.addCenteredText('© 2025 Home Glazer. All Rights Reserved.', this.currentY, 10);
    this.currentY += 5;
    this.addCenteredText('Professional Painting & Colour Consultation Services', this.currentY, 10);
  }

  public async generatePDF(roomData: RoomData, options: PDFOptions = {}): Promise<void> {
    try {
      // Add logo and header
      await this.addLogo();
      
      // Add client info if provided
      this.addHeaderInfo(options.clientName, options.dateOfDesign);
      
      // Add room preview
      if (roomData.previewImageUrl) {
        console.log('Adding room preview with URL:', roomData.previewImageUrl.substring(0, 50) + '...');
        this.addRoomPreview(roomData.previewImageUrl);
      } else {
        console.warn('No preview image URL provided for room data');
      }
      
      // Add room details
      this.addRoomDetails(roomData);
      
      // Add marketing message
      this.addMarketingMessage();
      
      // Add contact information
      this.addContactInfo();
      
      // Add legal disclaimer
      this.addLegalDisclaimer();
      
      // Add footer
      this.addFooter();
      
      // Save the PDF
      const fileName = `homeglazer-${roomData.roomType.toLowerCase().replace(/\s+/g, '-')}-${roomData.roomVariant.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      this.doc.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }

  public async captureRoomPreview(element: HTMLElement): Promise<string> {
    try {
      // Ensure the element has consistent dimensions before capturing
      const originalStyles = {
        width: element.style.width,
        height: element.style.height,
        position: element.style.position
      };

      // Set fixed dimensions to ensure mask alignment
      element.style.width = '100%';
      element.style.height = '100%';
      element.style.position = 'relative';

      // Wait a moment for styles to apply and ensure element is ready
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Verify element dimensions
      if (element.offsetWidth === 0 || element.offsetHeight === 0) {
        throw new Error('Element has zero dimensions');
      }

      // Capture with specific settings for better mask alignment
      const dataUrl = await domtoimage.toPng(element, {
        quality: 0.95,
        bgcolor: '#ffffff',
        width: element.offsetWidth,
        height: element.offsetHeight,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: element.offsetWidth + 'px',
          height: element.offsetHeight + 'px'
        }
      });

      // Restore original styles
      element.style.width = originalStyles.width;
      element.style.height = originalStyles.height;
      element.style.position = originalStyles.position;

      // Verify the captured image
      if (!dataUrl || dataUrl === 'data:,' || dataUrl.length < 100) {
        throw new Error('Invalid image data captured');
      }

      console.log('Successfully captured room preview:', dataUrl.substring(0, 50) + '...');
      return dataUrl;
    } catch (error) {
      console.error('Error capturing room preview:', error);
      
      // Try fallback method with simpler settings
      try {
        console.log('Attempting fallback capture method...');
        const fallbackDataUrl = await domtoimage.toPng(element, {
          quality: 0.8,
          bgcolor: '#ffffff'
        });
        
        if (fallbackDataUrl && fallbackDataUrl !== 'data:,' && fallbackDataUrl.length > 100) {
          console.log('Fallback capture successful');
          return fallbackDataUrl;
        }
      } catch (fallbackError) {
        console.error('Fallback capture also failed:', fallbackError);
      }
      
      throw new Error('Failed to capture room preview');
    }
  }
}

export default PDFGenerator;
