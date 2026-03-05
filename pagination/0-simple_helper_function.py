#!/usr/bin/env python3
"""Module that provides a helper function for pagination."""


def index_range(page: int, page_size: int) -> tuple:
    """Return start and end index for pagination.

    Args:
        page (int): current page number (1-indexed)
        page_size (int): number of items per page

    Returns:
        tuple: (start_index, end_index)
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)
