#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
from typing import Dict, List, Optional


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE, newline="") as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: Optional[int] = None,
                        page_size: int = 10) -> Dict:
        """Return a deletion-resilient page of the dataset.

        Args:
            index (Optional[int]): start index for the page (default 0)
            page_size (int): number of items to return

        Returns:
            Dict: {
                "index": start index used,
                "next_index": next index to query,
                "page_size": current page size,
                "data": list of rows
            }
        """
        if index is None:
            index = 0

        assert isinstance(index, int) and index >= 0
        assert isinstance(page_size, int) and page_size > 0

        indexed = self.indexed_dataset()
        assert index < len(self.dataset())

        data: List[List] = []
        current = index

        # Collect page_size existing rows, skipping deleted indexes
        while len(data) < page_size and current < len(self.dataset()):
            if current in indexed:
                data.append(indexed[current])
            current += 1

        return {
            "index": index,
            "next_index": current,
            "page_size": page_size,
            "data": data,
        }
