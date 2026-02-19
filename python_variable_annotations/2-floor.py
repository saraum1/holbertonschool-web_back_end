#!/usr/bin/env python3
"""Module that provides a type-annotated floor function."""


def floor(n: float) -> int:
    """Returns the floor of a float as an integer."""
    return int(n) if n >= 0 else int(n) - 1
