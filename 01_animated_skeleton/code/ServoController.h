#pragma once

#include <Arduino.h>
#include <Servo.h>

struct ServoTarget {
  uint8_t pin;
  uint8_t minAngle;
  uint8_t maxAngle;
  uint8_t currentAngle;
};

class ServoController {
public:
  ServoController();
  void begin();
  void idlePose();
  void motionPose();
  void audioPose(uint16_t level);
  void showPose(uint8_t step);

private:
  Servo headServo;
  Servo leftArmServo;
  Servo rightArmServo;
  Servo jawServo;

  ServoTarget head;
  ServoTarget leftArm;
  ServoTarget rightArm;
  ServoTarget jaw;

  void attachServo(Servo &servo, ServoTarget &target);
  void moveTo(Servo &servo, ServoTarget &target, uint8_t angle);
  uint8_t clampAngle(const ServoTarget &target, int value);
};
