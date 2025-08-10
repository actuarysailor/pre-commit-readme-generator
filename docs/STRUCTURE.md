# Repository Structure Guide

## Overview

This repository follows best practices for a Node.js pre-commit hook project
with comprehensive examples and documentation.

## Directory Structure

```text
├── .github/                    # GitHub-specific files
│   ├── workflows/             # CI/CD workflows
│   ├── ISSUE_TEMPLATE/        # Issue templates
│   └── pull_request_template.md
├── config/                    # Main repository configuration
│   └── readme-config.json    # Config for this repo's README
├── docs/                     # Documentation
│   ├── API.md               # API documentation
│   └── FAQ.md               # Frequently asked questions
├── examples/                 # Example configurations
│   ├── simple-project.json  # Minimal project example
│   ├── enterprise-api.json  # Complex enterprise example
│   ├── python-datascience.json # Data science project example
│   ├── example.json         # Basic example
│   └── minimal.json         # Absolute minimal config
├── scripts/                 # Build and test scripts
│   └── test-integration.js  # Integration test runner
├── src/                     # Source code
│   ├── generator.js         # Main README generator
│   └── test.js             # Test validation
├── templates/               # Handlebars templates
│   └── default.hbs         # Default README template
├── .gitignore              # Git ignore rules
├── .markdownlint.json      # Markdown linting config
├── .pre-commit-hooks.yaml  # Pre-commit hook definitions
├── CONTRIBUTING.md         # Contribution guidelines
├── LICENSE                 # License file
├── package.json           # Node.js package configuration
└── README.md              # Generated from config + template
```

## Configuration Structure

### Main Config (`config/readme-config.json`)

- Used to generate the README for this repository
- Contains the actual project information and settings
- Modified through development to keep README up-to-date

### Example Configs (`examples/*.json`)

- Demonstrate different types of projects and use cases
- Show various configuration options and structures
- Used for testing and as starting points for new projects

## Development Workflow

1. **Make changes** to source code, templates, or documentation
2. **Update config** (`config/readme-config.json`) if needed
3. **Run tests** with `npm test` to validate changes
4. **Generate README** with `npm run generate`
5. **Commit changes** - pre-commit hooks will validate everything

## Example Types

- **simple-project.json**: Minimal configuration for basic projects
- **enterprise-api.json**: Complex API project with full features
- **python-datascience.json**: Data science/research project example
- **minimal.json**: Absolute minimum required configuration
- **example.json**: Balanced example showing common features

## Testing

The test suite validates:

- All configuration files are valid JSON with required fields
- README generation works with different configs
- Generated output matches expected structure
- Integration tests with multiple config types

## CI/CD

GitHub Actions automatically:

- Run tests on multiple Node.js versions
- Validate configuration files
- Check README is up-to-date
- Create releases on tagged versions
- Run security audits
