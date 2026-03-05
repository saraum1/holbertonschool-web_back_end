#!/usr/bin/env python3
"""Module that provides simple pagination over a CSV dataset."""

import csv
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Return start and end index for pagination (1-indexed pages).

    Args:
        page (int): page number (starts at 1)
        page_size (int): number of items per page

    Returns:
        Tuple[int, int]: (start_index, end_index)
    """
    start_index: int = (page - 1) * page_size
    end_index: int = page * page_size
    return (start_index, end_index)


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        """Initialize the server with a cached dataset placeholder."""
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset loaded from CSV file (header removed)."""
        if self.__dataset is None:
            with open(self.DATA_FILE, newline="") as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Return a page of the dataset.

        Uses assertions to ensure page and page_size are integers > 0.
        Returns an empty list if the requested page is out of range.

        Args:
            page (int): page number (starts at 1)
            page_size (int): number of items per page

        Returns:
            List[List]: the requested page of rows
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        start, end = index_range(page, page_size)
        data = self.dataset()

        if start >= len(data):
            return []

        return data[start:end]
