
import math
import sys
import functools
import operator

class PrimeFactors:

    def __init__(self, n):
        self.for_n = n
        self.current_div = n
        self.primes = [1]
        self.all_primes = [1]

    def factors(self):
        if self.for_n <= 0:
            return []

        # If factors are already computed, just return that.
        if len(self.primes) > 1:
            return self.primes

        while True:
            next_prime_factor = self.next_prime_factor()
            if next_prime_factor == 0:
                break

            self.primes.append(next_prime_factor)

        return self.primes

    def next_prime_factor(self):
        next_prime = self.all_primes[0]
        while True:
            next_prime = self.next_prime(next_prime)
            if next_prime == 0:
                return 0

            div, mod = divmod(self.current_div, next_prime)
            if mod == 0:
                self.current_div = div
                return next_prime

    def next_prime(self, n):
        while True:
            n = n + (2 if n > 2 else 1)

            if n > self.for_n:
                break

            if self.is_prime(n):
                return n


        return 0

    def is_prime(self, n):
        # if n in self.all_primes:
        #     return True

        if self.is_in_primes_array(n):
            return True

        if n != 2 and n != 1:
            if n%2 == 0:
                return False

            for i in range(3, n//2, 2):
                if n%i == 0:
                    return False

        self.all_primes.append(n)
        return True

    '''Use binary search to find a value in a sorted list.'''
    def is_in_primes_array(self, val):
        length = len(self.all_primes)

        (left, right) = (0, length-1)
        while(left <= right):
            # Break if mid val
            # if not (self.all_primes[left] > val > self.all_primes[right]):
            #     break

            mid = left + math.ceil((right - left)/2)

            if self.all_primes[mid] == val:
                return True
            elif val < self.all_primes[mid]:
                (left, right) = (left, mid-1)
            else:
                (left, right) = (mid+1, right)

        return False

    def nth_prime(self, n):
        prime = 1
        for i in range(n):
            prime = self.next_prime(prime)

        return prime

    def sum_primes_less_than(self, n):
        return functools.reduce(operator.add, self.primes_less_than(n))

    def primes_less_than(self, n):
        if n < 1:
            return

        prime = 1
        while prime < n:
            yield prime
            prime = self.next_prime(prime)
        else:
            yield prime
