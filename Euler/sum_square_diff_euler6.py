
import functools
import operator

def sum_square_differences(n):
    X = functools.reduce(operator.add, (i*i for i in range(1, n+1)))
    Y = n * (n+1) / 2
    Z = Y*Y - X
    return Z
