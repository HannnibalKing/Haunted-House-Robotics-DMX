"""Haunted House Robotics DMX terminal simulations package."""

from .core import SCENARIOS, Scenario, Step, iter_steps, render_step
from .cli import main

__all__ = [
    "SCENARIOS",
    "Scenario",
    "Step",
    "iter_steps",
    "render_step",
    "main"
]
