#pragma once

#include <Arduino.h>

class SensorManager {
public:
  void begin();
  bool motionDetected();
  bool canTrigger();
  void updateCooldown();
  void resetCooldown();
  bool homeTriggered();
  bool endTriggered();

private:
  unsigned long lastTrigger = 0;
};