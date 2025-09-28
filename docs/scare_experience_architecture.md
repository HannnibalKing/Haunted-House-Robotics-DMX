# Scare Experience App Architecture

## Overview

The Scare Experience companion app is an Expo + React Native project designed for haunted attractions to collect real-time guest feedback. It ships with:

- Navigation stack for dashboard + room detail flows
- Global state via React Context for offline-friendly data storage
- An AI-inspired floor plan generator that converts crowd sentiment into ASCII layout suggestions
- Jest unit tests validating the floor plan synthesis logic

## Data Flow

```
Guest Input -> ExperienceContext.submitRating -> Local State Update
                |                               |
                v                               v
           RoomDetailScreen                DashboardScreen
                |                               |
                +----> useFloorplan hook -------+
                                |
                                v
                        floorplanAI.generateFloorplan
```

## Module Responsibilities

- `App.tsx`: Bootstraps navigation + context, applies dark theme chrome.
- `ExperienceContext`: Stores attractions, rooms, and handles new rating submissions.
- `hooks/useFloorplan`: Memoizes floor plan suggestions per attraction.
- `screens/DashboardScreen`: Lists all attractions with heat map cues.
- `screens/RoomDetailScreen`: Accepts new ratings and renders ASCII floor plan advice.
- `utils/floorplanAI.ts`: Generates pseudo-randomized room coordinates based on score + intensity.

## AI Floor Plan Strategy

1. **Normalization** – Convert scare scores into a 0–1 range.
2. **Orbit Placement** – Distribute rooms around the grid center using polar coordinates.
3. **Heat Weighting** – Enhance total heat signature by intensity multipliers.
4. **Summary** – Compose actionable text referencing hot spots.
5. **ASCII Renderer** – Paint a 7×7 grid with start (S) + alphabetical room markers.

This deterministic yet varied approach produces share-ready layout drafts that spark creative conversation with scenic designers.
