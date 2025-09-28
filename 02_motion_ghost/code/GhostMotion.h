#pragma once

#include <AccelStepper.h>

class GhostMotion {
public:
  GhostMotion();
  void begin();
  void moveForward();
  void moveHome();
  void stop();
  void update();
  bool isMoving() const;
  bool atHome() const;
  bool atEnd() const;

private:
  AccelStepper stepper;
  long targetPosition = 0;
};
