# API Documentation

## Generator Module (`src/generator.js`)

### Generator Functions

#### `generateReadme(configPath, outputPath, templatePath)`

Generates a README file from a Handlebars template and JSON configuration.

**Parameters:**

- `configPath` (string): Path to the JSON configuration file
- `outputPath` (string): Path where the generated README will be written
- `templatePath` (string): Path to the Handlebars template file

**Returns:** void

**Throws:** Error if file operations fail or template compilation fails

#### `stripTemplateComments(content)`

Removes template-specific comments from generated content while preserving
user-helpful comments.

**Parameters:**

- `content` (string): The generated README content

**Returns:** string - Content with template comments removed

## Test Module (`src/test.js`)

### Test Functions

#### `validateReadme(configPath, readmePath, templatePath)`

Validates that a README file matches what would be generated from the given
template and configuration.

**Parameters:**

- `configPath` (string): Path to the JSON configuration file
- `readmePath` (string): Path to the README file to validate
- `templatePath` (string): Path to the Handlebars template file

**Returns:** boolean - true if README matches generated content

## Configuration Schema

### Root Object

```json
{
  "project": { ... },
  "repository": { ... },
  "contact": { ... },
  "badges": { ... },
  "sections": { ... }
}
```

### Project Object

```json
{
  "title": "string",
  "description": "string",
  "logo_path": "string",
  "screenshot_path": "string"
}
```

### Repository Object

```json
{
  "github_username": "string",
  "repo_name": "string",
  "license": "string",
  "license_file": "string"
}
```

### Contact Object

```json
{
  "name": "string",
  "email": "string",
  "socials": [
    {
      "platform": "string",
      "username": "string",
      "url": "string",
      "icon": "string",
      "enabled": boolean
    }
  ]
}
```

## Custom Handlebars Helpers

### `increment`

Increments a number by 1 (useful for 1-based indexing in loops).

**Usage:** `{{increment @index}}`

### `isStep`

Checks if the current index matches a specific step number.

**Usage:** `{{#isStep @index 2}}...{{/isStep}}`
