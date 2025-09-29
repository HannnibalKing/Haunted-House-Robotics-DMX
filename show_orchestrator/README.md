# Show Orchestrator

A TypeScript control service that replays pre-scripted haunted attraction scenarios and publishes hardware commands over MQTT. It bridges the `haunted_sim` timeline data with animatronics, lighting, and audio endpoints so you can dry-run effects or execute the full show in real time.

## Prerequisites

- Node.js 20 or newer (required for native `NodeNext` ESM support)
- An MQTT broker reachable from the orchestrator host (e.g. Mosquitto)
- Optional: the [`haunted_sim`](../simulations/README.md) package for generating scenarios

## Installation

```bash
npm install
```

## Usage

Build the service once, then run it against the desired scenario:

```bash
npm run build
npm start -- --scenario skeleton
```

During development you can use the TypeScript entrypoint directly:

```bash
npm run dev -- --scenario ghost --dry-run
```

### CLI flags

| Flag | Alias | Description |
| --- | --- | --- |
| `--scenario <name>` | `-s` | Scenario key to execute (`skeleton`, `ghost`, `app`, or any future additions). Defaults to `skeleton`. |
| `--speed <multiplier>` | `-p` | Playback speed multiplier. `2` plays twice as fast. Defaults to `SIM_SPEED` env or `1`. |
| `--mqtt-url <url>` | `-u` | MQTT broker URL. Defaults to `MQTT_URL` env or `mqtt://localhost:1883`. |
| `--topic-prefix <prefix>` | `-t` | Prefix prepended to every published topic. Defaults to `TOPIC_PREFIX` env or `haunt`. |
| `--dry-run` | – | Skip MQTT publishing and log the payloads instead. Useful for rehearsals and CI. |
| `--list` | `-l` | Print all available scenarios and exit. |
| `--help` | `-h` | Show usage and exit. |

All flags can also be supplied as environment variables:

| Variable | Purpose | Default |
| --- | --- | --- |
| `SCENARIO` | Scenario key when not provided via CLI. | `skeleton` |
| `SIM_SPEED` | Playback multiplier. | `1` |
| `MQTT_URL` | Broker URL. | `mqtt://localhost:1883` |
| `TOPIC_PREFIX` | Topic namespace. | `haunt` |

### MQTT topics

Each cue is translated to a concrete MQTT topic under the configured prefix. For example, running the `skeleton` scenario with the default prefix publishes the following representative messages:

- `haunt/skeleton/system` – power and idle commands
- `haunt/skeleton/servos/head` – head positioning updates
- `haunt/lighting/dmx` – DMX wash / strobe cues
- `haunt/skeleton/sensors/pir` – motion sensor triggers (mirrors PIR events in the script)

Payloads always include the originating cue, human-readable description, and (where applicable) the scenario highlight banner—making it easy for downstream consumers to sync media, servos, or dashboards.

## Testing

```bash
npm test
```

The Vitest suite exercises the cue mappers to guarantee full coverage and verifies that the orchestrator publishes events (and highlights) in order while gracefully skipping unmapped cues.

## Linting & builds

```bash
npm run lint
npm run build
```

## Production deployment tips

- Run the orchestrator as a system service (systemd, PM2, Docker) and point it at your production MQTT broker.
- Pair it with `show_orchestrator --dry-run` in CI to validate new timeline scripts before showtime.
- Subscribe field hardware (e.g., DMX controllers, animatronics firmware) to the topics shown above to complete the end-to-end loop.
