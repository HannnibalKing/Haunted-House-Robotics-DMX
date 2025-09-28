# 💀 Animated Skeleton with DMX Lighting

A servo-controlled skeleton that moves its head, arms, and jaw in coordination with DMX lighting effects and spooky sound triggers.

## 🎯 Project Overview

This project demonstrates:
- Servo motor control and coordination
- DMX512 lighting protocol integration  
- Audio synchronization
- Sensor-triggered animations
- Professional stage lighting techniques

## 🛠️ Hardware Components

### Core Components
- Arduino Uno R3
- DMX Shield (MAX485 based)
- 4x SG90 Servo Motors (Head, Arms, Jaw)
- PIR Motion Sensor
- Sound Detection Sensor
- 12V Power Supply (3A minimum)
- Breadboard and jumper wires

### DMX Lighting
- 2x RGB LED Par Lights (DMX compatible)
- DMX cables (XLR 3-pin)
- DMX terminator

### Optional Enhancements
- MP3 Player Module (DFPlayer Mini)
- Speaker (8Ω, 3W)
- Micro SD Card (for sound effects)

## 📋 Parts List with Links

| Component | Quantity | Estimated Cost | Supplier |
|-----------|----------|----------------|----------|
| Arduino Uno R3 | 1 | $15 | Arduino.cc |
| SG90 Servo Motor | 4 | $20 | Amazon |
| DMX Shield | 1 | $25 | SparkFun |
| PIR Sensor | 1 | $5 | Amazon |
| RGB LED Par Light | 2 | $60 | Amazon |
| Power Supply 12V/3A | 1 | $15 | Amazon |
| **Total** | | **~$140** | |

## 🔧 Assembly Instructions

### Step 1: Servo Mounting
1. Mount servos to skeleton frame:
   - Head servo: Controls left/right head movement
   - Left arm servo: Controls up/down arm movement
   - Right arm servo: Controls up/down arm movement  
   - Jaw servo: Controls mouth open/close

### Step 2: Arduino Connections
```
Servo Connections:
- Head Servo    → Pin 3 (PWM)
- Left Arm      → Pin 5 (PWM) 
- Right Arm     → Pin 6 (PWM)
- Jaw Servo     → Pin 9 (PWM)

Sensors:
- PIR Sensor    → Pin 2 (Digital)
- Sound Sensor  → Pin A0 (Analog)

DMX Shield:
- Mounts directly on Arduino
- Uses Pins 0,1 for serial communication
```

### Step 3: DMX Setup
1. Connect DMX lights in daisy chain
2. Set light addresses (Light 1: Address 1, Light 2: Address 4)
3. Connect DMX terminator to last light

### Step 4: Programming
Upload the provided Arduino sketch and configure DMX addresses.

## 💻 Code Structure

```cpp
// Main components
- ServoControl.cpp    // Servo movement patterns
- DMXController.cpp   // DMX lighting effects  
- MotionDetector.cpp  // PIR sensor handling
- AudioSync.cpp       // Sound-triggered animations
- main.ino           // Main program loop
```

### Uploading the Sketch
1. Install Arduino libraries: `Servo`, `DMXSerial`, and ensure your board package is up to date.
2. Open `code/animated_skeleton.ino` in the Arduino IDE.
3. Place the companion `.cpp` and `.h` files in the same `code/` folder (the IDE will compile them automatically).
4. Select *Tools → Board → Arduino Uno* (or your compatible board) and the matching COM port.
5. Click **Upload** and monitor the serial console at 115200 baud for sensor debug logs.

## 🎭 Animation Sequences

### 1. Idle Mode
- Subtle head movements every 10-15 seconds
- Dim ambient lighting (red/orange)
- No sound

### 2. Motion Detected
- Quick head turn toward motion
- Bright white spotlight effect
- Jaw movement (talking motion)
- Arm gestures

### 3. Sound Triggered  
- Synchronized jaw movement to audio
- Rapid lighting color changes
- Coordinated arm movements
- Head scanning motion

### 4. Full Show Mode
- 30-second choreographed sequence
- All servos moving in pattern
- Complex lighting chase effects
- Sound effects playback

## ⚡ Technical Specifications

### Servo Performance
- **Speed**: 60°/sec (0.1sec/60°)
- **Torque**: 2.5kg/cm at 4.8V
- **Range**: 180° rotation
- **Control**: PWM 50Hz, 1-2ms pulse width

### DMX Specifications  
- **Protocol**: DMX512-A standard
- **Channels**: 6 total (3 per light)
- **Refresh Rate**: 44Hz
- **Cable**: XLR 3-pin, 120Ω impedance

### Power Requirements
- **Arduino**: 5V/500mA via USB or barrel jack
- **Servos**: 6V/2A total (4 servos × 500mA peak)
- **DMX Lights**: 12V/1A each
- **Total**: 12V/4A system power

## 🎨 DMX Channel Mapping

| Light | Channel | Function | Value Range |
|-------|---------|----------|-------------|
| Light 1 | 1 | Red | 0-255 |
| Light 1 | 2 | Green | 0-255 |  
| Light 1 | 3 | Blue | 0-255 |
| Light 2 | 4 | Red | 0-255 |
| Light 2 | 5 | Green | 0-255 |
| Light 2 | 6 | Blue | 0-255 |

## 🔍 Troubleshooting

### Common Issues
1. **Servos jittering**: Check power supply capacity
2. **DMX not working**: Verify terminator and addressing
3. **Erratic movement**: Ensure clean 5V supply to Arduino
4. **No motion detection**: Check PIR sensor orientation

### Debug Tools
- Serial monitor for sensor readings
- DMX tester for light verification
- Multimeter for power supply check
- Oscilloscope for PWM signal analysis

## 📈 Performance Metrics

- **Motion Detection Range**: 0-7 meters (PIR dependent)
- **Response Time**: <200ms from trigger to action
- **Animation Smoothness**: 50Hz servo update rate
- **DMX Update Rate**: 44Hz (standard)
- **Power Consumption**: 48W maximum
- **Operating Temperature**: 0-40°C

## 🚀 Future Enhancements

1. **Wireless Control**: ESP32 with WiFi integration
2. **Multiple Skeletons**: Synchronized skeleton army
3. **Advanced AI**: Computer vision for person tracking
4. **Sound Reactive**: Real-time audio analysis
5. **Mobile App**: Smartphone control interface

## 📱 Demo Video

*[Video placeholder: Skeleton performing full animation sequence with DMX lighting]*

The video shows:
- Motion-triggered activation
- Smooth servo movements
- Synchronized DMX lighting effects
- Sound-reactive jaw movement
- Professional stage lighting quality

## 📄 License

MIT License - Use this project for learning and inspiration!

---

*Part of the Haunted House Robotics DMX showcase series*