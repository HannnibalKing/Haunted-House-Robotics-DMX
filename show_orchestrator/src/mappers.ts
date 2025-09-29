import { EventMapper, Step } from './types.js';

const skeletonMap: Record<string, { topic: string; payload: Record<string, unknown> }> = {
  INIT: { topic: 'skeleton/system', payload: { command: 'power_on' } },
  M05: { topic: 'skeleton/servos/head', payload: { position: 'neutral' } },
  M29: { topic: 'skeleton/servos/head', payload: { position: 'target' } },
  M33: { topic: 'skeleton/servos/arms', payload: { position: 'raise' } },
  S11: { topic: 'skeleton/servos/fingers', payload: { mode: 'idle_twitch' } },
  AUX: { topic: 'skeleton/audio', payload: { track: 'jaw_chatter', volume: 0.8 } },
  L12: { topic: 'lighting/dmx', payload: { scene: 'ember_red', intensity: 0.6 } },
  DMX: { topic: 'lighting/dmx', payload: { scene: 'strobe_white', intensity: 1 } },
  WAIT: { topic: 'skeleton/state', payload: { mode: 'hold_pose' } },
  PIR: { topic: 'skeleton/sensors/pir', payload: { state: 'triggered' } },
  RESET: { topic: 'skeleton/servos/all', payload: { position: 'home' } }
};

const ghostMap: Record<string, { topic: string; payload: Record<string, unknown> }> = {
  INIT: { topic: 'ghost/system', payload: { command: 'init' } },
  L21: { topic: 'lighting/ghost', payload: { mode: 'cyan_breathe' } },
  PIR: { topic: 'ghost/sensors/pir', payload: { state: 'triggered' } },
  M14: { topic: 'ghost/carriage', payload: { action: 'glide', distance_m: 1.2, speed: 'show' } },
  FX1: { topic: 'ghost/effects', payload: { fog: 'burst', audio: 'shriek' } },
  L99: { topic: 'lighting/ghost', payload: { mode: 'strobe', colors: ['white', 'amber'] } },
  WAIT: { topic: 'ghost/state', payload: { mode: 'hover', timeout_s: 0.5 } },
  M02: { topic: 'ghost/carriage', payload: { action: 'return_home' } },
  RESET: { topic: 'ghost/system', payload: { command: 'idle' } }
};

const appMap: Record<string, { topic: string; payload: Record<string, unknown> }> = {
  BOOT: { topic: 'app/dashboard', payload: { state: 'boot' } },
  API: { topic: 'app/sync', payload: { source: 'analytics_cache' } },
  POLL: { topic: 'app/ratings', payload: { roomId: 'room-02', score: 9.2 } },
  AI: { topic: 'app/ai', payload: { action: 'generate_floorplan' } },
  PUSH: { topic: 'app/broadcast', payload: { target: 'tablets', message: 'heatmap_update' } }
};

const routeByCue: Record<string, (cue: string) => { topic: string; payload: Record<string, unknown> } | undefined> = {
  skeleton: (cue: string) => skeletonMap[cue],
  ghost: (cue: string) => ghostMap[cue],
  app: (cue: string) => appMap[cue]
};

export const createMapper = (scenarioName: keyof typeof routeByCue): EventMapper => {
  const lookup = routeByCue[scenarioName];
  return (step: Step) => lookup(step.cue) ?? null;
};
