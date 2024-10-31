#!/usr/bin/env python3
"""Implements LFU cache replacement policie"""
from collections import defaultdict, OrderedDict


BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """Class that inherits BaseCaching and implement get and
    put methods that follow LRU policie"""

    def __init__(self):
        """Initialize a class"""
        super().__init__()
        self.freq_map = defaultdict(OrderedDict)
        self.key_freq = {}
        self.min_freq = 0

    def get(self, key):
        """Return a value from self.cache_data"""
        if key not in self.cache_data:
            return None
        item = self.cache_data[key]
        self._update_freq(key)
        return item

    def put(self, key, item):
        """Insert or update key value in self.cache_data"""
        if key is None or item is None:
            return None

        if key in self.cache_data:
            self.cache_data[key] = item
            self._update_freq(key)
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                old_key, _ = self.freq_map[self.min_freq].popitem(last=False)
                del self.cache_data[old_key]
                del self.key_freq[old_key]
                print(f"DISCARD: {old_key}")

            self.cache_data[key] = item
            self.key_freq[key] = 1
            self.min_freq = 1
            self.freq_map[1][key] = item

    def _update_freq(self, key):
        """evicts data that has been accessed the least no of times"""
        freq = self.key_freq[key]
        item = self.cache_data[key]

        del self.freq_map[freq][key]
        if not self.freq_map[freq]:
            del self.freq_map[freq]
            if self.min_freq == freq:
                self.min_freq += 1

        self.freq_map[freq + 1][key] = item
        self.key_freq[key] = freq + 1
