#!/usr/bin/env python3
"""Module that provides a type-annotated to_kv function."""
from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Returns a tuple containing a string and the square of a number."""
    return (k, float(v ** 2))
