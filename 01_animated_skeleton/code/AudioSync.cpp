#include "AudioSync.h"

void AudioSync::begin(uint8_t analogPin) {
  sensorPin = analogPin;
}

uint16_t AudioSync::readLevel() {
  lastLevel = analogRead(sensorPin);
  return lastLevel;
}

bool AudioSync::isAboveThreshold(uint16_t threshold) {
  return readLevel() > threshold;
}
