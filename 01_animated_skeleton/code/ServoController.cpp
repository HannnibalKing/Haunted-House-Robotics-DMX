#include "ServoController.h"
#include "Config.h"

ServoController::ServoController() {
  head = {PIN_SERVO_HEAD, HEAD_MIN_ANGLE, HEAD_MAX_ANGLE, HEAD_MIN_ANGLE};
  leftArm = {PIN_SERVO_LEFT_ARM, ARM_MIN_ANGLE, ARM_MAX_ANGLE, ARM_MIN_ANGLE};
  rightArm = {PIN_SERVO_RIGHT_ARM, ARM_MIN_ANGLE, ARM_MAX_ANGLE, ARM_MIN_ANGLE};
  jaw = {PIN_SERVO_JAW, JAW_MIN_ANGLE, JAW_MAX_ANGLE, JAW_MIN_ANGLE};
}

void ServoController::begin() {
  attachServo(headServo, head);
  attachServo(leftArmServo, leftArm);
  attachServo(rightArmServo, rightArm);
  attachServo(jawServo, jaw);
  idlePose();
}

void ServoController::idlePose() {
  moveTo(headServo, head, (head.minAngle + head.maxAngle) / 2);
  moveTo(leftArmServo, leftArm, leftArm.minAngle + 10);
  moveTo(rightArmServo, rightArm, rightArm.minAngle + 10);
  moveTo(jawServo, jaw, jaw.minAngle + 5);
}

void ServoController::motionPose() {
  moveTo(headServo, head, head.maxAngle - 5);
  moveTo(leftArmServo, leftArm, leftArm.maxAngle - 10);
  moveTo(rightArmServo, rightArm, rightArm.maxAngle - 15);
  moveTo(jawServo, jaw, jaw.maxAngle - 5);
}

void ServoController::audioPose(uint16_t level) {
  // Map audio level (0-1023) to jaw movement
  uint8_t targetAngle = map(level, 0, 1023, jaw.minAngle, jaw.maxAngle);
  moveTo(jawServo, jaw, targetAngle);

  // Subtle head nod based on audio energy
  uint8_t headAngle = map(level, 0, 1023, head.minAngle + 10, head.maxAngle - 10);
  moveTo(headServo, head, headAngle);
}

void ServoController::showPose(uint8_t step) {
  switch (step % 4) {
    case 0:
      moveTo(headServo, head, head.minAngle + 5);
      moveTo(leftArmServo, leftArm, leftArm.maxAngle - 20);
      moveTo(rightArmServo, rightArm, rightArm.minAngle + 20);
      break;
    case 1:
      moveTo(headServo, head, head.maxAngle - 5);
      moveTo(leftArmServo, leftArm, leftArm.minAngle + 20);
      moveTo(rightArmServo, rightArm, rightArm.maxAngle - 20);
      break;
    case 2:
      moveTo(headServo, head, (head.minAngle + head.maxAngle) / 2);
      moveTo(leftArmServo, leftArm, leftArm.minAngle + 15);
      moveTo(rightArmServo, rightArm, rightArm.maxAngle - 10);
      moveTo(jawServo, jaw, jaw.maxAngle - 10);
      break;
    default:
      moveTo(headServo, head, head.minAngle + 20);
      moveTo(leftArmServo, leftArm, leftArm.maxAngle - 10);
      moveTo(rightArmServo, rightArm, rightArm.minAngle + 15);
      moveTo(jawServo, jaw, jaw.minAngle + 10);
      break;
  }
}

void ServoController::attachServo(Servo &servo, ServoTarget &target) {
  servo.attach(target.pin);
  servo.write(target.currentAngle);
}

void ServoController::moveTo(Servo &servo, ServoTarget &target, uint8_t angle) {
  uint8_t clamped = clampAngle(target, angle);
  if (clamped == target.currentAngle) {
    return;
  }
  target.currentAngle = clamped;
  servo.write(clamped);
  delay(20);  // smoothing delay
}

uint8_t ServoController::clampAngle(const ServoTarget &target, int value) {
  if (value < target.minAngle) {
    return target.minAngle;
  }
  if (value > target.maxAngle) {
    return target.maxAngle;
  }
  return static_cast<uint8_t>(value);
}
