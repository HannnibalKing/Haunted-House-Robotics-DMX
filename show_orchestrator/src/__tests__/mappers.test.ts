import { describe, expect, it } from 'vitest';

import { createMapper } from '../mappers.js';
import { scenarios } from '../scenarios.js';

const skeletonStep = scenarios.skeleton[0];

describe('createMapper', () => {
  it('returns mapped event payload for known cues', () => {
    const mapper = createMapper('skeleton');

    const event = mapper(skeletonStep);

    expect(event).toEqual({
      topic: 'skeleton/system',
      payload: { command: 'power_on' }
    });
  });

  it('returns null for unknown cues', () => {
    const mapper = createMapper('skeleton');

    const event = mapper({ ...skeletonStep, cue: 'UNKNOWN_CUE' });

    expect(event).toBeNull();
  });

  it('supports every scenario key exposed', () => {
    const scenarioNames = Object.keys(scenarios);

    for (const scenario of scenarioNames) {
      const mapper = createMapper(scenario as keyof typeof scenarios);
      const steps = scenarios[scenario as keyof typeof scenarios];

      for (const step of steps) {
        const mapped = mapper(step);
        expect(mapped).not.toBeUndefined();
      }
    }
  });
});
