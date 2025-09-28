#include "DMXController.h"
#include "Config.h"

void DMXController::begin() {
  DMXSerial.init(DMXControllerMode);
  setAmbient();
}

void DMXController::setAmbient() {
  writeRGB(DMX_LIGHT_1_START, COLOR_AMBIENT);
  writeRGB(DMX_LIGHT_2_START, COLOR_AMBIENT);
}

void DMXController::setAlert() {
  writeRGB(DMX_LIGHT_1_START, COLOR_ALERT);
  writeRGB(DMX_LIGHT_2_START, COLOR_ALERT);
}

void DMXController::setPalette(const uint8_t color[3]) {
  writeRGB(DMX_LIGHT_1_START, color);
  writeRGB(DMX_LIGHT_2_START, color);
}

void DMXController::dimAll(uint8_t intensity) {
  uint8_t color[3] = {
    static_cast<uint8_t>((COLOR_AMBIENT[0] * intensity) / 255),
    static_cast<uint8_t>((COLOR_AMBIENT[1] * intensity) / 255),
    static_cast<uint8_t>((COLOR_AMBIENT[2] * intensity) / 255)
  };
  writeRGB(DMX_LIGHT_1_START, color);
  writeRGB(DMX_LIGHT_2_START, color);
}

void DMXController::writeRGB(uint16_t startChannel, const uint8_t color[3]) {
  DMXSerial.write(startChannel, color[0]);
  DMXSerial.write(startChannel + 1, color[1]);
  DMXSerial.write(startChannel + 2, color[2]);
}
