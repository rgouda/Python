
import operator
import functools
import copy


'''Euler 8: Find the series of adjacent digits that have the greatest product in a matrix of numbers.'''
def largest_product_in_series(array, n):
    if len(array) < n:
        return (0, 0)

    series = [int(s) for s in array[0:n]]
    prev_product = 1
    save_series = []
    for i,s in enumerate(array[n - 1:], n - 1):
        series[i%n] = int(s)
        product = functools.reduce(operator.mul, series)
        if product > prev_product:
            prev_product = product
            save_series = copy.copy(series)

    return (save_series, prev_product)


'''
Euler 11: Find greatest product of adjacent numbers in the same direction i.e. up, down, left, right, or 
diagonally.
'''
class Matrix:
    arr = None
    include_columns = True
    include_diagonals = True

    def __init__(self, arr, include_columns = True, include_diagonals = True):
        self.arr = arr
        self.include_columns = include_columns
        self.include_diagonals = include_diagonals
        self.assert_valid_array()

    '''
    Check array is not None.
    Check the array is two dimensional
    Check the array is not jagged.
    '''
    def assert_valid_array(self):
        if (self.arr is None or self.arr == []):
            raise Exception("Empty array not allowed.")

        if not (isinstance(self.arr, list) and isinstance(self.arr[0], list)):
            raise Exception("Array needs to be two dimensional.")

        length = len(self.arr[0])
        if (any(1 for r in self.arr if len(r) != length)):
            raise Exception('Jagged arrays are not allowed')

    def columnar_slice(self, col_nr):
        columnar_row = [row[col_nr] for row in self.arr]
        return columnar_row

    '''
    Returns diagonal elements from the starting element.
    E.g. for row=0, col=0, it will return the list of 'X' elements.
        | X _ _ _ |
        | _ X _ _ |
        | _ _ X _ |
        | _ _ _ X |
    '''
    def diagonal_slice(self, row, col):
        row_data = list()
        while row < len(self.arr) and col < len(self.arr[0]):
            row_data.append(self.arr[row][col])
            row = row + 1
            col = col + 1

        return row_data

    '''Returns a list of rows, will also return columns and diagonal elements as rows if the flag is set.'''
    def rows(self):
        for r in self.arr:
            yield r

        if self.include_columns:
            for ci in range(len(self.arr[0])):
                yield self.columnar_slice(ci)

        if self.include_diagonals:
            for i in range(len(self.arr), 0, -1):
                yield self.diagonal_slice(i, 0)

            for i in range(len(self.arr[0])):
                yield self.diagonal_slice(0, i)

    '''
    Euler 11: Find greatest product of adjacent numbers in the same direction i.e. up, down, left, right, or 
    diagonally.
    '''
    def greatest_product_in_series(self, nr_of_items):
        max_product = None
        max_series = None
        for r in self.rows():
            (series, product) = largest_product_in_series(r, nr_of_items)
            if max_product is None or product > max_product:
                max_product = product
                max_series = series

        return (max_series, max_product)
