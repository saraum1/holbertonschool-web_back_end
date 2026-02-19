#!/usr/bin/env python3
"""Module that provides a function that returns another function."""
from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """Returns a function that multiplies a float by a multiplier."""
    def multiplier_func(n: float) -> float:
        """Internal function that performs the multiplication."""
        return n * multiplier
    return multiplier_func
