# Server-Side Protection Implementation

## 🛡️ Overview

This implementation moves critical HTML generation and business logic to the server-side, making it significantly harder for developers to access your core visualizer algorithms and SVG data. The client receives only processed HTML, while all sensitive logic remains on the server.

## 🏗️ Architecture

```
Client Side                 Server Side (Protected)
┌─────────────────┐        ┌─────────────────────────┐
│ User Interface  │───────▶│ API Routes              │
│ Color Selection │        │ - /api/visualizer/*     │
│ Room Selection  │        │                         │
└─────────────────┘        │ Protected Data:         │
         │                 │ - SVG Paths             │
         ▼                 │ - Room Configurations   │
┌─────────────────┐        │ - Color Algorithms      │
│ Rendered HTML   │◀───────│ - Component Rendering   │
│ (from server)   │        │ - Business Logic        │
└─────────────────┘        └─────────────────────────┘
```

## 📁 Files Structure

### API Routes (Server-Side Only)
- **`pages/api/visualizer/room-data.ts`** - Protected room SVG paths and configurations
- **`pages/api/visualizer/render-component.ts`** - Server-side component rendering
- **`pages/api/visualizer/color-processing.ts`** - Advanced color algorithms and analysis

### Components
- **`src/components/visualizer/ProtectedVisualizer.tsx`** - Client-side wrapper for server-rendered content
- **`pages/protected-visualizer-demo.tsx`** - Demo page showing the protected system

### Configuration
- **`env.local.example`** - Environment variables template
- **`obfuscation-config.json`** - Enhanced obfuscation settings
- **`scripts/obfuscate.js`** - Updated to include protected components

## 🔒 Security Features

### 1. Server-Side Data Protection
✅ **SVG Paths Hidden** - All room SVG paths stored server-side only
✅ **Room Configurations Protected** - Wall masks and image paths not exposed
✅ **Color Processing Hidden** - Advanced algorithms run server-side
✅ **Component Rendering Server-Side** - HTML generated on server

### 2. API Security
✅ **JWT Token Authentication** - Time-limited access tokens
✅ **Request Validation** - Input sanitization and validation
✅ **Rate Limiting Ready** - Structure for implementing rate limits
✅ **Error Handling** - Secure error responses without exposing internals

### 3. Data Encryption
✅ **Optional Encryption** - Sensitive data can be encrypted in transit
✅ **Token Expiration** - 5-minute token expiry for API access
✅ **Secure Headers** - Proper cache control and security headers

### 4. Client-Side Protection
✅ **DevTools Protection** - Enhanced for all protected pages
✅ **Code Obfuscation** - Includes new protected components
✅ **Minimal Client Logic** - Most logic moved to server

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install jsonwebtoken crypto-js
npm install --save-dev @types/jsonwebtoken
```

### 2. Configure Environment Variables
```bash
# Copy the example file
cp env.local.example .env.local

# Generate secure secrets
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('CRYPTO_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"

# Add the generated secrets to .env.local
```

### 3. Test the Protected System
```bash
# Start development server
npm run dev

# Visit the demo page
http://localhost:3000/protected-visualizer-demo
```

### 4. Production Deployment
```bash
# Build with obfuscation
npm run build:secure

# Or manually
npm run obfuscate:deploy
npm run build
npm run obfuscate:restore
```

## 🔧 Usage Examples

### Basic Protected Visualizer
```tsx
import ProtectedVisualizer from '../src/components/visualizer/ProtectedVisualizer';

function MyVisualizerPage() {
  const [selectedColors, setSelectedColors] = useState([
    { hex: '#FF6B6B', wall: 'left' },
    { hex: '#4ECDC4', wall: 'right' }
  ]);

  return (
    <ProtectedVisualizer
      roomType="bedroom"
      selectedColors={selectedColors}
      onColorChange={setSelectedColors}
      className="w-full h-64"
    />
  );
}
```

### Advanced Color Processing
```javascript
// Client-side request
const response = await fetch('/api/visualizer/color-processing', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    operation: 'process-palette',
    colors: ['#FF6B6B', '#4ECDC4', '#FFD93D'],
    encryptResponse: true
  })
});

const result = await response.json();
// Server returns encrypted analysis data
```

### Room Data API
```javascript
// Client-side request
const response = await fetch('/api/visualizer/room-data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    roomType: 'bedroom',
    colors: ['#FF6B6B', '#4ECDC4'],
    token: accessToken
  })
});

