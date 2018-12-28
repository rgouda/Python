import unittest
from Euler.pythagorean_triplet import Pythagorean

class TestPythagoreanTriplet(unittest.TestCase):

    def test_find_triplet_sum(self):
        pythagorean = Pythagorean(1000)
        (a, b, c) = pythagorean.find_triplets()
        self.assertEqual((a, b, c), (375, 200, 425))
