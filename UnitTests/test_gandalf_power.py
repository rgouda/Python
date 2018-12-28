import unittest
from ddt import ddt, data, unpack
from Euler.gandalf_power import Gandalf

@ddt
class GandalfTest(unittest.TestCase):

    @data(([2, -3, 2, 1, 3], 2),
          ([-2, -3, 2, 1, 3], 6),
          ([2, 3, 4, 5, 1], 0),
          ([1, -2, -3, 0, 1, 2, 3, -4, -5, -1, 2, 5], 9),
          ([-2, -2, 0, -1, 1, 2, -1, -9, -10], 23))
    @unpack
    def test_gandalf_power(self, input, expected):
        gandalf = Gandalf(input)
        self.assertEqual(gandalf.min_power, expected)
