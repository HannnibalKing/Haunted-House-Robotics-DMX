# 🎃 Haunted House Robotics - DMX Halloween Projects

Welcome to my Halloween robotics showcase! This repository contains three spooky automation projects that demonstrate robotics, IoT, and DMX lighting integration skills.

## 🤖 Projects Overview

| Project | Description | Technologies | Difficulty |
|---------|-------------|--------------|------------|
| [Animated Skeleton](./01_animated_skeleton/) | Servo-controlled skeleton with DMX lighting | Arduino, Servo Motors, DMX512 | Beginner |
| [Motion Ghost](./02_motion_ghost/) | PIR-triggered ghost with fabric animation | Arduino, PIR Sensors, Stepper Motors | Intermediate |
| [Scare Experience App](./03_scare_experience_app/) | Cross-platform guest feedback and AI layout suggestions | React Native, Expo, AI Simulation | Advanced |

## 🛠️ Skills Demonstrated

- **Microcontroller Programming**: Arduino IDE, C++
- **Motor Control**: Servo and Stepper motor integration
- **Sensor Integration**: PIR motion detection, temperature sensing
- **DMX Lighting**: Professional stage lighting protocols
- **IoT Development**: WiFi connectivity, web interfaces
- **Circuit Design**: PCB layouts and wiring diagrams
- **3D Design**: Custom mounting brackets and enclosures

## 🎯 Features Across Projects

### Hardware Integration
- Multiple sensor types (PIR, temperature, sound)
- Various motor types (servo, stepper, DC)
- DMX512 professional lighting control
- IoT connectivity with web interfaces
- Audio synchronization capabilities

### Software Features
- Real-time motor control algorithms
- Sensor fusion and filtering
- Web-based control interfaces
- DMX lighting sequences
- Audio-visual synchronization

## 🚀 Quick Start

Each project folder contains:
- Complete source code with comments
- Wiring diagrams and schematics  
- Parts list with supplier links
- Step-by-step assembly instructions
- Demo videos and photos

### Terminal Simulations

If you want to preview the show flow without hardware, run the console demos:

```powershell
cd simulations
python console_demo.py skeleton --instant
python console_demo.py ghost --speed 1.5
python console_demo.py app
```

These scripts print the same cue codes used in the Arduino projects (e.g., `M29`, `L12`) so reviewers can follow the choreography timeline straight from the terminal.

## 📋 Hardware Requirements

### Common Components
- Arduino Uno/Nano or ESP32
- Breadboards and jumper wires
- 12V power supply
- Various resistors and capacitors

### Project-Specific Parts
See individual project folders for detailed parts lists.

## 🎬 Demo Videos

- **Skeleton Animation**: [Coming Soon] - Servo movements with synchronized lighting
- **Ghost Motion**: [Coming Soon] - Sensor-triggered fabric animation
- **Scare Experience App**: [Coming Soon] - Guests rating rooms + AI-generated floorplans

## 📊 Technical Specifications

### Performance Metrics
- **Response Time**: < 100ms for motion detection
- **DMX Channels**: Up to 512 channels supported  
- **WiFi Range**: 50+ meters for IoT features
- **Power Efficiency**: Optimized for 12V operation

### Scalability
- Modular design allows combining projects
- DMX daisy-chaining for large installations
- MQTT integration for home automation
- Expandable sensor arrays

## � Publish a Showcase Site (GitHub Pages)

1. Commit the repository and push to GitHub.
2. In the GitHub UI, open **Settings → Pages**.
3. Under "Build and deployment", choose **Deploy from branch**.
4. Select the `main` branch and set the folder to `/docs`.
5. Save—GitHub Pages will build the static site and publish it at `https://hannnibalking.github.io/Haunted-House-Robotics-DMX/`.
6. Update your README or GitHub profile with the published link so reviewers can explore the landing page.

## �🏗️ Architecture

```
Haunted House System
├── Hardware Layer (Arduino/ESP32)
├── Sensor Processing (Motion, Sound, Temperature)  
├── Motor Control (Servo, Stepper, DC)
├── Lighting Control (DMX512)
├── Audio Integration (MP3/WAV playback)
└── IoT Interface (Web dashboard, MQTT)
```

## 🎪 Professional Applications

These projects demonstrate skills applicable to:
- **Theme Park Automation**: Animatronics and show control
- **Stage Production**: DMX lighting and mechanical effects
- **Industrial Automation**: Sensor integration and motor control
- **IoT Development**: Connected devices and web interfaces
- **Entertainment Technology**: Audio-visual synchronization

## 📝 License

MIT License - Feel free to use these projects for learning and inspiration!

## 🤝 Contributing

This is a showcase repository, but suggestions and improvements are welcome!

---

*Created for Halloween 2025 - Showcasing robotics and automation skills*