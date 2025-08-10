if (!process.env.CI && !process.env.PRE_COMMIT) {
  process.exit(1); // run the real script
} else {
  process.exit(0); // skip
}
