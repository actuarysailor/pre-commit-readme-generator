# Frequently Asked Questions

## General Usage

### Q: How do I customize the template?
A: Edit the `templates/default.hbs` file or create your own template. The template uses Handlebars syntax and can access any data from your JSON configuration.

### Q: Can I use a different template engine?
A: Currently only Handlebars is supported, but we plan to add support for Mustache and Liquid templates in the future.

### Q: How do I add custom sections?
A: Add new sections to your JSON configuration under the `sections` object. Each section should have an `enabled` property and any custom content or structure you need.

## Configuration

### Q: What's the difference between `enabled: true/false` and just removing a section?
A: Using `enabled: false` keeps the section in your config for easy toggling, while removing it entirely means it won't appear in the template at all.

### Q: Can I use environment variables in my config?
A: Not directly, but you can create a script that processes environment variables and generates your JSON config dynamically.

## Pre-commit Hooks

### Q: Which hook should I use?
A: 
- Use `readme-generator-test` to validate that your README matches your template/config
- Use `readme-generator-update` to automatically update your README when template or config changes

### Q: The hook is failing but I don't see any errors
A: Check that your paths are correct in your config and that all referenced files exist (logo, screenshot, etc.)

## Troubleshooting

### Q: My badges aren't showing up
A: Ensure the badge configuration is set to `true` in your JSON config under the `badges` section.

### Q: The generated README has weird formatting
A: Check for unescaped HTML in your JSON strings. Use `{{{triple braces}}}` for unescaped content in your template.

### Q: Can I use this with private repositories?
A: Yes, but note that some badges (like shields.io badges) may not work with private repositories unless configured appropriately.
