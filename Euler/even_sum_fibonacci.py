
from enum import Enum

class Fibonacci:
    a, b = 1, 2

    def __init__(self, type):
        self.number_type = type

    def _is_number_type(self, n):
        return n if n % 2 == self.number_type.value or self.number_type == NumberType.ANY else 0

    def sum(self, limit):
        if limit < 0:
            return 0
        curr_sum = 0
        curr_sum += self._is_number_type(self.a)
        curr_sum += self._is_number_type(self.b)
        while True:
            next_val = self.next()
            self.a, self.b = self.b, next_val
            if next_val > limit:
                break
            curr_sum += self._is_number_type(next_val)

        return curr_sum


    def next(self):
        return self.a + self.b


class NumberType(Enum):
    EVEN = 0
    ODD = 1
    ANY = 2