const { data, nextToken } = await response.json();
// Server returns processed room data + new token
```

## 🎯 API Endpoints

### POST /api/visualizer/room-data
**Purpose**: Get room SVG data and configurations
**Security**: JWT token validation, input sanitization
**Input**: `{ roomType, colors, token }`
**Output**: `{ data: processedRoomData, nextToken }`

### POST /api/visualizer/render-component
**Purpose**: Server-side component rendering
**Security**: Timestamp validation, component type validation
**Input**: `{ componentType, props, timestamp }`
**Output**: `{ html: renderedHTML, timestamp }`

### POST /api/visualizer/color-processing
**Purpose**: Advanced color analysis and processing
**Security**: Operation validation, optional encryption
**Input**: `{ operation, colors, encrypted?, encryptResponse? }`
**Output**: `{ data: analysis }` or `{ encrypted: encryptedData }`

## 🛡️ Protection Levels

### Level 1: Basic Protection (Current DevTools)
- Right-click disabled
- F12 and hotkeys blocked
- Console warnings
- Text selection disabled

### Level 2: Code Obfuscation
- Variable/function name obfuscation
- String encoding
- Control flow flattening
- Dead code injection

### Level 3: Server-Side Logic (NEW)
- SVG paths hidden on server
- Component rendering server-side
- Business logic server-only
- API-based data access

### Level 4: Advanced Security (Optional)
- JWT token authentication
- Data encryption in transit
- Rate limiting
- Request timestamping

## ⚠️ Important Notes

### What This Protects
✅ **SVG path data** - Completely hidden from client
✅ **Room configurations** - Server-side only
✅ **Color processing algorithms** - Protected business logic
✅ **Component structure** - HTML generated server-side
✅ **Database queries** - If implemented, would be server-side

### What This Cannot Protect
⚠️ **Final rendered output** - Users can still see final HTML/CSS
⚠️ **Network requests** - API calls are visible in dev tools
⚠️ **Determined reverse engineering** - Dedicated attackers can still analyze
⚠️ **Screenshot/copying** - Visual output is still visible

### Performance Considerations
- **Server load**: Increased due to component rendering
- **Network latency**: Additional API calls for data
- **Caching**: Implemented for better performance
- **Bundle size**: Client-side code is smaller

## 🔄 Migration Guide

### From Basic to Protected Visualizer

1. **Replace existing visualizer components**:
```tsx
// Old
<ColorVisualizer roomType="bedroom" colors={colors} />

// New  
<ProtectedVisualizer roomType="bedroom" selectedColors={colors} />
```

2. **Update color handling**:
```tsx
// Old: Direct color array
const [colors, setColors] = useState(['#FF6B6B', '#4ECDC4']);

// New: Color-wall mapping
const [selectedColors, setSelectedColors] = useState([
  { hex: '#FF6B6B', wall: 'left' },
  { hex: '#4ECDC4', wall: 'right' }
]);
```

3. **Add environment variables**:
```bash
# Required for JWT and encryption
JWT_SECRET=your-secret-key
CRYPTO_SECRET=your-crypto-key
```

## 🧪 Testing

### Manual Testing
1. **Visit demo page**: `/protected-visualizer-demo`
2. **Check DevTools**: Should be blocked (in production)
3. **Inspect network**: API calls should show encrypted data
4. **View source**: SVG paths should not be visible in client code

### Automated Testing
```bash
# Test API endpoints
curl -X POST http://localhost:3000/api/visualizer/room-data \
  -H "Content-Type: application/json" \
  -d '{"roomType":"bedroom","colors":["#FF6B6B"]}'

# Test component rendering
curl -X POST http://localhost:3000/api/visualizer/render-component \
  -H "Content-Type: application/json" \
  -d '{"componentType":"room-visualizer","props":{},"timestamp":1234567890}'
```

## 🚀 Advanced Features

### Custom Component Types
Add new server-side components:
```javascript
// In render-component.ts
const COMPONENT_FACTORY = {
  'room-visualizer': createRoomVisualizer,
  'color-palette': createColorPalette,
  'custom-component': createCustomComponent  // Add your own
};
```

### Enhanced Encryption
Implement stronger encryption:
```javascript
// In color-processing.ts
function encryptData(data: any) {
  const key = CryptoJS.PBKDF2(CRYPTO_SECRET, 'salt', { keySize: 256/32 });
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}
```

### Rate Limiting
Add API rate limiting:
```javascript
// Example middleware
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

## 📞 Support

This implementation provides a robust foundation for protecting your visualizer's core business logic while maintaining functionality. The server-side approach significantly raises the barrier for casual users trying to access your intellectual property.

For additional security hardening or custom implementations, consider professional security consultation.