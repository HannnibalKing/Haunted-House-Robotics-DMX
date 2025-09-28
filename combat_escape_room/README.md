# Combat Escape Room Controller

![Combat Simulation](https://img.shields.io/badge/Combat-Simulation-red.svg)
![Node.js](https://img.shields.io/badge/Node.js-14+-green.svg)
![MQTT](https://img.shields.io/badge/MQTT-IoT-blue.svg)
![WebSocket](https://img.shields.io/badge/WebSocket-Real--time-orange.svg)

Advanced tactical simulation system for immersive combat training scenarios. This controller manages a 4-room compound escape room experience with real-time IoT device control, sound effects, lighting, and smoke machines.

## 🎯 Mission Overview

Navigate through a tactical compound with your team:
1. **Breach Point** - Explosive entry with IED threats
2. **Main Compound** - Multiple hostiles and civilian rescue
3. **Intel Room** - Document extraction under sniper fire
4. **Extraction Point** - Helicopter evacuation under RPG assault

## 🛠 Technical Features

- **Real-time WebSocket communication** for mission control
- **MQTT integration** for IoT device control (lights, sound, smoke)
- **Express.js API** for mission management
- **Automated scoring system** based on performance metrics
- **Mission logging** with detailed analytics
- **Sensor integration** (motion detection, pressure plates)

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ 
- MQTT Broker (Mosquitto recommended)
- IoT devices (Arduino/Raspberry Pi controllers)

### Installation

```bash
# Clone the repository
git clone https://github.com/HannnibalKing/Haunted-House-Robotics-DMX.git
cd combat_escape_room

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit configuration
nano .env

# Start the controller
npm start
```

### Environment Variables

```env
PORT=3000
WS_PORT=8080
MQTT_BROKER=mqtt://localhost:1883
LOG_LEVEL=info
MISSION_TIMEOUT=1200
```

## 📡 API Endpoints

### Mission Control
- `GET /api/mission/status` - Get current mission state
- `POST /api/mission/start` - Initiate new mission
- `POST /api/mission/abort` - Emergency abort
- `POST /api/room/:id/complete` - Mark room completed

### Room Management
- `GET /api/rooms` - List all rooms and configurations
- `POST /api/effects/trigger` - Manual effect activation
- `GET /api/logs` - Mission history and analytics

## 🏗 Architecture

```
┌─────────────────┐    WebSocket    ┌──────────────────┐
│   Web Client    │◄───────────────►│   Controller     │
│  (Dashboard)    │                 │  (Node.js API)   │
└─────────────────┘                 └──────────────────┘
                                             │
                                             │ MQTT
                                             ▼
┌─────────────────┐    Serial/I2C   ┌──────────────────┐
│  Arduino/RPi    │◄───────────────►│   IoT Devices    │
│  (Controllers)  │                 │ (Lights/Sound)   │
└─────────────────┘                 └──────────────────┘
```

## 🎮 Hardware Integration

### Supported Devices
- **LED Strips** - WS2812B for room lighting effects
- **Audio Systems** - Multi-zone sound with trigger capability
- **Smoke Machines** - DMX-controlled fog/haze machines  
- **Motion Sensors** - PIR sensors for player tracking
- **Pressure Plates** - Force-sensitive resistors for traps

### MQTT Topics
```
combat/lighting/set     - Control room lighting
combat/audio/play       - Trigger sound effects  
combat/smoke/activate   - Activate smoke effects
combat/sensors/motion   - Motion detection events
combat/sensors/pressure - Pressure plate triggers
```

## 📊 Mission Scoring

Base score: **1000 points**

**Bonuses:**
- Time completion: Up to +2400 points (faster = better)
- Documents secured: +50 points each (15 total)
- Hostiles neutralized: +100 points each
- Civilians rescued: +200 points each  
- Player survival: +250 points per survivor

**Maximum possible score: ~5000 points**

## 🏠 Room Configurations

Each room includes:
- **Duration limits** (2-5 minutes)
- **Threat scenarios** (IEDs, snipers, mortars)
- **Objective requirements** 
- **Environmental effects** (sound, lighting, smoke)
- **Success conditions**

## 📈 Analytics & Logging

All missions are logged with:
- Completion times per room
- Player survival rates  
- Objective completion rates
- Device performance metrics
- Error tracking and debugging

## 🔧 Development

### Running in Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Testing
```bash
npm test     # Run Jest test suite
```

### Adding New Rooms
1. Edit room configurations in `escape_room_controller.js`
2. Update hardware mappings in MQTT handlers
3. Add corresponding frontend UI elements
4. Test with simulation mode

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)  
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jose "Hannibal" Herrera**
- GitHub: [@HannnibalKing](https://github.com/HannnibalKing)
- Portfolio: [haunted-house-robotics-dmx](https://hannnibalking.github.io/Haunted-House-Robotics-DMX/)

Built with AI assistance for enhanced development speed and comprehensive documentation.

---

## 🎪 Part of Haunted House Robotics Suite

This combat escape room controller is part of a larger haunted house automation system featuring:
- **Scare Effect Coordination** - Synchronized scares across multiple rooms
- **Skeleton Army Control** - Individual servo-controlled skeletons  
- **Ghost Projections** - Pepper's ghost illusions with motion tracking
- **Environmental Effects** - Fog, lighting, sound, and physical props
- **Safety Systems** - Emergency stops and automated monitoring

Visit the [main project](https://hannnibalking.github.io/Haunted-House-Robotics-DMX/) for the complete haunted house experience!