#include <Servo.h>

constexpr uint8_t HEAD_SERVO_PIN = 3;
constexpr uint8_t LEFT_ARM_SERVO_PIN = 5;
constexpr uint8_t RIGHT_ARM_SERVO_PIN = 6;
constexpr uint8_t JAW_SERVO_PIN = 9;

Servo headServo;
Servo leftArmServo;
Servo rightArmServo;
Servo jawServo;

void attachServos() {
  headServo.attach(HEAD_SERVO_PIN);
  leftArmServo.attach(LEFT_ARM_SERVO_PIN);
  rightArmServo.attach(RIGHT_ARM_SERVO_PIN);
  jawServo.attach(JAW_SERVO_PIN);
}

void detachServos() {
  headServo.detach();
  leftArmServo.detach();
  rightArmServo.detach();
  jawServo.detach();
}

void sweepServo(Servo &servo, int minAngle, int maxAngle, const __FlashStringHelper *label) {
  Serial.print(F("Sweeping "));
  Serial.println(label);
  for (int angle = minAngle; angle <= maxAngle; angle += 5) {
    servo.write(angle);
    delay(20);
  }
  for (int angle = maxAngle; angle >= minAngle; angle -= 5) {
    servo.write(angle);
    delay(20);
  }
}

void setup() {
  Serial.begin(115200);
  Serial.println(F("[Servo Bench] Initializing"));
  attachServos();
}

void loop() {
  sweepServo(headServo, 60, 120, F("Head"));
  sweepServo(leftArmServo, 40, 140, F("Left Arm"));
  sweepServo(rightArmServo, 40, 140, F("Right Arm"));
  sweepServo(jawServo, 40, 110, F("Jaw"));
  Serial.println(F("Cycle complete. Cooling for 2 seconds."));
  delay(2000);
}
