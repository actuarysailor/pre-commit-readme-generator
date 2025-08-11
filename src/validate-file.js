#!/usr/bin/env node
const { execSync } = require('child_process');

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('Usage: node validate-file.js <file1> [file2 ...]');
  process.exit(1);
}

let failed = false;
for (const file of files) {
  try {
    execSync(`git diff --exit-code -- ${file}`);
    console.log(`✅ ${file} is up to date (no uncommitted changes).`);
  } catch (err) {
    console.error(`❌ ${file} has uncommitted changes. Please update and commit.`);
    failed = true;
  }
}
if (failed) process.exit(1);
