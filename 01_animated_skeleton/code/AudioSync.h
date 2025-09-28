#pragma once

#include <Arduino.h>

class AudioSync {
public:
  void begin(uint8_t analogPin);
  uint16_t readLevel();
  bool isAboveThreshold(uint16_t threshold);

private:
  uint8_t sensorPin = A0;
  uint16_t lastLevel = 0;
};
