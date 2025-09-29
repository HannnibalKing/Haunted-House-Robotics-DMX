const CombatEscapeRoomController = require('../escape_room_controller');

const controllerOpts = {
  enableServer: false,
  enableWebSocket: false,
  enableMQTT: false
};

describe('CombatEscapeRoomController', () => {
  it('initializes mission state when starting a mission', () => {
    const controller = new CombatEscapeRoomController(controllerOpts);
    controller.startMission();

    expect(controller.missionState.active).toBe(true);
    expect(controller.missionState.currentRoom).toBe(1);
    expect(controller.missionState.threats).toEqual(controller.rooms[0].threats);
  });

  it('progresses through rooms and updates intel', () => {
    const controller = new CombatEscapeRoomController(controllerOpts);
    controller.startMission();

    controller.completeRoom(2);
    expect(controller.missionState.currentRoom).toBe(3);
    expect(controller.missionState.intel.hostilesNeutralized).toBe(3);
    expect(controller.missionState.intel.civiliansRescued).toBe(2);
  });

  it('calculates mission score with bonuses', () => {
    const controller = new CombatEscapeRoomController(controllerOpts);
    controller.startMission();
    controller.missionState.duration = 600;
    controller.missionState.intel = {
      documentsSecured: 10,
      hostilesNeutralized: 5,
      civiliansRescued: 3
    };
    controller.missionState.playersAlive = 4;

    const score = controller.calculateMissionScore();
    expect(score).toBeGreaterThan(1000);
  });
});
