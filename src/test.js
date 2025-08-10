#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

// Accept config, readme, and template as arguments, with sensible defaults
const configFile = process.argv[2] || 'config/readme-config.json';
const readmeFile = process.argv[3] || 'README.md';
const templateFile = process.argv[4] || 'templates/default.hbs';
const debug = process.argv.includes('--debug') || process.argv.includes('--verbose');
const validateOnly = process.argv.includes('--validate-only');

// Print received arguments for debugging or if debug flag is set
if (debug || process.argv.length <= 2) {
  console.log('[test.js] Received arguments:');
  console.log('  configFile:', configFile);
  console.log('  readmeFile:', readmeFile);
  console.log('  templateFile:', templateFile);
  if (debug) {
    console.log('[test.js] Debug mode enabled.');
  }
  if (process.argv.length <= 2) {
    console.log('Usage: node test.js <config.json> <README.md> <template.hbs> [--debug]');
    console.log('Defaults: config/readme-config.json README.md templates/default.hbs');
  }
}

function getFileHash(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  return crypto.createHash('sha256').update(content).digest('hex');
}

function testReadmeGenerator() {

  if (debug) {
    console.log('[test.js] Debug: Starting README generator test...');
  } else {
    console.log('🧪 Testing README generator...');
  }

  // Look for files in the current working directory (the repo using this hook)
  const readmePath = path.resolve(process.cwd(), readmeFile);
  const configPath = path.resolve(process.cwd(), configFile);
  const templatePath = path.resolve(process.cwd(), templateFile);
  if (debug) {
    console.log('[test.js] Debug: Resolved paths:');
    console.log('  readmePath:', readmePath);
    console.log('  configPath:', configPath);
    console.log('  templatePath:', templatePath);
  }

  // Check if required files exist
  if (!fs.existsSync(configPath)) {
    console.error('❌ Main config file not found:', configPath);
    process.exit(1);
  }

  if (!fs.existsSync(templatePath)) {
    console.error('❌ Template file not found:', templatePath);
    process.exit(1);
  }

  // Get hash of current README.md (if it exists)
  const originalHash = getFileHash(readmePath);
  if (debug) {
    console.log(`[test.js] Debug: Original README hash: ${originalHash || 'N/A (file does not exist)'}`);
  } else {
    console.log(`📄 Original README hash: ${originalHash || 'N/A (file does not exist)'}`);
  }

  try {
    // Generate new README using the template from the repo being tested
    if (debug) {
      console.log('[test.js] Debug: Running generator.js with debug flag:', debug);
    } else {
      console.log('🔄 Generating README from example config...');
    }
    const generatorPath = path.resolve(__dirname, 'generator.js');
    const generatorCmd = `node ${generatorPath} ${configPath} ${readmePath} ${templatePath}${debug ? ' --debug' : ''}`;
    if (debug) {
      console.log('[test.js] Debug: Generator command:', generatorCmd);
    }
    execSync(generatorCmd, { cwd: process.cwd(), stdio: debug ? 'inherit' : 'pipe' });

    // Get hash of generated README
    const newHash = getFileHash(readmePath);
    if (debug) {
      console.log(`[test.js] Debug: Generated README hash: ${newHash}`);
    } else {
      console.log(`📄 Generated README hash: ${newHash}`);
    }

    if (!newHash) {
      console.error('❌ Failed to generate README.md');
      process.exit(1);
    }

    // Compare hashes
    if (originalHash && originalHash !== newHash) {
      console.error('❌ README generator test failed!');
      console.error('   The generated README differs from the committed version.');
      console.error('   This suggests either:');
      console.error('   1. The generator script has been modified');
      console.error('   2. The example config has been modified');
      console.error('   3. The template has been modified');
      console.error('   Please run "npm run generate" and commit the updated README.md');
      if (debug) {
        console.error('[test.js] Debug: Hash mismatch.');
      }
      process.exit(1);
    }

    if (!originalHash) {
      console.log('✅ README.md generated successfully (was missing)');
    } else {
      console.log('✅ README generator test passed - no changes detected');
    }

  } catch (error) {
    console.error('❌ README generator test failed:', error.message);
    if (debug && error.stack) {
      console.error('[test.js] Debug: Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

// Additional test: Validate JSON configs
function testConfigFiles() {
  console.log('🧪 Testing config file...');
  const configPath = path.resolve(process.cwd(), configFile);
  if (!fs.existsSync(configPath)) {
    console.error('❌ Config file not found:', configPath);
    process.exit(1);
  }
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    // Basic validation
    if (!config.project || !config.project.title) {
      throw new Error('Missing required project.title');
    }
    if (!config.repository || !config.repository.github_username) {
      throw new Error('Missing required repository.github_username');
    }
    console.log(`✅ Config file valid: ${configFile}`);
  } catch (error) {
    console.error(`❌ Invalid config file ${configFile}:`, error.message);
    process.exit(1);
  }
}

// Run tests
testConfigFiles();
if (!validateOnly) {
  testReadmeGenerator();
}

console.log('🎉 All tests passed!');
