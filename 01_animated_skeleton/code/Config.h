#pragma once

// Pin assignments
static const uint8_t PIN_SERVO_HEAD = 3;
static const uint8_t PIN_SERVO_LEFT_ARM = 5;
static const uint8_t PIN_SERVO_RIGHT_ARM = 6;
static const uint8_t PIN_SERVO_JAW = 9;

static const uint8_t PIN_PIR_SENSOR = 2;
static const uint8_t PIN_SOUND_SENSOR = A0;

// Servo ranges (degrees)
static const uint8_t HEAD_MIN_ANGLE = 60;
static const uint8_t HEAD_MAX_ANGLE = 120;
static const uint8_t ARM_MIN_ANGLE = 40;
static const uint8_t ARM_MAX_ANGLE = 140;
static const uint8_t JAW_MIN_ANGLE = 40;
static const uint8_t JAW_MAX_ANGLE = 100;

// DMX channel assignments (starting addresses for two RGB fixtures)
static const uint16_t DMX_LIGHT_1_START = 1;  // Channels 1-3 (RGB)
static const uint16_t DMX_LIGHT_2_START = 4;  // Channels 4-6 (RGB)

// Animation timing (milliseconds)
static const uint16_t IDLE_MOVE_INTERVAL = 15000;
static const uint16_t PIR_COOLDOWN = 5000;
static const uint16_t AUDIO_REACTION_INTERVAL = 2000;

// Thresholds
static const uint16_t SOUND_THRESHOLD = 280;  // Analog value 0-1023

// Lighting presets (0-255)
static const uint8_t COLOR_AMBIENT[3] = {180, 40, 20};   // Warm red/orange
static const uint8_t COLOR_ALERT[3] = {255, 255, 255};   // Bright white
static const uint8_t COLOR_SHOW_A[3] = {120, 0, 255};    // Purple
static const uint8_t COLOR_SHOW_B[3] = {255, 100, 0};    // Fire
