#include "GhostMotion.h"
#include "Config.h"

GhostMotion::GhostMotion()
    : stepper(AccelStepper::FULL4WIRE, PIN_STEPPER_1, PIN_STEPPER_3, PIN_STEPPER_2, PIN_STEPPER_4) {}

void GhostMotion::begin() {
  stepper.setMaxSpeed(STEP_SPEED);
  stepper.setAcceleration(STEP_ACCEL);
  targetPosition = 0;
  stepper.setCurrentPosition(0);
}

void GhostMotion::moveForward() {
  targetPosition = GHOST_TRAVEL_STEPS;
  stepper.moveTo(targetPosition);
}

void GhostMotion::moveHome() {
  targetPosition = 0;
  stepper.moveTo(targetPosition);
}

void GhostMotion::stop() {
  stepper.stop();
}

void GhostMotion::update() {
  stepper.run();
}

bool GhostMotion::isMoving() const {
  return stepper.distanceToGo() != 0;
}

bool GhostMotion::atHome() const {
  return stepper.currentPosition() <= 5;
}

bool GhostMotion::atEnd() const {
  return stepper.currentPosition() >= GHOST_TRAVEL_STEPS - 5;
}
