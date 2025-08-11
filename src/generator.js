#!/usr/bin/env node
const fs = require('fs');
// const path = require('path'); // Removed unused import
const Handlebars = require('handlebars');

// Register increment helper for Handlebars
Handlebars.registerHelper('increment', function(value) {
  return parseInt(value, 10) + 1;
});


function stripTemplateComments(content) {
  // Remove only template-specific comments, not user-helpful section headers
  const patterns = [
    // Markdownlint disable/enable comments (template-specific)
    /^[ \t]*<!-- markdownlint-(?:disable|enable)[^>]*-->\r?\n/gm,

    // Section markers used by template engine (SECTION:name:START/END)
    /^[ \t]*<!-- SECTION:[^>]*(?:START|END)\s*-->\r?\n/gm,

    // Badge markers used by template (BADGES:START/END)
    /^[ \t]*<!-- BADGES:(?:START|END)\s*-->\r?\n/gm
  ];

  let cleanContent = content;

  // Apply each pattern to remove template-specific comments only
  patterns.forEach(pattern => {
    cleanContent = cleanContent.replace(pattern, '');
  });

  // Clean up multiple consecutive blank lines (more than 2)
  cleanContent = cleanContent.replace(/\n{3,}/g, '\n\n');

  // Trim trailing whitespace from each line (to match pre-commit trailing-whitespace hook)
  cleanContent = cleanContent.split('\n').map(line => line.replace(/[ \t]+$/g, '')).join('\n');

  return cleanContent;
}

function printUsageAndExit() {
  console.error('Usage: node generator.js <config.json> <output.md> [template.md] [--debug|--validate-only]');
  process.exit(1);
}

function generateReadme(configPath, outputPath, templatePath, opts = {}) {
  const debug = opts.debug || false;
  const validateOnly = opts.validateOnly || false;

  let config;
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (e) {
    console.error('Failed to read config:', e.message);
    process.exit(1);
  }

  let template;
  try {
    template = fs.readFileSync(templatePath, 'utf8');
  } catch (e) {
    console.error('Failed to read template:', e.message);
    process.exit(1);
  }

  // Compile and generate
  const compiled = Handlebars.compile(template);
  let readme = compiled(config);
  readme = stripTemplateComments(readme);

  // Normalize line endings to LF and ensure a single newline at EOF
  readme = readme.replace(/\r\n?/g, '\n');
  readme = readme.replace(/\s*$/, '') + '\n';

  if (validateOnly) {
    let current = '';
    try {
      current = fs.readFileSync(outputPath, 'utf8');
    } catch (e) {
      if (debug) {
        console.error('README does not exist and would be created.');
      }
      process.exit(1);
    }
    if (current !== readme) {
      if (debug) {
        console.error('README would change.');
      }
      process.exit(1);
    }
    if (debug) {
      console.log('README is up to date.');
    }
    process.exit(0);
  }

  // Write output
  fs.writeFileSync(outputPath, readme);

  console.log(`✅ README generated successfully: ${outputPath}`);
  console.log(`📄 Used config: ${configPath}`);
  console.log(`📋 Used template: ${templatePath}`);
  console.log(`🧹 Stripped template comments from output`);

  // Check for .markdownlint.json config file before running markdownlint
  const lintConfigPath = './.markdownlint.json';
  if (fs.existsSync(lintConfigPath)) {
    console.log(`🔍 Found markdownlint config: ${lintConfigPath}`);
  } else {
    console.warn('⚠️  No .markdownlint.json found in working directory. markdownlint will use defaults.');
  }

  // Run markdownlint --fix on the generated file
  try {
    const { execFileSync } = require('child_process');
    execFileSync('npx', [
      'markdownlint-cli2',
      'fix',
      outputPath,
      '--config',
      '.markdownlint.json'
    ], { stdio: 'inherit', cwd: process.cwd() });
    console.log(`🧹 Ran markdownlint --fix on: ${outputPath}`);
  } catch (lintError) {
    if (lintError.code === 'ENOENT') {
      console.warn('⚠️  markdownlint-cli2 is not installed. Skipping linting.');
    } // else: markdownlint ran but found errors, so do not print a misleading warning
  }
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const debug = args.includes('--debug') || args.includes('--verbose');
  const validateOnly = args.includes('--validate-only');
  const filteredArgs = args.filter(arg => arg !== '--debug' && arg !== '--verbose' && arg !== '--validate-only');
  if (filteredArgs.length < 2) {
    printUsageAndExit();
  }
  const [configPath, outputPath, templatePath = 'templates/default.hbs'] = filteredArgs;
  generateReadme(configPath, outputPath, templatePath, { debug, validateOnly });
}

module.exports = { generateReadme };
