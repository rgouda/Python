
import operator
import functools
import copy

def largest_product_in_series(string, n):
    if len(string) < n:
        return 0

    series = [int(s) for s in string[0:n]]
    prev_product = 1
    save_series = []
    for i,s in enumerate(string[n-1:], n-1):
        series[i%n] = int(s)
        product = functools.reduce(operator.mul, series)
        if product > prev_product:
            prev_product = product
            save_series = copy.copy(series)

    return (save_series, prev_product)