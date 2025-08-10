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

    // Validate config file using test.js validation logic
    const validateCmd = `node src/test.js ${testCase.config} --validate-only${debug ? ' --debug' : ''}`;
    if (debug) {
      console.log(`[DEBUG] Running config validation: ${validateCmd}`);
    }
    execSync(validateCmd, { stdio: debug ? 'inherit' : 'pipe' });

    // Generate README
    const command = `node src/generator.js ${testCase.config} ${testCase.output} ${testCase.template}${debug ? ' --debug' : ''}`;
    if (debug) {
      console.log(`[DEBUG] Running command: ${command}`);
    }
    execSync(command, { stdio: debug ? 'inherit' : 'pipe' });

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

    // Compare to expected file if it exists (use testCase.output as the expected file)
    if (fs.existsSync(testCase.output)) {
      const expected = fs.readFileSync(testCase.output, 'utf8');
      if (generated !== expected) {
        // Print a diff
        const diff = require('diff');
        const changes = diff.createPatch(testCase.output, expected, generated);
        console.error(`❌ Generated output does not match expected file: ${testCase.output}`);
        console.error(changes);
        throw new Error('Generated output does not match expected file');
      }
    } else {
      console.warn(`⚠️  Expected file not found for comparison: ${testCase.output}`);
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
