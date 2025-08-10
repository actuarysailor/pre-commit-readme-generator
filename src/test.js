const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

function getFileHash(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  return crypto.createHash('sha256').update(content).digest('hex');
}

function testReadmeGenerator() {
  console.log('🧪 Testing README generator...');

  // Look for README.md and config in the current working directory (the repo using this hook)
  const readmePath = path.resolve(process.cwd(), 'README.md');
  const configPath = path.resolve(process.cwd(), 'config', 'readme-config.json');
  const templatePath = path.resolve(process.cwd(), 'templates', 'default.hbs');

  // Check if required files exist
  if (!fs.existsSync(configPath)) {
    console.error('❌ Main config file not found:', configPath);
    process.exit(1);
  }

  if (!fs.existsSync(templatePath)) {
    console.error('❌ Template file not found:', templatePath);
    process.exit(1);
  }

  // Get hash of current README.md (if it exists)
  const originalHash = getFileHash(readmePath);
  console.log(`📄 Original README hash: ${originalHash || 'N/A (file does not exist)'}`);

  try {
    // Generate new README using the template from the repo being tested
    console.log('🔄 Generating README from example config...');
    const generatorPath = path.resolve(__dirname, 'generator.js');
    execSync(`node ${generatorPath} ${configPath} ${readmePath} ${templatePath}`, {
      cwd: process.cwd(),
      stdio: 'pipe'
    });

    // Get hash of generated README
    const newHash = getFileHash(readmePath);
    console.log(`📄 Generated README hash: ${newHash}`);

    if (!newHash) {
      console.error('❌ Failed to generate README.md');
      process.exit(1);
    }

    // Compare hashes
    if (originalHash && originalHash !== newHash) {
      console.error('❌ README generator test failed!');
      console.error('   The generated README differs from the committed version.');
      console.error('   This suggests either:');
      console.error('   1. The generator script has been modified');
      console.error('   2. The example config has been modified');
      console.error('   3. The template has been modified');
      console.error('   Please run "npm run generate" and commit the updated README.md');
      process.exit(1);
    }

    if (!originalHash) {
      console.log('✅ README.md generated successfully (was missing)');
    } else {
      console.log('✅ README generator test passed - no changes detected');
    }

  } catch (error) {
    console.error('❌ README generator test failed:', error.message);
    process.exit(1);
  }
}

// Additional test: Validate JSON configs
function testConfigFiles() {
  console.log('🧪 Testing config files...');

  // Test both config and examples directories
  const testDirs = ['config', 'examples'];

  for (const dirName of testDirs) {
    const configDir = path.resolve(__dirname, '..', dirName);
    if (!fs.existsSync(configDir)) continue;

    const configFiles = fs.readdirSync(configDir).filter(file => file.endsWith('.json'));

    for (const configFile of configFiles) {
      const configPath = path.join(configDir, configFile);
      try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

        // Basic validation
        if (!config.project || !config.project.title) {
          throw new Error('Missing required project.title');
        }
        if (!config.repository || !config.repository.github_username) {
          throw new Error('Missing required repository.github_username');
        }

        console.log(`✅ Config file valid: ${dirName}/${configFile}`);

      } catch (error) {
        console.error(`❌ Invalid config file ${dirName}/${configFile}:`, error.message);
        process.exit(1);
      }
    }
  }
}

// Run tests
testConfigFiles();
testReadmeGenerator();

console.log('🎉 All tests passed!');
