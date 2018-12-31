import itertools

class Sum:
    digit_map = dict()
    _sum = None

    def __init__(self, string):
        self.string = string
        self.assign_map()

    def assign_map(self):
        for i in range(10):
            self.digit_map[str(i)] = i

    def compute_sum(self):
        return sum(self.digit_map[c] for c in self.string)

    def first_digits_in_sum(self, nr_of_digits):
        if nr_of_digits > len(self.string) or nr_of_digits == 0:
            return -1

        lower_bound = pow(10, nr_of_digits-1)
        max_possible_sum = 9*len(self.string)
        if max_possible_sum < lower_bound:
            return -1

        if self._sum is None:
            self._sum = str(self.compute_sum())

        return int(self._sum[:nr_of_digits])

