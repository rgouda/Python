import unittest
from Euler.largest_palindrome import Palindrome

class TestLargestPalindrome(unittest.TestCase):

    def test_largest_2_digit_palindrom(self):
        l, r = Palindrome(2).find_palindrome()
        self.assertEqual(((l == 91 and r == 99 ) or (l == 99 or r == 91)), True)

    def test_largest_3_digit_palindrome(self):
        l, r = Palindrome(3).find_palindrome()
        self.assertEqual(((l == 999 and r == 91)), True)

    def test_largest_4_digit_palindrom(self):
        l, r = Palindrome(4).find_palindrome()
        self.assertEqual((l == 9999 and r == 9901), True)