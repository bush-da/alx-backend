#!/usr/bin/env python3
"""implement MRU that evicts the data hasn't been accessed
for longest time"""
from collections import OrderedDict


BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """Class that inherits from base class BaseCaching
    and implement get and put method according to MRU policie"""

    def __init__(self):
        """Initilize class"""
        super().__init__()
        self.cache_data = OrderedDict()

    def get(self, key):
        """retrive a value from self.cache_data"""
        if key and key in self.cache_data:
            self.cache_data.move_to_end(key)
        return self.cache_data.get(key, None)

    def put(self, key, item):
        """insert or update a key value in self.cache_data"""
        if key is None or item is None:
            return

        if key and key in self.cache_data:
            self.cache_data.move_to_end(key)

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            old_key, _ = self.cache_data.popitem(last=True)
            print(f"DISCARD: {old_key}")

        self.cache_data[key] = item
