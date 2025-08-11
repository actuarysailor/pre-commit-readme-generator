#!/usr/bin/env node


const fs = require('fs');
const { execSync } = require('child_process');

// Parse --debug or --verbose flag
const debug = process.argv.includes('--debug') || process.argv.includes('--verbose');


console.log('🧪 Running integration tests...');
if (debug) {
  console.log('[DEBUG] Debug mode enabled. Extra output will be shown.');
  console.log('[DEBUG] Test cases:', JSON.stringify(testCases, null, 2));
}

const testCases = [
  {
    name: 'Generate with enterprise api config',
    config: 'examples/enterprise-api.json',
    template: 'templates/default.hbs',
    output: 'examples/test-integration-enterprise-api.md'
  },
  {
    name: 'Generate with main config',
    config: 'examples/python-datascience.json',
    template: 'templates/default.hbs',
    output: 'examples/test-integration-python-datascience.md'
  },
  {
    name: 'Generate with simple example',
    config: 'examples/simple-project.json',
    template: 'templates/default.hbs',
    output: 'examples/test-integration-simple.md'
  },
  {
    name: 'Generate with minimal config',
    config: 'examples/minimal.json',
    template: 'templates/default.hbs',
    output: 'examples/test-integration-minimal.md'
  }
];

let passed = 0;
let failed = 0;


for (const testCase of testCases) {
  try {
    console.log(`\n📋 ${testCase.name}`);


    // Generate README
    const generateCmd = `node src/generator.js ${testCase.config} ${testCase.output} ${testCase.template}${debug ? ' --debug' : ''}`;
    if (debug) {
      console.log(`[DEBUG] Running generate command: ${generateCmd}`);
    }
    execSync(generateCmd, { stdio: debug ? 'inherit' : 'pipe' });

    // Validate generated file is unchanged (matches committed)
    const validateCmd = `node src/validate-file.js ${testCase.output}`;
    if (debug) {
      console.log(`[DEBUG] Running validate command: ${validateCmd}`);
    }
    execSync(validateCmd, { stdio: debug ? 'inherit' : 'pipe' });

    // Check if output file exists and has content
    if (!fs.existsSync(testCase.output)) {
      throw new Error('Output file was not created');
    }
    const generated = fs.readFileSync(testCase.output, 'utf8');
    if (debug) {
      console.log(`[DEBUG] Output file content (first 200 chars):\n${generated.slice(0, 200)}`);
    }
    if (generated.length < 100) {
      throw new Error('Output file appears to be empty or too short');
    }

    // Clean up test file
    // fs.unlinkSync(testCase.output);

    console.log(`✅ ${testCase.name} - PASSED`);
    passed++;

  } catch (error) {
    console.log(`❌ ${testCase.name} - FAILED: ${error.message}`);
    if (debug && error.stack) {
      console.log('[DEBUG] Stack trace:', error.stack);
    }
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
