/**
 * Combat Escape Room Controller
 * Advanced tactical simulation system for immersive combat training
 * Author: Jose "Hannibal" Herrera
 * Built with AI assistance for enhanced development speed
 */

const express = require('express');
const WebSocket = require('ws');
const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');

class CombatEscapeRoomController {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.wsPort = process.env.WS_PORT || 8080;
        
        // Mission state
        this.missionState = {
            active: false,
            currentRoom: 0,
            playersAlive: 4,
            objectives: [],
            startTime: null,
            threats: [],
            intel: {
                documentsSecured: 0,
                hostilesNeutralized: 0,
                civiliansRescued: 0
            }
        };

        // Room configurations
        this.rooms = [
            {
                id: 1,
                name: "Breach Point",
                description: "Entry corridor with explosive breach",
                threats: ["IED", "Sniper"],
                objectives: ["Breach wall", "Deploy smoke", "Advance"],
                duration: 180, // 3 minutes
                effects: {
                    sound: "explosion_breach.wav",
                    lighting: { color: "orange", intensity: "high", strobe: true },
                    smoke: { duration: 45, density: "heavy" }
                }
            },
            {
                id: 2,
                name: "Main Compound",
                description: "Central area with multiple hostiles",
                threats: ["AK-47 Hostiles", "Mortar Fire", "Pressure Plate IED"],
                objectives: ["Clear hostiles", "Disarm IED", "Secure civilians"],
                duration: 300, // 5 minutes
                effects: {
                    sound: "gunfire_ak47.wav",
                    lighting: { color: "red", intensity: "medium", strobe: false },
                    smoke: { duration: 0, density: "none" }
                }
            },
            {
                id: 3,
                name: "Intel Room",
                description: "Interrogation room with classified documents",
                threats: ["Roof Sniper", "Booby Trap"],
                objectives: ["Secure documents", "Counter-sniper", "Extract intel"],
                duration: 240, // 4 minutes
                effects: {
                    sound: "sniper_rifle.wav",
                    lighting: { color: "blue", intensity: "low", strobe: false },
                    smoke: { duration: 0, density: "none" }
                }
            },
            {
                id: 4,
                name: "Extraction Point",
                description: "Helicopter landing zone",
                threats: ["RPG", "Final Assault"],
                objectives: ["Secure LZ", "Call extraction", "Exfiltrate"],
                duration: 120, // 2 minutes
                effects: {
                    sound: "helicopter_approach.wav",
                    lighting: { color: "green", intensity: "high", strobe: true },
                    smoke: { duration: 30, density: "light" }
                }
            }
        ];

