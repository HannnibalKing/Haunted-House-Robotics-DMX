"""Command line interface for Haunted House robotics simulations."""

from __future__ import annotations

import argparse
import itertools
import sys
from typing import List, Optional

from .core import SCENARIOS, banner, iter_steps, render_step


def parse_args(argv: List[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Simulate Haunted House Robotics sequences in the terminal",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "scenario",
        choices=sorted(SCENARIOS.keys()),
        help="Which scripted sequence to play",
    )
    parser.add_argument(
        "--speed",
        type=float,
        default=1.0,
        help="Playback multiplier (use >1.0 for faster simulation)",
    )
    parser.add_argument(
        "--loop",
        type=int,
        default=1,
        help="Number of times to replay the scenario",
    )
    parser.add_argument(
        "--instant",
        action="store_true",
        help="Print steps without any real-time delays",
    )
    return parser.parse_args(argv)


def run_instant(steps, loop_count: int) -> None:
    for loop_index in range(loop_count):
        if loop_count > 1:
            print(f"-- Pass {loop_index + 1} --")
        elapsed = 0.0
        for idx, step in enumerate(steps, start=1):
            print(render_step(idx, elapsed, step))
            elapsed += step.duration


def main(argv: Optional[List[str]] = None) -> int:
    args = parse_args(sys.argv[1:] if argv is None else argv)

    steps = SCENARIOS[args.scenario]
    speed = max(args.speed, 0.1)

    title = f"{args.scenario.upper()} SEQUENCE"
    print(banner(title))

    if args.instant:
        run_instant(steps, args.loop)
        return 0

    for loop_index in range(args.loop):
        if args.loop > 1:
            print(f"-- Pass {loop_index + 1} --")
        for line in iter_steps(steps, speed):
            print(line)
    print("\nSequence complete.\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
