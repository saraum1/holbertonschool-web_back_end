#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination module.
This module provides a Server class to paginate a database of popular
baby names even when rows are deleted between requests.
"""

import csv
from typing import List, Dict, Optional


class Server:
    """
    Server class to paginate a database of popular baby names.
    The goal is to provide a deletion-resilient pagination mechanism.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """
        Initializes the Server instance with private dataset attributes.
        """
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """
        Reads and caches the dataset from the CSV file.
        Returns:
            List[List]: The dataset excluding the header.
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """
        Indexes the dataset by their original position, starting from 0.
        Returns:
            Dict[int, List]: A dictionary mapping index to row data.
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(
        self, index: Optional[int] = None, page_size: int = 10
    ) -> Dict:
        """
        Provides deletion-resilient pagination data.
        Args:
            index: The starting index for the current page.
            page_size: The number of items to include in the page.
        Returns:
            A dictionary containing the index, next_index, page_size, and data.
        """
    
        indexed_data = self.indexed_dataset()
        assert index is not None and 0 <= index < len(indexed_data)

        data: List[List] = []
        current_index: int = index
        data_count: int = 0

    
        while data_count < page_size and current_index < len(indexed_data):
            item = indexed_data.get(current_index)
            if item:
                data.append(item)
                data_count += 1
            current_index += 1

        return {
            'index': index,
            'next_index': current_index,
            'page_size': len(data),
            'data': data
        }
