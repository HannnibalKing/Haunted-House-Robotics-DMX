"""Compatibility wrapper for the packaged haunt simulator CLI."""

from haunted_sim.cli import main as _main

__all__ = ["main"]

main = _main


if __name__ == "__main__":
    raise SystemExit(_main())
