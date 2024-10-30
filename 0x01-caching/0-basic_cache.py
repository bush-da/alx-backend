#!/usr/bin/env python3
"""Implement Basic caching"""


BaseCaching = __import__('base_caching').BaseCaching

class BasicCache(BaseCaching):
    """class that inherits basic methods and attribute from
    BasicCache class and implement put and get method"""

    def __init__(self):
        """Initialize the BasicCache"""
        super().__init__()

    def put(self, key, item):
        """insert item to self.cache_data with key and value"""
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """Return the value in self.cache_data linked to key"""
        return self.cache_data.get(key, None)
