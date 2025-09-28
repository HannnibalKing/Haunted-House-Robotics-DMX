# Terminal Simulation Demos

Use the `console_demo.py` script to replay haunt robotics storyboards directly from the terminal. Each scenario mimics the timelines used in the three showcase projects.

## Available Scenarios

| Scenario | Command | Highlights |
|----------|---------|------------|
| `skeleton` | `python console_demo.py skeleton` | Servo choreography, DMX fades, motion trigger |  
| `ghost` | `python console_demo.py ghost` | Carriage glide, fog blast, LED strobe |  
| `app` | `python console_demo.py app` | Guest rating arrival, AI blueprint synthesis |

## Flags

- `--speed 2.0` – Run twice as fast while keeping timing ratios.
- `--loop 3` – Replay the same sequence multiple passes.
- `--instant` – Print the entire script with zero delays (useful for demos or CI).

## Example

```powershell
cd simulations
python console_demo.py skeleton --speed 1.5
```

During playback you'll see timestamped cues (e.g., `M29`, `L12`) that match the Arduino and DMX labels in the corresponding hardware projects. This lets viewers visualize the show flow without powering the actual rigs.