        this.initializeServer();
        this.initializeWebSocket();
        this.initializeMQTT();
    }

    initializeServer() {
        this.app.use(express.json());
        this.app.use(express.static('public'));

        // API Routes
        this.app.get('/api/mission/status', (req, res) => {
            res.json(this.missionState);
        });

        this.app.post('/api/mission/start', (req, res) => {
            this.startMission();
            res.json({ success: true, message: 'Mission initiated' });
        });

        this.app.post('/api/mission/abort', (req, res) => {
            this.abortMission();
            res.json({ success: true, message: 'Mission aborted' });
        });

        this.app.get('/api/rooms', (req, res) => {
            res.json(this.rooms);
        });

        this.app.post('/api/room/:id/complete', (req, res) => {
            const roomId = parseInt(req.params.id);
            this.completeRoom(roomId);
            res.json({ success: true, message: `Room ${roomId} completed` });
        });

        this.app.listen(this.port, () => {
            console.log(`Combat Escape Room Controller running on port ${this.port}`);
        });
    }

    initializeWebSocket() {
        this.wss = new WebSocket.Server({ port: this.wsPort });
        
        this.wss.on('connection', (ws) => {
            console.log('Client connected to mission control');
            
            // Send current state to new client
            ws.send(JSON.stringify({
                type: 'mission_state',
                data: this.missionState
            }));

            ws.on('message', (message) => {
                try {
                    const data = JSON.parse(message);
                    this.handleWebSocketMessage(data, ws);
                } catch (error) {
                    console.error('WebSocket message error:', error);
                }
            });

            ws.on('close', () => {
                console.log('Client disconnected from mission control');
            });
        });
    }

    initializeMQTT() {
        // Connect to MQTT broker for IoT device control
        this.mqttClient = mqtt.connect(process.env.MQTT_BROKER || 'mqtt://localhost:1883');
        
        this.mqttClient.on('connect', () => {
            console.log('Connected to MQTT broker');
            this.mqttClient.subscribe('combat/sensors/+');
            this.mqttClient.subscribe('combat/effects/+');
        });

        this.mqttClient.on('message', (topic, message) => {
            this.handleMQTTMessage(topic, message);
        });
    }

    startMission() {
        this.missionState = {
            active: true,
            currentRoom: 1,
            playersAlive: 4,
            objectives: [...this.rooms[0].objectives],
            startTime: new Date(),
            threats: [...this.rooms[0].threats],
            intel: {
                documentsSecured: 0,
                hostilesNeutralized: 0,
                civiliansRescued: 0
            }
        };

        // Trigger room 1 effects
        this.activateRoomEffects(1);
        this.broadcastUpdate();
        
        console.log('Mission started:', this.missionState);
    }

    completeRoom(roomId) {
        if (!this.missionState.active) return;

        const room = this.rooms[roomId - 1];
        if (!room) return;

        // Update intel based on room completion
        switch (roomId) {
            case 1:
                // Breach successful
                break;
            case 2:
                this.missionState.intel.hostilesNeutralized += 3;
                this.missionState.intel.civiliansRescued += 2;
                break;
            case 3:
                this.missionState.intel.documentsSecured = 15;
                this.missionState.intel.hostilesNeutralized += 1;
                break;
            case 4:
                // Mission complete
                this.completeMission();
                return;
        }

        // Advance to next room
        if (roomId < this.rooms.length) {
            this.missionState.currentRoom = roomId + 1;
            const nextRoom = this.rooms[roomId];
            this.missionState.objectives = [...nextRoom.objectives];
            this.missionState.threats = [...nextRoom.threats];
            
            this.activateRoomEffects(roomId + 1);
        }

        this.broadcastUpdate();
    }

    activateRoomEffects(roomId) {
        const room = this.rooms[roomId - 1];
        if (!room) return;

        const effects = room.effects;

        // Send MQTT commands for physical effects
        if (effects.lighting) {
            this.mqttClient.publish('combat/lighting/set', JSON.stringify({
                room: roomId,
                color: effects.lighting.color,
                intensity: effects.lighting.intensity,
                strobe: effects.lighting.strobe
            }));
        }

        if (effects.sound) {
            this.mqttClient.publish('combat/audio/play', JSON.stringify({
                room: roomId,
                file: effects.sound,
                volume: 0.8
            }));
        }

        if (effects.smoke.duration > 0) {
            this.mqttClient.publish('combat/smoke/activate', JSON.stringify({
                room: roomId,
                duration: effects.smoke.duration,
                density: effects.smoke.density
            }));
        }

        console.log(`Room ${roomId} effects activated:`, effects);
    }

    completeMission() {
        const endTime = new Date();
        const duration = Math.round((endTime - this.missionState.startTime) / 1000);
        
        this.missionState.active = false;
        this.missionState.completedAt = endTime;
        this.missionState.duration = duration;

        // Calculate mission score
        const score = this.calculateMissionScore();
        this.missionState.score = score;

        // Save mission log
        this.saveMissionLog();

        // Celebrate completion effects
        this.mqttClient.publish('combat/lighting/set', JSON.stringify({
            room: 'all',
            color: 'green',
            intensity: 'high',
            strobe: true
        }));

        this.broadcastUpdate();
        console.log('Mission completed! Score:', score);
    }

    abortMission() {
        this.missionState.active = false;
        this.missionState.abortedAt = new Date();

        // Emergency lighting
        this.mqttClient.publish('combat/lighting/set', JSON.stringify({
            room: 'all',
            color: 'red',
            intensity: 'high',
            strobe: false
        }));

        // Stop all effects
        this.mqttClient.publish('combat/effects/stop', 'all');

        this.broadcastUpdate();
        console.log('Mission aborted');
    }

    calculateMissionScore() {
        const baseScore = 1000;
        let score = baseScore;

        // Time bonus (faster = better)
        const timeBonus = Math.max(0, 1200 - this.missionState.duration) * 2;
        score += timeBonus;

        // Objectives bonus
        score += this.missionState.intel.documentsSecured * 50;
        score += this.missionState.intel.hostilesNeutralized * 100;
        score += this.missionState.intel.civiliansRescued * 200;

        // Survival bonus
        score += this.missionState.playersAlive * 250;

        return Math.round(score);
    }

    saveMissionLog() {
        const logData = {
            timestamp: new Date().toISOString(),
            duration: this.missionState.duration,
            score: this.missionState.score,
            intel: this.missionState.intel,
            playersAlive: this.missionState.playersAlive,
            success: true
        };

        const logPath = path.join(__dirname, 'logs', `mission_${Date.now()}.json`);
        
        // Ensure logs directory exists
        const logsDir = path.dirname(logPath);
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }

        fs.writeFileSync(logPath, JSON.stringify(logData, null, 2));
        console.log('Mission log saved:', logPath);
    }

    handleWebSocketMessage(data, ws) {
        switch (data.type) {
            case 'get_status':
                ws.send(JSON.stringify({
                    type: 'mission_state',
                    data: this.missionState
                }));
                break;
            case 'start_mission':
                this.startMission();
                break;
            case 'abort_mission':
                this.abortMission();
                break;
            case 'complete_room':
                this.completeRoom(data.roomId);
                break;
        }
    }

    handleMQTTMessage(topic, message) {
        const data = JSON.parse(message.toString());
        
        if (topic.startsWith('combat/sensors/')) {
            // Handle sensor data (motion, pressure plates, etc.)
            this.processSensorData(topic, data);
        }
    }

    processSensorData(topic, data) {
        const sensorType = topic.split('/')[2];
        
        switch (sensorType) {
            case 'motion':
                if (data.detected && this.missionState.active) {
                    console.log(`Motion detected in room ${data.room}`);
                    // Could trigger additional effects or threats
                }
                break;
            case 'pressure':
                if (data.activated) {
                    console.log(`Pressure plate activated: ${data.location}`);
                    // Trigger IED or trap sequence
                    this.triggerTrap(data);
                }
                break;
        }
    }

    triggerTrap(trapData) {
        // Simulate IED explosion or other trap effects
        this.mqttClient.publish('combat/effects/explosion', JSON.stringify({
            location: trapData.location,
            intensity: 'high',
            damage: Math.floor(Math.random() * 25) + 25 // 25-50 damage
        }));

        // Reduce player count if trap is deadly
        if (trapData.deadly && Math.random() < 0.3) {
            this.missionState.playersAlive = Math.max(0, this.missionState.playersAlive - 1);
        }

        this.broadcastUpdate();
    }

    broadcastUpdate() {
        const message = JSON.stringify({
            type: 'mission_state',
            data: this.missionState
        });

        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
}

// Initialize and start the controller
const controller = new CombatEscapeRoomController();

module.exports = CombatEscapeRoomController;