import unittest
from Euler.multiples import Multiples
from ddt import ddt, data, unpack

@ddt
class TestMultiples(unittest.TestCase):

    def setUp(self):
        self.m = Multiples((3, 5))

    def test_zero(self):
        self.assertEqual(self.m.sum(0, 0), 0)

    @data((0, 10, 23), (0, 20, 78), (0, 1000, 233168))
    @unpack
    def test_zero_to_ten(self, m, n, answer):
        self.assertEqual(self.m.sum(m, n), answer)

    def test_euler_question(self):
        self.assertEqual(self.m.sum(0, 1000), 233168)

#
# def test_main():
#     test_support.run_unittest(TestMultiples, )
#
#
# if __name__ == '__main__':
#     test_main()