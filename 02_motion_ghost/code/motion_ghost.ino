#include <Arduino.h>
#include <DMXSerial.h>
#include "Config.h"
#include "GhostMotion.h"
#include "LightingController.h"
#include "SensorManager.h"

enum GhostMode {
  MODE_IDLE,
  MODE_APPROACH,
  MODE_RETREAT
};

GhostMotion ghostMotion;
LightingController lighting;
SensorManager sensors;
GhostMode currentMode = MODE_IDLE;
unsigned long triggerTime = 0;
unsigned long fogOnTime = 0;

void enterIdle() {
  currentMode = MODE_IDLE;
  lighting.setIdle();
  DMXSerial.write(DMX_CHANNEL_INTENSITY, 40);
  DMXSerial.write(DMX_CHANNEL_STROBE, 0);
  digitalWrite(PIN_FOG_RELAY, LOW);
}

void enterApproach() {
  currentMode = MODE_APPROACH;
  triggerTime = millis();
  fogOnTime = millis();
  lighting.setTrigger();
  ghostMotion.moveForward();
  DMXSerial.write(DMX_CHANNEL_INTENSITY, 255);
  DMXSerial.write(DMX_CHANNEL_STROBE, 200);
  digitalWrite(PIN_FOG_RELAY, HIGH);
}

void enterRetreat() {
  currentMode = MODE_RETREAT;
  lighting.setRetreat();
  ghostMotion.moveHome();
  DMXSerial.write(DMX_CHANNEL_INTENSITY, 120);
  DMXSerial.write(DMX_CHANNEL_STROBE, 0);
  digitalWrite(PIN_FOG_RELAY, LOW);
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_FOG_RELAY, OUTPUT);
  ghostMotion.begin();
  lighting.begin();
  sensors.begin();
  DMXSerial.init(DMXControllerMode);
  enterIdle();
}

void loop() {
  unsigned long now = millis();
  ghostMotion.update();

  if (currentMode == MODE_IDLE) {
    lighting.updateBreathing();
    if (sensors.motionDetected() && sensors.canTrigger()) {
      sensors.updateCooldown();
      Serial.println(F("Visitor detected: launching scare."));
      enterApproach();
    }
  }

  if (currentMode == MODE_APPROACH) {
    if (sensors.endTriggered() || !ghostMotion.isMoving()) {
      Serial.println(F("Approach complete. Returning home."));
      enterRetreat();
    }
  }

  if (currentMode == MODE_RETREAT) {
    if (sensors.homeTriggered()) {
      Serial.println(F("Ghost reset complete."));
      enterIdle();
    }
  }

  // Fog relay timeout
  if (digitalRead(PIN_FOG_RELAY) == HIGH && now - fogOnTime > FOG_BLAST_MS) {
    digitalWrite(PIN_FOG_RELAY, LOW);
  }

  // Safety fallback to idle after cooldown period
  if (currentMode != MODE_IDLE && now - triggerTime > COOLDOWN_MS) {
    enterIdle();
  }
}
