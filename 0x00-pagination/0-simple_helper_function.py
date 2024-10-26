#!/usr/bin/env python3
"""Script with function index_range that which accept two parameters
start page and page size and returns start and end index of the page
"""


def index_range(page: int, page_size: int) -> tuple:
    """Function that accept page number and page size
    return start and end index of page"""
    end_idx = page_size * page
    start_idx = end_idx - page_size
    return (start_idx, end_idx)
