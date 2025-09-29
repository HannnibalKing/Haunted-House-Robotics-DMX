# Roadmap & Upgrade Schedule

_Last updated: 2025-09-28_

## Q4 2025 – Mobile App Modernization

- **Expo SDK 52 migration (Week 41)**
  - Run `npx expo install --fix` to align core modules.
  - Replace deprecated `expo-status-bar` usage with new layout APIs.
  - Validate navigation stack after the React Navigation 7 upgrade.
- **Tooling rollout (Week 42)**
  - Add `eslint@^9`, `@react-native-community/eslint-config`, and `prettier` with shared config.
  - Wire `npm run lint` → `eslint --max-warnings=0 .` and `npm run typecheck` → `tsc --noEmit`.
  - Expand Jest coverage to components (`HeatmapLegend`, `RoomCard`, `RoomDetailScreen`).
- **Automation (Week 43)**
  - Gate merges on CI (lint, tests, bundle size via `expo export --experimental-bundle-size`).
  - Capture Expo diagnostics with `npx expo-doctor --fix` weekly.

## Q1 2026 – Hardware Excellence

- PlatformIO integration for each Arduino project (Servo + Ghost) to lock library versions.
- Automated bench diagnostics (`platformio test -e skeleton_bench`, `ghost_bench`).
- Document power budget and safety sheets in `schematics/`.

## Continuous Enhancements

- Lighthouse + HTML validation on every docs PR.
- Combat controller container build published to GHCR with tagged releases.
- Python simulations packaged to PyPI (`haunted-sim-cli`) with semantic releases.
