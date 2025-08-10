#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧪 Running integration tests...');

const testCases = [
  {
    name: 'Generate with main config',
    config: 'config/readme-config.json',
    template: 'templates/default.hbs',
    output: 'test-integration-main.md'
  },
  {
    name: 'Generate with simple example',
    config: 'examples/simple-project.json',
    template: 'templates/default.hbs',
    output: 'test-integration-simple.md'
  },
  {
    name: 'Generate with minimal config',
    config: 'examples/minimal.json',
    template: 'templates/default.hbs',
    output: 'test-integration-minimal.md'
  }
];

let passed = 0;
let failed = 0;

for (const testCase of testCases) {
  try {
    console.log(`\n📋 ${testCase.name}`);
    
    // Generate README
    const command = `node src/generator.js ${testCase.config} ${testCase.output} ${testCase.template}`;
    execSync(command, { stdio: 'pipe' });
    
    // Check if output file exists and has content
    if (!fs.existsSync(testCase.output)) {
      throw new Error('Output file was not created');
    }
    
    const content = fs.readFileSync(testCase.output, 'utf8');
    if (content.length < 100) {
      throw new Error('Output file appears to be empty or too short');
    }
    
    // Check for basic README structure
    const requiredSections = ['# ', '## '];
    for (const section of requiredSections) {
      if (!content.includes(section)) {
        throw new Error(`Missing required section: ${section}`);
      }
    }
    
    // Clean up test file
    fs.unlinkSync(testCase.output);
    
    console.log(`✅ ${testCase.name} - PASSED`);
    passed++;
    
  } catch (error) {
    console.log(`❌ ${testCase.name} - FAILED: ${error.message}`);
    failed++;
  }
}

console.log(`\n📊 Integration Test Results:`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 All integration tests passed!');
}
