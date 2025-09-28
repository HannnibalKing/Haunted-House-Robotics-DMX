#pragma once

#include <Arduino.h>
#include <DMXSerial.h>

class DMXController {
public:
  void begin();
  void setAmbient();
  void setAlert();
  void setPalette(const uint8_t color[3]);
  void dimAll(uint8_t intensity);

private:
  void writeRGB(uint16_t startChannel, const uint8_t color[3]);
};
