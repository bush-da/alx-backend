#!/usr/bin/env python3
"""Script with function index_range that which accept two parameters
start page and page size and returns start and end index of the page
"""
import csv
import math
from typing import List


def index_range(page: int, page_size: int) -> tuple:
    """Function that accept page number and page size
    return start and end index of page"""
    end_idx = page_size * page
    start_idx = end_idx - page_size
    return (start_idx, end_idx)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Returns a page of data from the dataset.

        Args:
            page (int): The current page number (1-indexed).
            page_size (int): The number of items per page.

        Returns:
            List[List]: The list of rows in the current page of the dataset.
        """
        assert isinstance(page, int) and isinstance(page_size, int)
        assert page_size > 0 or page > 0
        start_idx, end_idx = index_range(page, page_size)
        datasets = self.dataset()
        if start_idx > len(datasets):
            return []
        return datasets[start_idx:end_idx]
