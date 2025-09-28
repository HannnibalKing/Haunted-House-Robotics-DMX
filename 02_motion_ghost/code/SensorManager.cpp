#include "SensorManager.h"
#include "Config.h"

void SensorManager::begin() {
  pinMode(PIN_PIR, INPUT);
  pinMode(PIN_LIMIT_HOME, INPUT_PULLUP);
  pinMode(PIN_LIMIT_END, INPUT_PULLUP);
  lastTrigger = 0;
}

bool SensorManager::motionDetected() {
  return digitalRead(PIN_PIR) == HIGH;
}

bool SensorManager::canTrigger() {
  return millis() - lastTrigger > COOLDOWN_MS;
}

void SensorManager::updateCooldown() {
  lastTrigger = millis();
}

void SensorManager::resetCooldown() {
  lastTrigger = 0;
}

bool SensorManager::homeTriggered() {
  return digitalRead(PIN_LIMIT_HOME) == LOW;
}

bool SensorManager::endTriggered() {
  return digitalRead(PIN_LIMIT_END) == LOW;
}
