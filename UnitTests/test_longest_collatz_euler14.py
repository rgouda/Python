import unittest
from Euler.longest_collatz_euler14 import CollatzSequence

class CollatzSequenceTest(unittest.TestCase):

    def test_next(self):
        c = CollatzSequence(1)
        self.assertEqual(c.next, 4)
        c = CollatzSequence(2)
        self.assertEqual(c.next, 1)
        c = CollatzSequence(3)
        self.assertEqual(c.next, 10)

    def test_counter(self):
        c = CollatzSequence(1)
        self.assertEqual(c.counter(13), 10)
        self.assertEqual(c.counter(9), 20)
        self.assertEqual(c.counter(8), 4)
        self.assertEqual(c.counter(16), 5)

    def test_longest_chain(self):
        c = CollatzSequence(0)
        self.assertEqual(c.longest_chain(13), (9, 20))
        self.assertEqual(c.longest_chain(1000000), (837799, 525))