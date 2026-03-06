# Contributing

Thanks for your interest in contributing! This is a personal website, so the scope
for contributions is intentionally narrow. Bug fixes and well-scoped new features
are welcome; cosmetic or opinionated changes are generally not.

## Ground Rules

1. **Open an issue first.** Before writing any code, create a GitHub issue describing
   the bug you found or the feature you'd like to propose. Wait for a response before
   starting work - this avoids wasted effort on changes that won't be merged.

2. **Accepted contribution types:**
   - Bug fixes (broken links, rendering issues, accessibility problems, etc.)
   - New features that have been approved via an issue discussion

3. **Not accepted:**
   - Style or design opinion changes
   - Dependency bumps without a clear reason
   - Refactors that don't fix a bug or add an approved feature

## How to Contribute

1. Fork the repository and create a branch from `main`.
2. Make your changes in the new branch.
3. Test locally — open the HTML files in a browser or run the Docker image:
   ```bash
   docker build -f docker/Dockerfile -t yush-dev .
   docker run -p 8080:80 yush-dev
   ```
4. Open a pull request against `main` and reference the issue it addresses.

## Pull Request Guidelines

- Keep changes focused. One PR per bug fix or feature.
- Write a clear description of what changed and why.
- Ensure the site renders correctly across major browsers (Chrome, Firefox, Safari).

## Code of Conduct

Be respectful. Rude, dismissive, or harassing behaviour will result in your
contribution being closed and further participation being blocked.

## License

By contributing, you agree that your contributions will be licensed under the
[MIT License](LICENSE).
