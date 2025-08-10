#!/usr/bin/env node

const { execSync } = require('child_process');

// Parse --debug or --verbose flag
const debug = process.argv.includes('--debug') || process.argv.includes('--verbose');

try {
  if (debug) {
    console.log('[validate.js] Debug mode enabled.');
  }
  console.log('🔄 Generating README...');
  const genCmd = `node src/generator.js config/readme-config.json README.md templates/default.hbs${debug ? ' --debug' : ''}`;
  if (debug) {
    console.log(`[validate.js] Running: ${genCmd}`);
  }
  execSync(genCmd, {stdio: 'inherit'});

  console.log('📋 Checking if README is up to date...');
  const diffCmd = 'git diff --exit-code README.md';
  if (debug) {
    console.log(`[validate.js] Running: ${diffCmd}`);
  }
  execSync(diffCmd, {stdio: 'inherit'});

  console.log('✅ README is up to date');
} catch (error) {
  console.log('❌ README needs updating. Please run "npm run generate" and commit the changes.');
  if (debug && error.stack) {
    console.error('[validate.js] Debug: Stack trace:', error.stack);
  }
  process.exit(1);
}
