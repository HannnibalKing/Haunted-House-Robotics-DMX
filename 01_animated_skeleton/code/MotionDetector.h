#pragma once

#include <Arduino.h>

class MotionDetector {
public:
  void begin(uint8_t pin);
  bool isMotionDetected();
  unsigned long lastTriggerTime() const;

private:
  uint8_t pirPin = 0;
  unsigned long lastTrigger = 0;
};
