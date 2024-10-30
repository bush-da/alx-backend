#!/usr/bin/env python3
"""Implement FIFO based replacement policie Cache"""
from collections import deque


BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """Class that inherits method and attributes from
    base class BaseCaching and implement put and get methods"""

    def __init__(self):
        """Initlize FIFOCache"""
        super().__init__()
        self.queue = deque()

    def get(self, key):
        """Return a value that is stored in self.cache_data"""
        return self.cache_data.get(key, None)

    def put(self, key, value):
        """insert a key value into self.cache_data in a FIFO Policie"""
        if key is None or value is None:
            return

        if key not in self.cache_data:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                old_key = self.queue.popleft()
                del self.cache_data[old_key]
                print(f"DISCARD: {old_key}")
            self.queue.append(key)
        self.cache_data[key] = value
