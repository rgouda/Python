import unittest
from Euler.sum_square_diff_euler6 import sum_square_differences

class TestSumSquareDiffs(unittest.TestCase):
    def test_sum_square_diffs_10(self):
        self.assertEqual(sum_square_differences(10), 2640)

    def test_sum_square_diffs_20(self):
        self.assertEqual(sum_square_differences(20), 41230)

    def test_sum_square_diffs_100(self):
        self.assertEqual(sum_square_differences(100), 25164150)