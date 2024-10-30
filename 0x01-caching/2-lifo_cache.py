#!/usr/bin/env python3
"""Implement LIFO cache replacement policie class"""


BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """class the inherits from BaseCaching and implement
    get and put method that will help us to get and set values
    from cache"""

    def __init__(self):
        super().__init__()
        self.stack = []

    def get(self, key):
        """Get a value from self.cache_data"""
        return self.cache_data.get(key, None)

    def put(self, key, value):
        """put a key value in self.cache_data"""
        if key is None or value is None:
            return

        if key not in self.cache_data:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                old_key = self.stack.pop()
                del self.cache_data[old_key]
                print(f"DISCARD: {old_key}")
            self.stack.append(key)
        self.cache_data[key] = value
