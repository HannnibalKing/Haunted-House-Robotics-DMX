#pragma once

// Pin assignments
static const uint8_t PIN_PIR = 7;
static const uint8_t PIN_LIMIT_HOME = 8;
static const uint8_t PIN_LIMIT_END = 9;
static const uint8_t PIN_FOG_RELAY = 10;
static const uint8_t PIN_LED_STRIP = 6;

// Stepper motor pins (ULN2003 - IN1..IN4)
static const uint8_t PIN_STEPPER_1 = 2;
static const uint8_t PIN_STEPPER_2 = 3;
static const uint8_t PIN_STEPPER_3 = 4;
static const uint8_t PIN_STEPPER_4 = 5;

// Motion parameters
static const long GHOST_TRAVEL_STEPS = 3200;  // adjust for cable length
static const uint16_t STEP_SPEED = 700;       // steps per second
static const uint16_t STEP_ACCEL = 500;       // steps per second^2
static const unsigned long COOLDOWN_MS = 12000;
static const unsigned long FOG_BLAST_MS = 2500;

// LED configuration
static const uint16_t LED_COUNT = 30;
static const uint8_t IDLE_BRIGHTNESS = 40;
static const uint8_t ACTIVE_BRIGHTNESS = 200;

// DMX triggers (optional)
static const uint16_t DMX_CHANNEL_INTENSITY = 16;
static const uint16_t DMX_CHANNEL_STROBE = 17;
