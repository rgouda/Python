import unittest
from Euler.lowest_divisible_euler5 import LowestDivisible

class TestLowestDivisible(unittest.TestCase):
    def setUp(self):
        self.lDivisible = LowestDivisible()

    def test_for_6(self):
        self.assertEqual(self.lDivisible.find_lowest_divisible(6), 60)

    def test_for_10(self):
        self.assertEqual(self.lDivisible.find_lowest_divisible(10), 2520)

    def test_for_20(self):
        self.assertEqual(self.lDivisible.find_lowest_divisible(20), 232792560)

    def test_for_30(self):
        self.assertEqual(self.lDivisible.find_lowest_divisible(30), 2329089562800)