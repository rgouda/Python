
class CollatzSequence:
    def __init__(self, n):
        self.n = n

    @property
    def next(self):
        if self.n % 2 == 0:
            #handle even
            self.n = self.n / 2
        else:
            #handle odd
            self.n = 3 * self.n + 1

        return self.n

    def counter(self, n = None):
        if n is not None:
            self.n = n

        counter = 1
        while self.next != 1:
            counter = counter + 1

        if self.n == 2:
            counter = counter + 1

        return counter + 1

    def longest_chain(self, n):
        max_terms = 1
        max_n = n
        while n > 1:
            terms = self.counter(n)
            if max_terms < terms:
                max_terms = terms
                max_n = n
            n = n - 1

        return  (max_n, max_terms)


if __name__ == "__main__":
    c = CollatzSequence(13)
    print(c.longest_chain(1000000))