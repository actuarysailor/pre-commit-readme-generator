#!/usr/bin/env node

const { execSync } = require('child_process');

try {
  console.log('🔄 Generating README...');
  execSync('node src/generator.js config/readme-config.json README.md templates/default.hbs', {stdio: 'inherit'});

  console.log('📋 Checking if README is up to date...');
  execSync('git diff --exit-code README.md', {stdio: 'inherit'});

  console.log('✅ README is up to date');
} catch (error) {
  console.log('❌ README needs updating. Please run "npm run generate" and commit the changes.');
  process.exit(1);
}
