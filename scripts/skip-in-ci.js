const debug = process.argv.includes('--debug') || process.argv.includes('--verbose');
if (debug) {
  console.log('[skip-in-ci.js] Debug mode enabled.');
  console.log('[skip-in-ci.js] process.env.CI:', process.env.CI);
  console.log('[skip-in-ci.js] process.env.PRE_COMMIT:', process.env.PRE_COMMIT);
}
if (process.env.CI || process.env.PRE_COMMIT) {
  if (debug) {
    console.log('[skip-in-ci.js] Skipping script in CI or pre-commit environment.');
  }
  process.exit(0); // skip
} else {
  if (debug) {
    console.log('[skip-in-ci.js] Not in CI or pre-commit, will run the real script.');
  }
  process.exit(1); // run the real script
}
