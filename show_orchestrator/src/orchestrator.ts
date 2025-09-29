import { setTimeout as delay } from 'timers/promises';
import pino from 'pino';
import { EventMapper, OrchestratorConfig, Step } from './types.js';

export class ShowOrchestrator {
  private readonly logger = pino({ name: 'show-orchestrator' });

  constructor(
    private readonly config: OrchestratorConfig,
    private readonly publish: (topic: string, payload: Record<string, unknown>) => Promise<void>,
    private readonly mapEvent: EventMapper
  ) {}

  async runScenario(name: string, steps: Step[]): Promise<void> {
    this.logger.info({ name, steps: steps.length }, 'starting scenario');

    for (const step of steps) {
      const mapped = this.mapEvent(step);

      if (mapped) {
        const topic = `${this.config.topicPrefix}/${mapped.topic}`;
        await this.publish(topic, {
          ...mapped.payload,
          cue: step.cue,
          description: step.description,
          ...(step.highlight ? { highlight: step.highlight } : {})
        });
        this.logger.debug({ step: step.cue, topic }, 'published event');
      } else {
        this.logger.warn({ step: step.cue }, 'no mapping for cue');
      }

      const waitMs = (step.duration / this.config.speed) * 1000;
      if (waitMs > 0) {
        await delay(waitMs);
      }
    }

    this.logger.info({ name }, 'scenario complete');
  }
}
