# Changelog

## [1.1.2](https://github.com/actuarysailor/pre-commit-readme-generator/compare/v1.1.1...v1.1.2) (2025-08-10)


### Bug Fixes

* The test hook for pre-commit had many parameters hard-coded ([684193b](https://github.com/actuarysailor/pre-commit-readme-generator/commit/684193b0a5496262bed3747d2173072e5e263735))
* The test hook for pre-commit had many parameters hard-coded which did not work. ([950ea50](https://github.com/actuarysailor/pre-commit-readme-generator/commit/950ea50e3622a7fb1790bd48a0d740388c209095))

## [1.1.1](https://github.com/actuarysailor/pre-commit-readme-generator/compare/v1.1.0...v1.1.1) (2025-08-10)


### Bug Fixes

* Allow external filenames to be passed ([9aa43f6](https://github.com/actuarysailor/pre-commit-readme-generator/commit/9aa43f6228fbf6e41bd154c2961fd97e3abeadb6))
* Avoid running prepack/prepare in CI ([1e04c88](https://github.com/actuarysailor/pre-commit-readme-generator/commit/1e04c88352d000e214653afe0b427f1ac533e724))
* Enable NPM Publishing ([29b5449](https://github.com/actuarysailor/pre-commit-readme-generator/commit/29b5449e50460ff6559ec2fa28b5c2cd7e300a38))
* Enable NPM Publishing ([f357c7a](https://github.com/actuarysailor/pre-commit-readme-generator/commit/f357c7a0d6ee2ecfce7701e87830f9e42a61cbf7))

## [1.1.0](https://github.com/actuarysailor/pre-commit-readme-generator/compare/v1.0.0...v1.1.0) (2025-08-10)


### Features

* add Node.js version requirement and fix hook paths ([7259ba6](https://github.com/actuarysailor/pre-commit-readme-generator/commit/7259ba6f206c4e9d735a432d58e966aab92cfa08))

## 1.0.0 (2025-08-10)


### Features

* Draft Initial Release - Untested ([c8e3810](https://github.com/actuarysailor/pre-commit-readme-generator/commit/c8e38104d7a582bf3da54d98cd2313d7dfb58b74))


### Bug Fixes

* add explicit token and actions permission for Release Please ([64b148b](https://github.com/actuarysailor/pre-commit-readme-generator/commit/64b148b1d210542e9e65da3443c82d8f99451674))
* add handlebars dependency to pre-commit local hooks ([0dcfc30](https://github.com/actuarysailor/pre-commit-readme-generator/commit/0dcfc301329c79f73621569df7677de92d904739))
* add issues write permission for Release Please labels ([5a8ffee](https://github.com/actuarysailor/pre-commit-readme-generator/commit/5a8ffee466b7e0158c16e7e3274e2ebdfd51457e))
* configure markdownlint for Release Please compatibility ([ef3acf9](https://github.com/actuarysailor/pre-commit-readme-generator/commit/ef3acf99666947d7e3f06c4602038b454f9a93ed))
* NPM Audit failure ([52be095](https://github.com/actuarysailor/pre-commit-readme-generator/commit/52be095c3a904f6d8e3eb202302fe19c11a0e6ff))
* Pre-commit failures ([edc1639](https://github.com/actuarysailor/pre-commit-readme-generator/commit/edc1639b939a6467414db6ce7cfbe2ef1f933607))
* update Release Please workflow configuration ([d5d4f15](https://github.com/actuarysailor/pre-commit-readme-generator/commit/d5d4f15a7d081578b2ab59125e4af19c6327ec9b))
* use official googleapis/release-please-action ([7e7fb98](https://github.com/actuarysailor/pre-commit-readme-generator/commit/7e7fb987cd34b5a1b1a737da4b7522175ceb93a3))

## [1.0.0](https://github.com/actuarysailor/pre-commit-readme-generator/compare/v0.0.0...v1.0.0) (2025-08-10)

### Features

* **core**: Initial release of pre-commit README generator
* **templates**: Handlebars-based template system with dynamic content
* **config**: JSON-driven configuration with extensive customization options
* **badges**: Support for repository badges (contributors, forks, stars, issues,
license)
* **socials**: Dynamic social media integration in contact sections
* **automation**: Pre-commit hooks for validation and automatic updates
* **testing**: Comprehensive test suite with unit and integration tests
* **ci/cd**: GitHub Actions workflows for continuous integration and releases
* **docs**: Complete documentation including API, FAQ, and examples

### Documentation

* **examples**: Multiple example configurations for different project types
* **templates**: Default Handlebars template with full feature support
* **guides**: Contributing guidelines and repository structure documentation
