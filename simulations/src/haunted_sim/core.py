"""Core data structures and helpers for haunt robotics simulations."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, Iterable, Iterator, List, Optional


@dataclass(frozen=True)
class Step:
    cue: str
    description: str
    duration: float = 0.0
    highlight: Optional[str] = None


Scenario = List[Step]


SCENARIOS: Dict[str, Scenario] = {
    "skeleton": [
        Step("INIT", "Power on animatronic skeleton core"),
        Step("M05", "Set head servo to neutral"),
        Step("L12", "Fade DMX wash to ember red", 0.3),
        Step("S11", "Idle loop: finger twitch", 0.5),
        Step("PIR", "Motion trip detected", 0.2, highlight="VISITOR ENTERS"),
        Step("M29", "Snap head to visitor"),
        Step("M33", "Raise both arms", 0.4),
        Step("AUX", "Trigger jaw chatter synced to audio", 0.5),
        Step("DMX", "Flash strobes + cold white backlight", 0.3),
        Step("WAIT", "Hold pose", 0.5),
        Step("RESET", "Arms down, lights to idle"),
    ],
    "ghost": [
        Step("INIT", "Pre-charge carriage and test limit switches"),
        Step("L21", "Set LED strip to cyan breathing"),
        Step("PIR", "Motion detect at hallway", 0.2, highlight="GUEST APPROACH"),
        Step("M14", "Carriage glide forward 1.2m", 0.6),
        Step("FX1", "Fog blast + shriek sample", 0.4),
        Step("L99", "Strobe white / amber alternation", 0.4),
        Step("WAIT", "Hover at guest", 0.5),
        Step("M02", "Retreat carriage to home", 0.6),
        Step("RESET", "Resume cyan breathing + cooldown"),
    ],
    "app": [
        Step("BOOT", "Launch Scare Experience dashboard"),
        Step("API", "Sync overnight analytics cache"),
        Step("POLL", "Receive new rating: Room 02 score 9.2"),
        Step("AI", "Generate floorplan suggestion", 0.3, highlight="AI SYNTH"),
        Step("PUSH", "Broadcast heatmap update to tablets"),
    ],
}


def banner(title: str) -> str:
    bar = "=" * len(title)
    return f"\n{bar}\n{title}\n{bar}\n"


def render_step(step_id: int, elapsed: float, step: Step) -> str:
    cue = step.cue.ljust(6)
    duration = f"{step.duration:>4.1f}s" if step.duration else "   -  "
    highlight = f"  ⟹  {step.highlight}" if step.highlight else ""
    return f"[{elapsed:05.2f}s] #{step_id:02d}  {cue}  {step.description}  ({duration}){highlight}"


def iter_steps(steps: Iterable[Step], speed: float) -> Iterator[str]:
    elapsed = 0.0
    for index, step in enumerate(steps, start=1):
        yield render_step(index, elapsed, step)
        sleep_time = step.duration / speed
        if sleep_time > 0:
            from time import sleep

            sleep(sleep_time)
            elapsed += step.duration
        else:
            elapsed += 0.0

__all__ = [
    "Step",
    "Scenario",
    "SCENARIOS",
    "banner",
    "render_step",
    "iter_steps"
]
