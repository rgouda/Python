import unittest
from ddt import ddt, data, unpack
from Euler.triangular_number_euler12 import TriangularNumber

@ddt
class TriangularNumberTest(unittest.TestCase):
    def setUp(self):
        pass

    @data((5, 28), (6, 36), (7, -1), (8, 120), (9, 528), (500, 434343434343))
    @unpack
    def test_for_divisor_5(self, n, expected):
        n = TriangularNumber(n).with_number_of_divisors()
        self.assertEqual(n, expected)
