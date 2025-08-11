<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->
<!-- PROJECT LOGO AND TITLE -->
<!-- Improved compatibility of back to top link:
See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<div align="center">
  <h1>Pre-commit README Generator</h1>
  <a href="https://github.com/actuarysailor/pre-commit-readme-generator">
    <img src="images/logo.svg" alt="Logo" width="80" height="80">
  </a>
</div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional,
*** concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
</div>
<!-- PROJECT DESCRIPTION -->

<div align="center">
  <p align="center">
    A pre-commit hook set for generating and validating README files from Handlebars templates and JSON configurations. Ensures README.md stays in sync with template changes.
Use the update hook to generate, and the validate hook to ensure no uncommitted changes.
    <br />
    <a href="https://github.com/actuarysailor/pre-commit-readme-generator">
      <strong>Explore the docs »</strong>
    </a>
    <br />
    <br />
    <a href="https://github.com/actuarysailor/pre-commit-readme-generator">
      View Demo
    </a>
    ·
    <a href="https://github.com/actuarysailor/pre-commit-readme-generator/issues/new?labels=bug&template=bug-report---.md">
      Report Bug
    </a>
    ·
    <a href="https://github.com/actuarysailor/pre-commit-readme-generator/issues/new?labels=enhancement&template=feature-request---.md">
      Request Feature
    </a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="docs/FAQ.md">FAQ</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This pre-commit hook helps maintain consistent README files by validating that
your README.md matches the output generated from your Handlebars template and
JSON configuration. It ensures documentation stays up-to-date automatically.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your
project. Leave any add-ons/plugins for the acknowledgements section. Here are a
few examples.

- [![Node.js][Node.js.shield]][Node.js-url]
- [![Handlebars][Handlebars.shield]][Handlebars-url]
- [![Pre-commit][Pre-commit.shield]][Pre-commit-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project
locally. To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how
to install them.

- Node.js

  ```sh
  npm install npm@latest -g
  ```

- Pre-commit

  ```sh
  npm install -g pre-commit
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and
setting up your app. This template doesn't rely on any external dependencies
or services._

1. Add this to your `.pre-commit-config.yaml`:

   ```yaml
   repos:
     - repo: https://github.com/actuarysailor/pre-commit-readme-generator
       rev: v1.0.0  # Use the ref you want to point at
       hooks:
         - id: readme-generator-test
   ```

2. Clone the repo (if contributing)

   ```sh
   git clone https://github.com/actuarysailor/pre-commit-readme-generator.git
   ```

3. Install NPM packages

   ```sh
   npm install
   ```

4. Create your configuration file

   ```json
   {
     "project": {
       "title": "Your Project Name",
       "description": "Your project description"
     }
   }
   ```

5. Generate your README

   ```sh
   node src/generator.js your-config.json README.md templates/default.hbs
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Add the hooks to your `.pre-commit-config.yaml` in this order (generate first, validate last):

```yaml
repos:
  - repo: https://github.com/actuarysailor/pre-commit-readme-generator
    rev: v1.0.0  # Use the ref you want to point at
    hooks:
      - id: readme-generator-update   # Generates/updates README.md from template/config
      # ... other hooks (linters, formatters, etc.) ...
      - id: readme-generator-validate # Fails if README.md (or any file) has uncommitted changes
```

### Available Hooks

- **`readme-generator-update`**: Generates or updates your `README.md` from the template and configuration
- **`readme-generator-validate`**: Fails if `README.md` (or any file) has uncommitted changes (does not generate or update)
- **`file-validate-no-diff`**: General-purpose file validation for any file(s)

### Repository Structure

Your repository should have:

- `BLANK_README.md` - Handlebars template
- `configs/example.json` - Configuration file
- `README.md` - Generated output

The update hook will generate or update `README.md` from the template and config. The validate hook will ensure it is committed and unchanged after all other hooks run.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Add support for multiple template formats
  - [ ] Mustache templates
  - [ ] Liquid templates
- [ ] Enhanced validation options
- [ ] Custom helper functions
- [x] Automated releases and changelog generation
- [ ] Multi-language documentation support
- [ ] Automatic code documentation extraction
  - [ ] Terraform/OpenTofu resource documentation
  - [ ] API endpoint documentation from code
  - [ ] Function/method signature extraction
  - [ ] Dependency analysis and documentation
  - [ ] Output schema documentation
- [ ] Advanced integrations
  - [ ] Docker image documentation
  - [ ] GitHub Actions workflow documentation
  - [ ] Database schema documentation

See the [open issues](https://github.com/actuarysailor/pre-commit-readme-generator/issues)
for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to
learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and
create a pull request. You can also simply open an issue with the tag
"enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors

<a href="https://github.com/actuarysailor/pre-commit-readme-generator/graphs/contributors">
  <img
    src="https://contrib.rocks/image?repo=actuarysailor/pre-commit-readme-generator"
    alt="contrib.rocks image"
  />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

| | |
|:---:|:---|
| <img src="https://github.com/actuarysailor.png" alt="your-display-name-or-handle" width="50" height="50" style="border-radius: 50%;"> | **your-display-name-or-handle** |
| 📧 | [your.email@example.com](mailto:your.email@example.com) |
| 🐙 | [@actuarysailor](https://github.com/actuarysailor) |

**Project Link:** [https://github.com/actuarysailor/pre-commit-readme-generator](https://github.com/actuarysailor/pre-commit-readme-generator)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit
to. I've included a few of my favorites to kick things off!

- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
- [Handlebars.js](https://handlebarsjs.com/)
- [Pre-commit Framework](https://pre-commit.com/)
- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Pages](https://pages.github.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/actuarysailor/pre-commit-readme-generator.svg?style=for-the-badge
[contributors-url]: https://github.com/actuarysailor/pre-commit-readme-generator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/actuarysailor/pre-commit-readme-generator.svg?style=for-the-badge
[forks-url]: https://github.com/actuarysailor/pre-commit-readme-generator/network/members
[stars-shield]: https://img.shields.io/github/stars/actuarysailor/pre-commit-readme-generator.svg?style=for-the-badge
[stars-url]: https://github.com/actuarysailor/pre-commit-readme-generator/stargazers
[issues-shield]: https://img.shields.io/github/issues/actuarysailor/pre-commit-readme-generator.svg?style=for-the-badge
[issues-url]: https://github.com/actuarysailor/pre-commit-readme-generator/issues
[license-shield]: https://img.shields.io/github/license/actuarysailor/pre-commit-readme-generator.svg?style=for-the-badge
[license-url]: https://github.com/actuarysailor/pre-commit-readme-generator/blob/master/LICENSE
[product-screenshot]: images/screenshot.svg
[Node.js.shield]: https://img.shields.io/badge/Node.js-43853D?style&#x3D;for-the-badge&amp;logo&#x3D;node.js&amp;logoColor&#x3D;white
[Node.js-url]: https://nodejs.org/
[Handlebars.shield]: https://img.shields.io/badge/Handlebars-f0772b?style&#x3D;for-the-badge&amp;logo&#x3D;handlebarsdotjs&amp;logoColor&#x3D;white
[Handlebars-url]: https://handlebarsjs.com/
[Pre-commit.shield]: https://img.shields.io/badge/pre--commit-FAB040?style&#x3D;for-the-badge&amp;logo&#x3D;pre-commit&amp;logoColor&#x3D;black
[Pre-commit-url]: https://pre-commit.com/
