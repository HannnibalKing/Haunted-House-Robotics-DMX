# 👻 Motion-Activated Ghost Animatronic

A hanging ghost that swoops forward and glows when visitors approach. The system uses a PIR sensor to detect motion, a stepper motor to move the ghost along a cable, an addressable LED strip for lighting, and a DMX channel to sync with venue lighting.

## 🎯 Project Overview

This project demonstrates:
- Motion detection using PIR sensors  
- Stepper motor control with acceleration profiles
- Addressable LED animation (WS2812B)
- DMX512 lighting integration for show control
- Reactive sound effect triggering (optional)

## 🛠️ Hardware Components

| Component | Quantity | Notes |
|-----------|----------|-------|
| Arduino Nano | 1 | Compact for mounting near mechanism |
| PIR Motion Sensor (HC-SR501) | 1 | Detects approaching guests |
| Stepper Motor (28BYJ-48) + ULN2003 Driver | 1 | Moves the ghost carriage |
| WS2812B LED Strip (30 LEDs) | 1 | Provides eerie glow |
| MOSFET Module (IRLZ44N) | 1 | Switches 12V fog machine or fan |
| MP3 Player Module (DFPlayer Mini) | 1 | Optional sound effects |
| 12V Power Supply (5A) | 1 | Shared by motor and LEDs |
| 5V Buck Converter | 1 | Powers Arduino and LEDs |
| Limit Switches | 2 | Define travel endpoints |

## 🔧 Mechanical Setup

1. Mount stepper motor to pulley housing above walkway.
2. Run cable through pulley to ghost carriage.
3. Attach carriage to cable and balance weight.
4. Install limit switches at home and end positions.
5. Route wiring along truss with zip ties.

## 🧠 Control Logic

1. Ghost idles near ceiling with soft blue lighting.
2. PIR sensor triggers when guest enters detection zone.
3. Ghost glides forward (1.2m) with glowing white LEDs.
4. Optional fog blast and sound effect plays.
5. Ghost retracts back to home and LEDs fade to idle color.
6. System enforces cooldown before next trigger.

## 💻 Code Overview

```
code/
├── motion_ghost.ino        // Main Arduino logic
├── GhostMotion.h/.cpp      // Stepper control and choreography
├── LightingController.h/.cpp // WS2812 animations
├── SensorManager.h/.cpp    // PIR + limit switch handling
└── Config.h                // Pin mappings and timing constants
```

### Uploading the Sketch
1. Install Arduino libraries: `AccelStepper`, `Adafruit_NeoPixel`, and `DMXSerial`.
2. Open `code/motion_ghost.ino` in the Arduino IDE; the helper `.cpp/.h` files compile automatically.
3. Configure the step count in `Config.h` to match your pulley distance (`GHOST_TRAVEL_STEPS`).
4. Connect the Arduino Nano via USB, choose the correct board & port, then upload.
5. Use the serial monitor at 115200 baud to verify limit switch events before activating the fog machine.

### PlatformIO + Bench Diagnostics

```bash
pio run -e ghost_main            # Compile production firmware
pio run -e ghost_bench -t upload # Flash carriage + LED diagnostics
pio device monitor -b 115200     # Watch glide + strobe telemetry
```

The bench program glides the carriage forward/back and strobes the LED strip so you can validate power and wiring before venue deployment.

### Libraries Used
- `AccelStepper` for smooth stepper movement
- `Adafruit_NeoPixel` for WS2812 control
- `DMXSerial` (optional) for venue lighting cues

## 🚀 Build Steps

1. Wire all components per schematic.
2. Install the required Arduino libraries.
3. Upload `motion_ghost.ino` to Arduino Nano.
4. Test limit switches and PIR sensor using serial monitor.
5. Adjust acceleration/speed parameters for smooth travel.

## ⚙️ Configuration Parameters

- **GHOST_TRAVEL_STEPS**: number of stepper steps for full travel
- **COOLDOWN_MS**: cooldown between triggers (default 12s)
- **IDLE_LED_COLOR**: base color when ghost is idle
- **TRIGGER_LED_PATTERN**: color sequence during scare

## 🔁 Operating Modes

| Mode | Description | Lighting |
|------|-------------|----------|
| Idle | Ghost near ceiling, slow breathing light | Dim cyan |
| Approach | PIR triggered, ghost slides forward | Bright white strobe |
| Retreat | Ghost retracts to home position | Purple fade |
| Hold | Manual override via DMX channel | Red warning |

## 🔍 Troubleshooting

- **Ghost stops mid-track**: check limit switches or reduce acceleration.
- **LEDs flicker**: ensure dedicated 5V line with ground reference.
- **False triggers**: adjust PIR sensitivity and angle.
- **Stepper chatter**: confirm ULN2003 wiring sequence.

## 📸 Demo Shot List

1. Idle ghost with ambient lighting.
2. Visitor approaching, PIR LED lights up.
3. Ghost lunging forward with bright LEDs.
4. Fog burst as ghost reaches guest.
5. Ghost retracting with purple trailing light.

## �️ Demo Video

*[Video placeholder: Ghost glides toward guests, LEDs pulsing while fog bursts at full extension]*

## �📄 License

MIT License - Use this project to thrill your guests!

---

*Part of the Haunted House Robotics DMX showcase series*