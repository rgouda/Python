import unittest
from Euler.prime_factors_euler3 import PrimeFactors
from ddt import ddt, data, unpack
import sys

@ddt
class TestPrimeFactors(unittest.TestCase):

    def setUp(self):
        self.prime = PrimeFactors(None)

    def is_list_equal(self, list1, list2):
        return (len(list1) == len(list2) and sorted(list1) == sorted(list2))

    @data(1, 2, 3, 5, 7, 13, 17, 23)
    def test_is_prime(self, n):
        self.assertEqual(self.prime.is_prime(n), True)

    @data(4, 6, 8, 9, 15, 18, 21, 25)
    def test_is_not_prime(self, n):
        self.assertEqual(self.prime.is_prime(n), False)

    def test_negatives(self):
        factors = PrimeFactors(-1).factors()
        self.assertEqual(len(factors), 0)

    def test_is_in_primes_array(self):
        pass

    @data((3, [1,3]), (5, [1,5]), (6, [1,2,3]), (8, [1, 2, 2, 2]), (9, [1, 3, 3]),
          (13195, [1, 5, 7, 13, 29]),)
          # (600851475143, [ 1, ]))
    @unpack
    def test_even_prime(self, n, l):
        factors = PrimeFactors(n).factors()
        self.assertEqual(factors, l)

    def test_odd_prime(self):
        factors = PrimeFactors(3).factors()
        test = self.assertEqual(factors, [1, 3])

    # Euler 7th
    @data((6, 13), (10001, 104743))
    @unpack
    def test_nth_prime(self, n, nth_prime):
        pf = PrimeFactors(sys.maxsize)
        self.assertEqual(pf.nth_prime(n), nth_prime)

    # Euler 10th.
    # Takes about 43 minutes. Can it be optimized further?
    def test_sum_less_than_2M_primes(self):
        pf = PrimeFactors(sys.maxsize)
        self.assertEqual(pf.sum_primes_less_than(2000000), 142913828923)