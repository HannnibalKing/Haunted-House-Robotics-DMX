#pragma once

#include <Adafruit_NeoPixel.h>

class LightingController {
public:
  void begin();
  void setIdle();
  void setTrigger();
  void setRetreat();
  void updateBreathing();

private:
  Adafruit_NeoPixel strip;
  uint8_t breathPhase = 0;
};