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

  return cleanContent;
}

function printUsageAndExit() {
  console.error('Usage: node generator.js <config.json> <output.md> [template.md] [--debug|--validate-only]');
  process.exit(1);
}

function generateReadme(configPath, outputPath, templatePath, opts = {}) {
  const debug = opts.debug || false;
  const validateOnly = opts.validateOnly || false;
  const rootDir = process.cwd();

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

  // Run markdownlint --fix on the generated file
  try {
    const { execSync } = require('child_process');
    const lintCmd = `npx markdownlint-cli2 fix "${outputPath}" --config .markdownlint.json`;
    execSync(lintCmd, { stdio: 'inherit', cwd: rootDir });
    console.log(`🧹 Ran markdownlint --fix on: ${outputPath}`);
  } catch (lintError) {
    console.warn('⚠️  markdownlint --fix failed or is not installed. Skipping linting.');
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
