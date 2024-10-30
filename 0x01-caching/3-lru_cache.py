#!/usr/bin/env python3
"""implement lru that evicts the data hasn't been accessed
for longest time"""
from collections import OrderedDict


BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """Class that inherits from base class BaseCaching
    and implement get and put method according to LRU policie"""

    def __init__(self):
        """Initilize class"""
        super().__init__()
        self.cache_data = OrderedDict()

    def get(self, key):
        """retrive a value from self.cache_data"""
        return self.cache_data.get(key, None)

    def put(self, key, item):
        """insert or update a key value in self.cache_data"""
        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            old_key = self.cache_data.popitem(last=False)
            print(f"DISCARD: {old_key[0]}")

        self.cache_data[key] = item
