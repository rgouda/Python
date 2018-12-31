
from Euler.prime_factors_euler3 import PrimeFactors

'''
Triangle number is the count of numbers in pyramid number.
Below is an example of Pyramid number for n=7 - 
    1
    1  1
    1  2  1
    1  3  3  1
    1  4  6  4  1
    1  5 10 10  5 1
    1  6 15 20 15 6 1
The triangle number for the above is 28 (i.e. the number of numbers in above pyramid)
Similarly, the triangle number for n=5 is 15. The triangle number is nothing but the Gaussian 
sum = 1, 2, 3, ... n = n*(n+1)/2.
The divisors for 28 = 1, 2, 4, 7, 28. So the number of divisors for 28 is 5.
The exercise of this Euler problem is to find a triangle number that satisfies the given number of divisors.
prime_factors -> divisors
1 2 2 7
1 2 7 = 3 + 2

n = 8
1 2 2 3 3
1, 2, 3, 4, 9, 36
3 + 3 = 6

n = 9
1 3 3 5
1 3 5 15 45
set(factors) + len(factors)-2
'''
class TriangularNumber:

    def __init__(self, count):
        self.count = count

    def triangle_number(self, n):
        return int(n * (n+1) / 2)

    '''Returns the triangle number that satisfies number of divisors. Will return zero if not found.'''
    def with_number_of_divisors(self):
        curr_count = 0
        i = 1
        triangle_nr = -1
        while curr_count < self.count:
            i += 1
            triangle_nr = self.triangle_number(i)
            factors = PrimeFactors(triangle_nr).factors()
            curr_count = len(set(factors)) + len(factors) - 2

            if curr_count == self.count:
                return triangle_nr

        return -1


if __name__ == "__main__":
    i = 0
    while i<10:
        t = TriangularNumber(i)
        print(f"{i}={t.with_number_of_divisors()}")
        i+=1