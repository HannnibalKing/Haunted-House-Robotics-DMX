import { Step } from './types.js';

export const skeletonScenario: Step[] = [
  { cue: 'INIT', description: 'Power on animatronic skeleton core', duration: 0 },
  { cue: 'M05', description: 'Set head servo to neutral', duration: 0 },
  { cue: 'L12', description: 'Fade DMX wash to ember red', duration: 0.3 },
  { cue: 'S11', description: 'Idle loop: finger twitch', duration: 0.5 },
  { cue: 'PIR', description: 'Motion trip detected', duration: 0.2, highlight: 'VISITOR ENTERS' },
  { cue: 'M29', description: 'Snap head to visitor', duration: 0 },
  { cue: 'M33', description: 'Raise both arms', duration: 0.4 },
  { cue: 'AUX', description: 'Trigger jaw chatter synced to audio', duration: 0.5 },
  { cue: 'DMX', description: 'Flash strobes + cold white backlight', duration: 0.3 },
  { cue: 'WAIT', description: 'Hold pose', duration: 0.5 },
  { cue: 'RESET', description: 'Arms down, lights to idle', duration: 0 }
];

export const ghostScenario: Step[] = [
  { cue: 'INIT', description: 'Pre-charge carriage and test limit switches', duration: 0 },
  { cue: 'L21', description: 'Set LED strip to cyan breathing', duration: 0 },
  { cue: 'PIR', description: 'Motion detect at hallway', duration: 0.2, highlight: 'GUEST APPROACH' },
  { cue: 'M14', description: 'Carriage glide forward 1.2m', duration: 0.6 },
  { cue: 'FX1', description: 'Fog blast + shriek sample', duration: 0.4 },
  { cue: 'L99', description: 'Strobe white / amber alternation', duration: 0.4 },
  { cue: 'WAIT', description: 'Hover at guest', duration: 0.5 },
  { cue: 'M02', description: 'Retreat carriage to home', duration: 0.6 },
  { cue: 'RESET', description: 'Resume cyan breathing + cooldown', duration: 0 }
];

export const appScenario: Step[] = [
  { cue: 'BOOT', description: 'Launch Scare Experience dashboard', duration: 0 },
  { cue: 'API', description: 'Sync overnight analytics cache', duration: 0 },
  { cue: 'POLL', description: 'Receive new rating: Room 02 score 9.2', duration: 0 },
  { cue: 'AI', description: 'Generate floorplan suggestion', duration: 0.3, highlight: 'AI SYNTH' },
  { cue: 'PUSH', description: 'Broadcast heatmap update to tablets', duration: 0 }
];

export const scenarios = {
  skeleton: skeletonScenario,
  ghost: ghostScenario,
  app: appScenario
};

export type ScenarioName = keyof typeof scenarios;
