# Motion Ghost Wiring Diagram

```
12V PSU ---------------------------+-----------------------------+
                                   |                             |
                                   |                             +--> Fog Machine (via relay)
                                   v
                              Buck Converter (5V)
                                   |
                                   +--> Arduino Nano 5V pin

Arduino Nano
+-------------------------------+
| D2 D3 D4 D5 D6 D7 D8 D9 D10   |
|                               |
|  USB (for programming)        |
+-------------------------------+
    |  |  |  |  |  |  |  |  |
    |  |  |  |  |  |  |  |  +--> Relay IN (Fog)
    |  |  |  |  |  |  |  +-----> Limit Switch (END) -> GND
    |  |  |  |  |  |  +--------> Limit Switch (HOME) -> GND
    |  |  |  |  |  +-----------> PIR Sensor OUT (HC-SR501)
    |  |  |  |  +--------------> LED Strip DIN (through 330Ω)
    |  |  +--------------------> ULN2003 IN4
    |  +-----------------------> ULN2003 IN3
    +--------------------------> ULN2003 IN2
                               -> ULN2003 IN1

ULN2003 Driver Board
+------------------------------+
| IN1 IN2 IN3 IN4  VCC  GND    |
| OUT1..OUT4 -> Stepper 28BYJ  |
+------------------------------+

WS2812B LED Strip
+-----------+      +-----------+
| +5V  DIN  |----->| DOUT +5V  |---->
|  GND      |      |   GND     |
+-----------+      +-----------+
```

**Notes**
- Always common ground the PIR sensor, stepper driver, LEDs, and relay with the Arduino.
- Place a 1000 µF capacitor across the LED strip 5V/GND to prevent inrush flicker.
- Use twisted pair or cable chain for moving carriage wiring to avoid snags.
