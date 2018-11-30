import unittest
from Euler.even_sum_fibonacci import Fibonacci, NumberType


class TestFibonacci(unittest.TestCase):
    def setUp(self):
        self.even_fib = Fibonacci(NumberType.EVEN)
        self.odd_fib = Fibonacci(NumberType.ODD)
        self.all_fib = Fibonacci(NumberType.ANY)

    def test_number_type(self):
        self.assertEqual(NumberType.EVEN.value, 0)
        self.assertEqual(NumberType.ODD.value, 1)
        self.assertEqual(NumberType.ANY.value, 2)

    def test_fib_negative(self):
        self.assertEqual(self.even_fib.sum(-10), 0)
        self.assertEqual(self.even_fib.sum(-2433), 0)

    def test_even_fib(self):
        # 1 2 3 5 8 13 21 34
        self.assertEqual(self.even_fib.sum(10), 10)

    def test_odd_fib(self):
        self.assertEqual(self.odd_fib.sum(10), 9)

    def test_all_fib(self):
        self.assertEqual(self.all_fib.sum(10), 19)

    def test_euler_question(self):
        self.assertEqual(self.even_fib.sum(4000000), 4613732)