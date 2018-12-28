import unittest
from Euler.largest_product_in_series_euler8 import Matrix

class MatrixTest(unittest.TestCase):

    def setUp(self):
        self.matrix = \
            [
                [1, 2, 3, 4],
                [0, 1, 2, 3],
                [5, 6, 3, 2],
                [1, 2, 7, 5]
            ]

    def test_largest_product_matrix_with_4_elements(self):
        matrix = Matrix(self.matrix)
        (max_series, max_product) = matrix.greatest_product_in_series(4)
        self.assertEqual(len(set(max_series)) - len(set([5, 6, 7, 2])), 0)
        self.assertEqual(max_product, 180)

    def test_largest_product_matrix_with_2_elements(self):
        matrix = Matrix(self.matrix)
        (max_series, max_product) = matrix.greatest_product_in_series(2)
        self.assertEqual(len(set(max_series)) - len(set([6, 7])), 0)
        self.assertEqual(max_product, 42)
