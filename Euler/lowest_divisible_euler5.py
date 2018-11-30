
from Euler.prime_factors_euler3 import PrimeFactors
from itertools import groupby
from collections import defaultdict
import functools
import math
import operator

# Class to return the lowest number that is divisible by numbers between 1 to n.
class LowestDivisible():

    def __init__(self):
        pass

    '''Here is the algorithm:
       - for each number between 1 to n
       -   find prime factors
       -   get the highest exponent for each prime factor
       - multiply each prime factor with highest exponent to get the lowest number
       - For efficiency:
       -   have the above loop iterate through odd number 
       -   pick an even number of n or n-1, express it as an exponent of 2.
       - 
    '''
    def find_lowest_divisible(self, n):
        hoe = defaultdict(int)
        for i in range(1, n, 2):
            pf = PrimeFactors(i).factors()
            for g in groupby(pf):
                hoe[g[0]] = max(hoe[g[0]], len(list(g[1])))

        lowest_divisible = math.pow(2, int(math.log2(n)))
        lowest_divisible = lowest_divisible * \
                           functools.reduce(operator.mul,
                                            (math.pow(k, v) for k, v in hoe.items()))

        return lowest_divisible
