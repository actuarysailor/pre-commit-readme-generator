#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// Register custom helpers
Handlebars.registerHelper('if', function(conditional, options) {
  if (conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('unless', function(conditional, options) {
  if (!conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('eq', function(a, b, options) {
  if (a === b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// Add helper for 1-based indexing
Handlebars.registerHelper('increment', function(value) {
  return parseInt(value) + 1;
});

// Add helper for specific step checks
Handlebars.registerHelper('isStep', function(index, step, options) {
  if (parseInt(index) === parseInt(step) - 1) { // Convert to 0-based for comparison
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
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

function generateReadme(configPath, outputPath = 'README.md', templatePath = 'BLANK_README.md') {
  try {
    // Read template from the specified path (defaults to BLANK_README.md in current repo)
    const template = fs.readFileSync(templatePath, 'utf8');

    // Resolve paths relative to project root
    const rootDir = path.resolve(__dirname, '..');
    const fullConfigPath = path.resolve(rootDir, configPath);
    const fullOutputPath = path.resolve(rootDir, outputPath);

    // Read configuration
    const config = JSON.parse(fs.readFileSync(fullConfigPath, 'utf8'));

    // Compile template
    const compiledTemplate = Handlebars.compile(template);

    // Generate README
    const readme = compiledTemplate(config);

    // Strip all template comments from generated output
    const cleanReadme = stripTemplateComments(readme);

    // Write output
    fs.writeFileSync(fullOutputPath, cleanReadme);

    console.log(`✅ README generated successfully: ${outputPath}`);
    console.log(`📄 Used config: ${configPath}`);
    console.log(`📋 Used template: ${templatePath}`);
    console.log(`🧹 Stripped template comments from output`);

  } catch (error) {
    console.error('❌ Error generating README:', error.message);
    process.exit(1);
  }
}


// Command line usage with --debug flag
if (require.main === module) {
  const debug = process.argv.includes('--debug') || process.argv.includes('--verbose');
  if (process.argv.length < 4) {
    console.error('Usage: node generator.js <config.json> <output.md> [template.md] [--debug]');
    process.exit(1);
  }

  const configPath = process.argv[2];
  const outputPath = process.argv[3];
  const templatePath = process.argv[4] || 'BLANK_README.md'; // Default to BLANK_README.md

  if (debug) {
    console.log('[generator.js] Debug mode enabled.');
    console.log('[generator.js] Arguments:');
    console.log('  configPath:', configPath);
    console.log('  outputPath:', outputPath);
    console.log('  templatePath:', templatePath);
  }

  // Wrap generateReadme to add debug output
  try {
    generateReadme(configPath, outputPath, templatePath);
    if (debug) {
      if (fs.existsSync(outputPath)) {
        const content = fs.readFileSync(outputPath, 'utf8');
        console.log(`[generator.js] Output file content (first 200 chars):\n${content.slice(0, 200)}`);
      } else {
        console.log('[generator.js] Output file was not created.');
      }
    }
  } catch (error) {
    if (debug && error.stack) {
      console.error('[generator.js] Debug: Stack trace:', error.stack);
    }
    throw error;
  }
}

module.exports = { generateReadme };
