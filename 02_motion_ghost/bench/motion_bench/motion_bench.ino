#include <AccelStepper.h>
#include <Adafruit_NeoPixel.h>

constexpr uint8_t STEPPER_PIN_1 = 8;
constexpr uint8_t STEPPER_PIN_2 = 9;
constexpr uint8_t STEPPER_PIN_3 = 10;
constexpr uint8_t STEPPER_PIN_4 = 11;
constexpr uint8_t LED_PIN = 6;
constexpr uint16_t LED_COUNT = 30;

AccelStepper carriage(AccelStepper::HALF4WIRE, STEPPER_PIN_1, STEPPER_PIN_3, STEPPER_PIN_2, STEPPER_PIN_4);
Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  Serial.begin(115200);
  Serial.println(F("[Ghost Bench] Stepper + LED diagnostics"));

  carriage.setMaxSpeed(600.0f);
  carriage.setAcceleration(400.0f);
  carriage.setCurrentPosition(0);

  strip.begin();
  strip.show();
}

void glow(uint32_t color) {
  for (uint16_t i = 0; i < LED_COUNT; ++i) {
    strip.setPixelColor(i, color);
  }
  strip.show();
}

void runCarriageTo(long target) {
  carriage.moveTo(target);
  while (carriage.distanceToGo() != 0) {
    carriage.run();
  }
}

void loop() {
  Serial.println(F("Forward glide"));
  glow(strip.Color(0, 40, 80));
  runCarriageTo(2048);

  Serial.println(F("Hover strobe"));
  for (int i = 0; i < 6; ++i) {
    glow(strip.Color(150, 150, 150));
    delay(80);
    glow(strip.Color(0, 0, 0));
    delay(80);
  }

  Serial.println(F("Return glide"));
  glow(strip.Color(80, 0, 120));
  runCarriageTo(0);

  Serial.println(F("Cycle complete. Cooling for 3 seconds."));
  glow(strip.Color(0, 10, 30));
  delay(3000);
}
