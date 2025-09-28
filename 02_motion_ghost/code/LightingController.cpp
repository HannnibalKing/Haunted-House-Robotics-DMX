#include "LightingController.h"
#include "Config.h"

void LightingController::begin() {
  strip = Adafruit_NeoPixel(LED_COUNT, PIN_LED_STRIP, NEO_GRB + NEO_KHZ800);
  strip.begin();
  strip.setBrightness(IDLE_BRIGHTNESS);
  strip.show();
}

void LightingController::setIdle() {
  strip.setBrightness(IDLE_BRIGHTNESS);
  for (uint16_t i = 0; i < LED_COUNT; i++) {
    strip.setPixelColor(i, strip.Color(80, 120, 255));
  }
  strip.show();
}

void LightingController::setTrigger() {
  strip.setBrightness(ACTIVE_BRIGHTNESS);
  for (uint16_t i = 0; i < LED_COUNT; i++) {
    if (i % 2 == 0) {
      strip.setPixelColor(i, strip.Color(255, 255, 255));
    } else {
      strip.setPixelColor(i, strip.Color(255, 80, 0));
    }
  }
  strip.show();
}

void LightingController::setRetreat() {
  strip.setBrightness(IDLE_BRIGHTNESS);
  for (uint16_t i = 0; i < LED_COUNT; i++) {
    strip.setPixelColor(i, strip.Color(160, 0, 255));
  }
  strip.show();
}

void LightingController::updateBreathing() {
  breathPhase = (breathPhase + 1) % 200;
  uint8_t brightness = map(breathPhase < 100 ? breathPhase : 200 - breathPhase, 0, 100, 20, IDLE_BRIGHTNESS);
  strip.setBrightness(brightness);
  strip.show();
}
