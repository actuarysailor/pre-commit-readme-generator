# Release Process with Release Please

This project uses [Release Please](https://github.com/googleapis/release-please)
to automate releases and changelog generation.

## How it Works

1. **Conventional Commits**: Use conventional commit messages to trigger releases
2. **Automatic PRs**: Release Please creates release PRs with updated changelogs
3. **Version Bumping**: Semantic versioning based on commit types
4. **Changelog Generation**: Automatic changelog updates

## Commit Message Format

Use conventional commit format:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature (minor version bump)
- `fix`: Bug fix (patch version bump)  
- `perf`: Performance improvement (patch version bump)
- `docs`: Documentation only changes
- `deps`: Dependency updates
- `chore`: Other changes that don't modify src or test files

### Examples

```bash
# Feature (minor bump: 1.0.0 -> 1.1.0)
git commit -m "feat: add support for custom Handlebars helpers"

# Bug fix (patch bump: 1.1.0 -> 1.1.1)
git commit -m "fix: resolve template rendering issue with special characters"

# Breaking change (major bump: 1.1.1 -> 2.0.0)
git commit -m "feat!: change configuration file format"
# or
git commit -m "feat: change config format

BREAKING CHANGE: Configuration files now use YAML instead of JSON"

# Documentation
git commit -m "docs: add examples for enterprise configurations"

# Dependencies
git commit -m "deps: update handlebars to v4.7.8"
```

## Release Process

1. **Make changes** using conventional commits
2. **Push to main** branch
3. **Release Please creates PR** with changelog and version updates
4. **Review and merge** the release PR
5. **GitHub Release** is automatically created
6. **Optional**: Publish to npm if configured

## Configuration Files

- `.release-please-config.json`: Release Please configuration
- `.release-please-manifest.json`: Version tracking
- `CHANGELOG.md`: Auto-generated changelog

## Manual Release (if needed)

If you need to trigger a release manually or adjust versions:

```bash
# Install Release Please CLI
npm install -g release-please

# Create a release PR manually
release-please release-pr --repo-url=https://github.com/actuarysailor/pre-commit-readme-generator

# Create a GitHub release manually  
release-please github-release --repo-url=https://github.com/actuarysailor/pre-commit-readme-generator
```
