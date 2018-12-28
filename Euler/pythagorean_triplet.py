
class Pythagorean:
    target_sum = None
    a = None
    b = None
    c = None

    def __init__(self, target_sum):
        self.target_sum = target_sum

    def is_triplet(self):
        return self.a * self.a + self.b * self.b == self.c * self.c

    '''Apply Euclid formula to generate triplets.'''
    def set_mn(self, m, n):
        m_square = m * m
        n_square = n * n
        two_m_n = 2 * m * n
        self.a = m_square - n_square
        self.b = two_m_n
        self.c = m_square + n_square
        assert  self.is_triplet() == True

    def is_triplet_sum(self):
        return (self.a + self.b + self.c) == self.target_sum

    def triplet_exceeds_sum(self):
        return (self.a + self.b + self.c) > self.target_sum

    def find_triplets(self):
        for m in range(2, self.target_sum):
            for n in range(1, m-1):
                self.set_mn(m, n)
                if self.is_triplet_sum():
                    return (self.a, self.b, self.c)
                if self.triplet_exceeds_sum():
                    break

        return (0, 0, 0)