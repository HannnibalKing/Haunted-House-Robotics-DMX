#include <Arduino.h>
#include "Config.h"
#include "ServoController.h"
#include "DMXController.h"
#include "MotionDetector.h"
#include "AudioSync.h"

enum SkeletonMode {
  MODE_IDLE,
  MODE_ALERT,
  MODE_SHOW
};

ServoController servoController;
DMXController dmxController;
MotionDetector motionDetector;
AudioSync audioSync;

SkeletonMode currentMode = MODE_IDLE;
unsigned long lastIdleMove = 0;
unsigned long lastMotionTime = 0;
unsigned long lastShowStepTime = 0;
unsigned long lastAudioTime = 0;
uint8_t showStep = 0;

void enterIdleMode() {
  currentMode = MODE_IDLE;
  servoController.idlePose();
  dmxController.setAmbient();
}

void enterAlertMode() {
  currentMode = MODE_ALERT;
  lastMotionTime = millis();
  servoController.motionPose();
  dmxController.setAlert();
}

void enterShowMode() {
  currentMode = MODE_SHOW;
  lastShowStepTime = millis();
  showStep = 0;
  dmxController.setPalette(COLOR_SHOW_A);
}

void setup() {
  Serial.begin(115200);
  servoController.begin();
  dmxController.begin();
  motionDetector.begin(PIN_PIR_SENSOR);
  audioSync.begin(PIN_SOUND_SENSOR);
  enterIdleMode();
}

void loop() {
  unsigned long now = millis();

  // Motion handling
  if (motionDetector.isMotionDetected()) {
    Serial.println(F("Motion detected"));
    enterAlertMode();
  }

  // Audio handling for jaw movement
  if (now - lastAudioTime > AUDIO_REACTION_INTERVAL / 10) {
    lastAudioTime = now;
    uint16_t level = audioSync.readLevel();
    if (level > SOUND_THRESHOLD) {
      servoController.audioPose(level);
    }
  }

  switch (currentMode) {
    case MODE_IDLE:
      if (now - lastIdleMove > IDLE_MOVE_INTERVAL) {
        lastIdleMove = now;
        servoController.idlePose();
      }
      break;

    case MODE_ALERT:
      if (now - lastMotionTime > 1500) {
        enterShowMode();
      }
      break;

    case MODE_SHOW:
      if (now - lastShowStepTime > 600) {
        lastShowStepTime = now;
        servoController.showPose(showStep);
        if (showStep % 2 == 0) {
          dmxController.setPalette(COLOR_SHOW_A);
        } else {
          dmxController.setPalette(COLOR_SHOW_B);
        }
        showStep++;

        if (showStep > 12) {
          enterIdleMode();
        }
      }
      break;
  }

  // Return to idle if no recent motion
  if (currentMode != MODE_IDLE && (now - lastMotionTime > PIR_COOLDOWN)) {
    enterIdleMode();
  }
}
