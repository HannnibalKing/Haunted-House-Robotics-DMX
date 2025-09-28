# Animated Skeleton Wiring Diagram

```
+12V -----(Power Supply)---------------------------+-----------------
              |                                    |                 |
              | (Step-down to 6V)                  |                 |
              +-----> Servo Rail ------------------+                 |
              |                                                    (DMX Par)
              |                                                     XLR IN
              v                                                         |
+5V (Arduino)-----------------------------------------------+           |
|                                                           |           |
|  [Arduino UNO]                                            |           |
|  +----------------------------+                           |           |
|  | VIN  GND  5V  3V3   ...    |                           |           |
|  |                            |                           |           |
|  | D2  D3  D5  D6  D9    A0   |                           |           |
|  +----------------------------+                           |           |
|        |   |   |   |    |     |                           |           |
|        |   |   |   |    |     +--> Sound Sensor (SIG) ----+           |
|        |   |   |   |    |
|        |   |   |   |    +--> Servo (Jaw)
|        |   |   |   +-------> Servo (Right Arm)
|        |   |   +-----------> Servo (Left Arm)
|        |   +---------------> Servo (Head)
|        +-------------------> PIR Sensor (SIG)
|
|  DMX Shield (MAX485)
|  +------------------+
|  | XLR OUT   XLR IN |---- DMX Daisy Chain ---> Lights
|  | A/B Driver pins  |
|  +------------------+
|
+-----------------------------------------------------------+
```

**Notes**
- Power the servos from a dedicated 6V regulator capable of 3A; tie ground to Arduino ground.
- The DMX shield handles the balanced line; terminate the DMX chain with a 120Ω resistor.
- Use twisted pair wiring for DMX A/B lines to reduce noise.
