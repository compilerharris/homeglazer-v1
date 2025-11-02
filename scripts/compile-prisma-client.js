#!/usr/bin/env node
// Compile Prisma client TypeScript files to JavaScript
// This allows Node.js to directly require the JavaScript files

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const prismaClientPath = path.resolve(__dirname, '../node_modules/@prisma/client/.prisma/client');

console.log('📦 Compiling Prisma client TypeScript files to JavaScript...');

// Check if Prisma client directory exists
if (!fs.existsSync(prismaClientPath)) {
  console.error('❌ Prisma client directory not found:', prismaClientPath);
  process.exit(1);
}

// List of TypeScript files to compile
const tsFiles = [
  'client.ts',
  'browser.ts',
  'enums.ts',
  'models.ts',
  'commonInputTypes.ts',
];

// Files in internal directory
const internalDir = path.join(prismaClientPath, 'internal');
const internalTsFiles = fs.existsSync(internalDir) 
  ? fs.readdirSync(internalDir).filter(f => f.endsWith('.ts')).map(f => `internal/${f}`)
  : [];

// Compile TypeScript files using swc (same as Next.js)
// This is faster than tsc and works well with Next.js
const swcCompiler = path.resolve(__dirname, '../node_modules/.bin/swc');

try {
  // Check if swc is available
  if (!fs.existsSync(swcCompiler)) {
    console.log('⚠️  SWC not found, trying to use tsc...');
    
    // Try using tsc if swc is not available
    const tscCompiler = path.resolve(__dirname, '../node_modules/.bin/tsc');
    if (!fs.existsSync(tscCompiler)) {
      console.error('❌ Neither swc nor tsc found. Please install dependencies.');
      process.exit(1);
    }
    
    // Create a temporary tsconfig.json for compilation
    const tsconfigPath = path.join(prismaClientPath, 'tsconfig.json');
    const tsconfig = {
      compilerOptions: {
        target: 'ES2017',
        module: 'commonjs',
        lib: ['ES2017'],
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: false,
        moduleResolution: 'node',
        resolveJsonModule: true,
        outDir: '.',
        rootDir: '.',
        noEmit: false,
        declaration: false,
      },
      include: ['**/*.ts'],
      exclude: ['node_modules'],
    };
    
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
    
    // Compile each file (including internal files)
    const allFiles = [...tsFiles, ...internalTsFiles];
    for (const file of allFiles) {
      const filePath = path.join(prismaClientPath, file);
      if (fs.existsSync(filePath)) {
        try {
          // Compile with TypeScript compiler to CommonJS
          execSync(`cd "${prismaClientPath}" && "${tscCompiler}" "${file}" --skipLibCheck --module commonjs --target ES2017 --moduleResolution node`, {
            stdio: 'pipe',
          });
          console.log(`✅ Compiled: ${file}`);
          
          // Fix imports in compiled JavaScript to use .js extensions for local files
          const jsFile = file.replace('.ts', '.js');
          const jsFilePath = path.join(prismaClientPath, jsFile);
          if (fs.existsSync(jsFilePath)) {
            let jsContent = fs.readFileSync(jsFilePath, 'utf8');
            // Fix issues in compiled JavaScript
            // 1. Fix relative imports to use .js extension
            jsContent = jsContent.replace(/require\(['"]\.\/(internal\/[^'"]+)['"]\)/g, (match, path) => {
              return `require('./${path}.js')`;
            });
            jsContent = jsContent.replace(/require\(['"]\.\/([^'"]+)['"]\)/g, (match, path) => {
              if (!path.includes('.')) {
                return `require('./${path}.js')`;
              }
              return match;
            });
            // 2. Fix import.meta.url (ESM) to use __dirname (CommonJS)
            // Replace the entire line that sets __dirname - remove it as __dirname is already available
            jsContent = jsContent.replace(/globalThis\['__dirname'\] = path\.dirname\(\(0, node_url_1\.fileURLToPath\)\(__filename\)\);/g, '// __dirname already available in CommonJS');
            jsContent = jsContent.replace(/globalThis\['__dirname'\] = path\.dirname\(\(0, node_url_1\.fileURLToPath\)\(import\.meta\.url\)\);/g, '// __dirname already available in CommonJS');
            jsContent = jsContent.replace(/globalThis\['__dirname'\] = path\.dirname\(fileURLToPath\(import\.meta\.url\)\);/g, '// __dirname already available in CommonJS');
            // Also fix any remaining import.meta.url references
            jsContent = jsContent.replace(/import\.meta\.url/g, '__filename');
            fs.writeFileSync(jsFilePath, jsContent, 'utf8');
          }
        } catch (e) {
          console.warn(`⚠️  Failed to compile ${file}:`, e.message);
        }
      }
    }
    
    // Clean up tsconfig
    if (fs.existsSync(tsconfigPath)) {
      fs.unlinkSync(tsconfigPath);
    }
  } else {
    // Use swc to compile each TypeScript file (including internal files)
    const allFiles = [...tsFiles, ...internalTsFiles];
    for (const file of allFiles) {
      const filePath = path.join(prismaClientPath, file);
      if (fs.existsSync(filePath)) {
        try {
          // Compile TypeScript to JavaScript using swc
          const outputFile = file.replace('.ts', '.js');
          const outputPath = path.join(prismaClientPath, outputFile);
          
          execSync(
            `"${swcCompiler}" "${filePath}" -o "${outputPath}" ` +
            `--config-file ${path.resolve(__dirname, '../.swcrc')} ` +
            `|| "${swcCompiler}" "${filePath}" -o "${outputPath}" ` +
            `--jsc.target es2017 --jsc.parser.syntax typescript --jsc.parser.tsx false --module.type commonjs`,
            {
              cwd: prismaClientPath,
              stdio: 'pipe',
            }
          );
          console.log(`✅ Compiled: ${file} → ${outputFile}`);
        } catch (e) {
          // If swc fails, try a simpler approach
          console.warn(`⚠️  SWC compilation failed for ${file}, trying alternative...`);
          
          // Read the TypeScript file and create a simple JavaScript wrapper
          // This is a fallback - webpack will handle the actual transpilation
          const tsContent = fs.readFileSync(filePath, 'utf8');
          // For now, just log that we'll rely on webpack
          console.log(`ℹ️  ${file} will be transpiled by webpack at runtime`);
        }
      }
    }
  }
  
  // Update default.js to require the compiled JavaScript file
  const defaultJsPath = path.join(prismaClientPath, 'default.js');
  const defaultJsContent = `// Prisma Client Default Export
// Re-export from the compiled JavaScript client file
// TypeScript files are compiled to JavaScript after Prisma generates them

// Export from the compiled client.js file
// This avoids Node.js type stripping issues
try {
  // Try to require the compiled JavaScript file first
  if (require.resolve('./client.js')) {
    module.exports = require('./client.js');
  } else {
    // Fallback to TypeScript file - webpack will transpile it
    module.exports = require('./client');
  }
} catch (e) {
  // If client.js doesn't exist, fallback to TypeScript
  // Webpack will handle the transpilation
  module.exports = require('./client');
}
`;

  fs.writeFileSync(defaultJsPath, defaultJsContent, 'utf8');
  console.log('✅ Updated default.js to use compiled JavaScript files');
  console.log('✨ Prisma client compilation complete!');
} catch (error) {
  console.error('❌ Error compiling Prisma client:', error.message);
  console.error(error.stack);
  process.exit(1);
}

