#include "MotionDetector.h"

void MotionDetector::begin(uint8_t pin) {
  pirPin = pin;
  pinMode(pirPin, INPUT);
  lastTrigger = 0;
}

bool MotionDetector::isMotionDetected() {
  if (pirPin == 0) {
    return false;
  }

  int value = digitalRead(pirPin);
  if (value == HIGH) {
    lastTrigger = millis();
    return true;
  }
  return false;
}

unsigned long MotionDetector::lastTriggerTime() const {
  return lastTrigger;
}
