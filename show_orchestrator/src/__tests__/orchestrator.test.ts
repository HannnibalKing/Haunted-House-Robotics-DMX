import { describe, expect, it, vi } from 'vitest';

import { ShowOrchestrator } from '../orchestrator.js';
import type { Step } from '../types.js';

describe('ShowOrchestrator', () => {
  it('publishes mapped events in sequence respecting highlights', async () => {
    vi.useFakeTimers();

    try {
      const steps: Step[] = [
        { cue: 'INIT', description: 'Start', duration: 0 },
        { cue: 'SCARE', description: 'Spook', duration: 0.2, highlight: 'BOO' },
        { cue: 'RESET', description: 'Reset', duration: 0 }
      ];

      const publish = vi.fn(async () => {
        return;
      });

      const mapper = vi
        .fn()
        .mockImplementation((step: Step) => ({
          topic: step.cue.toLowerCase(),
          payload: { marker: step.cue }
        }));

      const orchestrator = new ShowOrchestrator(
        { mqttUrl: 'mqtt://test', topicPrefix: 'haunt', speed: 2 },
        publish,
        mapper
      );

      const runPromise = orchestrator.runScenario('demo', steps);

      await vi.runAllTimersAsync();
      await runPromise;

      expect(mapper).toHaveBeenCalledTimes(3);

      expect(publish).toHaveBeenNthCalledWith(1, 'haunt/init', {
        marker: 'INIT',
        cue: 'INIT',
        description: 'Start'
      });

      expect(publish).toHaveBeenNthCalledWith(2, 'haunt/scare', {
        marker: 'SCARE',
        cue: 'SCARE',
        description: 'Spook',
        highlight: 'BOO'
      });

      expect(publish).toHaveBeenNthCalledWith(3, 'haunt/reset', {
        marker: 'RESET',
        cue: 'RESET',
        description: 'Reset'
      });
    } finally {
      vi.useRealTimers();
    }
  });

  it('skips unmapped cues without rejecting', async () => {
    vi.useFakeTimers();

    try {
      const publish = vi.fn(async () => {
        return;
      });
      const mapper = vi.fn((step: Step) => (step.cue === 'KNOWN' ? { topic: 'known', payload: {} } : null));

      const orchestrator = new ShowOrchestrator(
        { mqttUrl: 'mqtt://test', topicPrefix: 'haunt', speed: 1 },
        publish,
        mapper
      );

      const steps: Step[] = [
        { cue: 'UNKNOWN', description: 'ignored', duration: 0 },
        { cue: 'KNOWN', description: 'processed', duration: 0 }
      ];

      const runPromise = orchestrator.runScenario('demo', steps);

      await vi.runAllTimersAsync();
      await runPromise;

      expect(publish).toHaveBeenCalledTimes(1);
      expect(publish).toHaveBeenCalledWith('haunt/known', {
        cue: 'KNOWN',
        description: 'processed'
      });
    } finally {
      vi.useRealTimers();
    }
  });
});
