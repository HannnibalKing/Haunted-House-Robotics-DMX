import pino from 'pino';
import type { MqttClient } from 'mqtt';

import { ShowOrchestrator } from './orchestrator.js';
import { createMapper } from './mappers.js';
import { scenarios, ScenarioName } from './scenarios.js';
import { createMqttPublisher } from './publisher.js';

type CliOptions = {
  scenario?: string;
  speed?: string;
  mqttUrl?: string;
  topicPrefix?: string;
  dryRun?: boolean;
  list?: boolean;
  help?: boolean;
};

const logger = pino({ name: 'show-orchestrator-cli' });
const availableScenarios = Object.keys(scenarios) as ScenarioName[];

const parseArgs = (argv: string[]): CliOptions => {
  const options: CliOptions = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }

    if (arg === '--list' || arg === '-l') {
      options.list = true;
      continue;
    }

    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }

    if (arg === '-s') {
      const value = argv[i + 1];
      if (!value) {
        throw new Error('Missing value for flag -s');
      }
      options.scenario = value;
      i += 1;
      continue;
    }

    if (arg === '-u') {
      const value = argv[i + 1];
      if (!value) {
        throw new Error('Missing value for flag -u');
      }
      options.mqttUrl = value;
      i += 1;
      continue;
    }

    if (arg === '-t') {
      const value = argv[i + 1];
      if (!value) {
        throw new Error('Missing value for flag -t');
      }
      options.topicPrefix = value;
      i += 1;
      continue;
    }

    if (arg === '-p') {
      const value = argv[i + 1];
      if (!value) {
        throw new Error('Missing value for flag -p');
      }
      options.speed = value;
      i += 1;
      continue;
    }

    if (arg.startsWith('--')) {
      const [key, value] = arg.includes('=') ? arg.split('=') : [arg, argv[i + 1]];

      if (!value || value.startsWith('--')) {
        throw new Error(`Missing value for flag ${key}`);
      }

      const normalizedKey = key.replace(/^--/, '');

      switch (normalizedKey) {
        case 'scenario':
          options.scenario = value;
          break;
        case 'speed':
          options.speed = value;
          break;
        case 'mqtt-url':
          options.mqttUrl = value;
          break;
        case 'topic-prefix':
          options.topicPrefix = value;
          break;
        case 's':
          options.scenario = value;
          break;
        case 'u':
          options.mqttUrl = value;
          break;
        case 't':
          options.topicPrefix = value;
          break;
        case 'p':
          options.speed = value;
          break;
        default:
          throw new Error(`Unknown flag ${key}`);
      }

      if (!arg.includes('=')) {
        i += 1; // skip the value we just consumed
      }
    } else if (!options.scenario) {
      options.scenario = arg;
    } else {
      throw new Error(`Unexpected positional argument ${arg}`);
    }
  }

  return options;
};

const printUsage = () => {
  const scenarioList = availableScenarios.join(', ');
  logger.info(
    { scenarioList },
    `Usage: node dist/index.js [--scenario <name>] [--speed <multiplier>] [--mqtt-url <url>] [--topic-prefix <prefix>] [--dry-run]\n\n` +
      `Flags:\n` +
  `  --scenario, -s     Scenario name (default: skeleton)\n` +
  `  --speed, -p        Playback speed multiplier (default: from SIM_SPEED env or 1)\n` +
  `  --mqtt-url, -u     MQTT broker URL (default: mqtt://localhost:1883)\n` +
  `  --topic-prefix, -t Topic namespace prefix (default: haunt)\n` +
      `  --dry-run          Print events instead of publishing\n` +
      `  --list, -l         List available scenarios\n` +
      `  --help, -h         Show this message`
  );
};

let client: MqttClient | null = null;
let shuttingDown = false;

const shutdown = (code: number, reason?: unknown) => {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;

  if (reason) {
    logger.error({ reason }, 'shutting down');
  } else {
    logger.info({ code }, 'shutting down');
  }

  if (client) {
    client.end(true, () => process.exit(code));
  } else {
    process.exit(code);
  }
};

const bootstrap = async () => {
  let options: CliOptions;

  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    logger.error({ error }, 'failed to parse arguments');
    printUsage();
    shutdown(1, error);
    return;
  }

  if (options.help) {
    printUsage();
    shutdown(0);
    return;
  }

  if (options.list) {
    logger.info({ scenarios: availableScenarios }, 'available scenarios');
    shutdown(0);
    return;
  }

  const scenarioName = (options.scenario ?? process.env.SCENARIO ?? 'skeleton') as ScenarioName;

  if (!availableScenarios.includes(scenarioName)) {
    logger.error({ requested: scenarioName, available: availableScenarios }, 'unknown scenario');
    shutdown(1);
    return;
  }

  const speedEnv = options.speed ?? process.env.SIM_SPEED ?? '1';
  const speed = Number(speedEnv);

  if (!Number.isFinite(speed) || speed <= 0) {
    logger.error({ value: speedEnv }, 'invalid speed multiplier');
    shutdown(1);
    return;
  }

  const mqttUrl = options.mqttUrl ?? process.env.MQTT_URL ?? 'mqtt://localhost:1883';
  const topicPrefix = options.topicPrefix ?? process.env.TOPIC_PREFIX ?? 'haunt';

  logger.info({ scenario: scenarioName, mqttUrl, topicPrefix, speed, dryRun: options.dryRun ?? false }, 'starting orchestrator');

  const registerHandlers = () => {
    process.on('SIGINT', () => shutdown(0));
    process.on('SIGTERM', () => shutdown(0));
    process.on('unhandledRejection', (reason) => shutdown(1, reason));
    process.on('uncaughtException', (error) => shutdown(1, error));
  };

  registerHandlers();

  let publishFn: (topic: string, payload: Record<string, unknown>) => Promise<void>;

  if (options.dryRun) {
    publishFn = async (topic, payload) => {
      logger.info({ topic, payload }, 'dry-run publish');
    };
  } else {
    const publisher = createMqttPublisher(mqttUrl);
    client = publisher.client;
    publishFn = publisher.publish;
  }

  const orchestrator = new ShowOrchestrator(
    { mqttUrl, topicPrefix, speed },
    publishFn,
    createMapper(scenarioName)
  );

  try {
    await orchestrator.runScenario(scenarioName, scenarios[scenarioName]);
    shutdown(0);
  } catch (error) {
    logger.error({ error }, 'scenario failed');
    shutdown(1, error);
  }
};

bootstrap();
