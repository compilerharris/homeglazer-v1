const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const obfuscationConfig = require('../obfuscation-config.json');

// Target files for obfuscation (basic and single wall visualizers)
const targetFiles = [
  'src/pages/colour-visualiser/basic/[brand]/[category]/[color].tsx',
  'src/pages/colour-visualiser.tsx',
  'src/components/security/DevToolsProtection.tsx'
];

// Backup original files
function backupFiles() {
  console.log('Creating backups...');
  targetFiles.forEach(file => {
    const backupPath = file + '.backup';
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, backupPath);
      console.log(`Backed up: ${file} → ${backupPath}`);
    }
  });
}

// Restore original files
function restoreFiles() {
  console.log('Restoring original files...');
  targetFiles.forEach(file => {
    const backupPath = file + '.backup';
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, file);
      fs.unlinkSync(backupPath);
      console.log(`Restored: ${backupPath} → ${file}`);
    }
  });
}

// Obfuscate files
function obfuscateFiles() {
  console.log('Obfuscating files...');
  targetFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const sourceCode = fs.readFileSync(file, 'utf8');
      
      try {
        const obfuscationResult = JavaScriptObfuscator.obfuscate(sourceCode, obfuscationConfig);
        fs.writeFileSync(file, obfuscationResult.getObfuscatedCode());
        console.log(`Obfuscated: ${file}`);
      } catch (error) {
        console.error(`Error obfuscating ${file}:`, error.message);
        console.log(`Skipping obfuscation for ${file}`);
      }
    }
  });
}

// Main execution
const command = process.argv[2];

switch (command) {
  case 'backup':
    backupFiles();
    break;
  case 'obfuscate':
    obfuscateFiles();
    break;
  case 'restore':
    restoreFiles();
    break;
  case 'deploy':
    backupFiles();
    obfuscateFiles();
    console.log('Files prepared for deployment with obfuscation');
    break;
  default:
    console.log('Usage:');
    console.log('  node scripts/obfuscate.js backup    - Create backups of target files');
    console.log('  node scripts/obfuscate.js obfuscate - Obfuscate target files');
    console.log('  node scripts/obfuscate.js restore   - Restore original files from backups');
    console.log('  node scripts/obfuscate.js deploy    - Backup and obfuscate for deployment');
}