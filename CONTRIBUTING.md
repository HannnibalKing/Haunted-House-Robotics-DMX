# Contributing Guide

Thanks for your interest in Haunted House Robotics DMX! This repository powers multiple demos (Arduino builds, Expo mobile app, Node.js control room, static docs, and Python simulations). To keep the stack maintainable we follow the workflow below.

## Getting Started

1. **Fork the repo** and create a feature branch:
   ```powershell
   git checkout -b feature/my-update
   ```
2. **Install tools** for the area you plan to touch:
   - Arduino projects: [PlatformIO](https://platformio.org/) or Arduino IDE 2.x
   - Expo app: Node.js 18 LTS + npm 9 (`npm install --global expo-cli` optional)
   - Combat controller: Node.js 18 LTS (ships with npm)
   - Python simulations: Python 3.11 with `pipx` or virtualenv

## Code Quality

- Run the automated checks before pushing:
  ```powershell
  pnpm lint   # or npm run lint-app / lint-controller depending on the package
  pnpm test   # or npm run test-* scripts
  poe docs:audit  # Lighthouse & HTML validation (see docs/README)
  ```
- Keep TypeScript strict, prefer explicit types, and avoid unused exports.
- For Arduino sketches, use `clang-format` (Google style) and respect `Config.h` constants.
- Python code must pass `ruff` linting and `pytest`.

## Commit & PR Guidelines

- Use [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat: add mqtt health checks`).
- Rebase on `main` before opening a PR and ensure CI is green.
- Reference relevant issues or roadmap entries in the PR template.
- Add screenshots/GIFs for UI changes and wiring photos for hardware updates.

## Release Checklist

- Update docs (`docs/index.html`, README, schematics) to reflect new features.
- Bump versions in relevant manifests (`package.json`, `pyproject.toml`, `platformio.ini`).
- Tag releases using `vX.Y.Z` and publish GitHub Pages if the docs change.

## Roadmap & Scheduling

See `docs/roadmap.md` for live upgrade plans (Expo SDK, lint tooling, docs pipeline, etc.). Align contributions with the scheduled milestones and coordinate through issues before starting major rewrites.

Happy haunting and prototyping!
