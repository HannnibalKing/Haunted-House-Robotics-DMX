export type Step = {
  cue: string;
  description: string;
  duration: number;
  highlight?: string;
};

export type ScenarioEvent = {
  cue: string;
  description: string;
  duration: number;
  highlight?: string;
};

export type OrchestratorConfig = {
  mqttUrl: string;
  topicPrefix: string;
  speed: number;
};

export type PublishFn = (topic: string, payload: Record<string, unknown>) => Promise<void>;

export type EventMapper = (step: Step) => { topic: string; payload: Record<string, unknown> } | null;
