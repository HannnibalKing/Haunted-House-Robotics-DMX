# 📱 Scare Experience Companion App

A cross-platform mobile app (iOS, Android, and web via Expo) that lets guests rate each haunted attraction room, share scare intensity feedback, and generate AI-inspired floor plans of the walkthrough based on crowd input.

## 🎯 Project Goals

- Showcase mobile development with React Native & Expo  
- Collect real-time feedback per attraction and room
- Visualize ratings on a live heat map
- Generate AI-style floor plan suggestions from aggregated reviews
- Export insights for creative and operations teams

## 🛠️ Tech Stack

- **Frontend**: React Native (Expo SDK 50)
- **State Management**: React Context
- **Data Layer**: Local JSON store with mock API adapter
- **Visualization**: Dynamic color scaling, animated cards
- **AI Simulation**: Procedural floor-plan generator (`src/utils/floorplanAI.ts`)
- **Testing**: Jest with React Native Testing Library

## 📂 Project Structure

```
03_scare_experience_app/
├── app/
│   ├── App.tsx
│   ├── app.json
│   ├── babel.config.js
│   ├── package.json
│   ├── metro.config.js
│   ├── src/
│   │   ├── components/
│   │   │   ├── HeatmapLegend.tsx
│   │   │   ├── RoomCard.tsx
│   │   │   └── ScoreBadge.tsx
│   │   ├── context/ExperienceContext.tsx
│   │   ├── data/experienceData.ts
│   │   ├── hooks/useFloorplan.ts
│   │   ├── screens/
│   │   │   ├── DashboardScreen.tsx
│   │   │   └── RoomDetailScreen.tsx
│   │   └── utils/floorplanAI.ts
│   └── __tests__/
│       └── floorplanAI.test.ts
└── README.md (this file)
```

## 🚀 Getting Started

1. Install dependencies:
```powershell
cd app
npm install
```
2. Start the Expo dev server:
```powershell
npm start
```
3. Launch on mobile:
   - Use the Expo Go app (iOS/Android) to scan the QR code.
   - For web preview: press `w` in the Expo CLI.

4. Run tests:  
```powershell
npm test
```

## 🧭 Feature Walkthrough

### Dashboard
- Overview of attractions with average scare scores
- Tap a card to drill into room-level stats
- Heat-map tint indicates guest sentiment (green=fun, red=terrifying)

### Room Detail
- Timeline of feedback entries with emoji-coded thrill level
- Add new ratings with slider + comment field
- AI Suggestions panel renders a generated floor plan text + ASCII diagram
- Share button exports summary JSON for external tools

### AI Floor Plan Generator
- Takes aggregated ratings and crowd descriptors
- Produces pseudo-random layout blueprint (rooms, corridors, props)
- Can export DFX-style JSON for rapid prototyping

## 🔁 Data Flow

1. Guests submit ratings (offline-supported).
2. Ratings stored locally and synced to backend endpoint (mocked).
3. Aggregated stats drive heat maps and timeline.
4. AI module consumes aggregated data to produce blueprint suggestions.

## 📊 Sample Metrics Displayed

- Average scare score per room
- Dwell time estimation (derived from timestamps)
- Popular adjectives used by guests
- Recommended prop density for next iteration

## 🌐 Future Enhancements

- Integrate real-time backend (Supabase/Firebase)
- Use actual LLM API for storyboarding
- Add AR navigation overlays inside attractions
- Support staff-side moderation of comments
- Export in GLSL format for DMX show programming

## 📽️ Demo Video

*[Video placeholder: Screen recording of user browsing rooms, leaving a rating, and generating an AI blueprint]*

---

*Part of the Haunted House Robotics DMX showcase series*