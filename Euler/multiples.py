

class Multiples:
    def __init__(self, rs):
        self.rs = rs

    def is_multiple(self, i):
        return any(True for r in self.rs if i%r == 0)

    def sum(self, m, n):
        return sum(i for i in range(m, n) if self.is_multiple(i))


if __name__ == "__main__":
    m = Multiples((3, 5))
    print(m.sum(0, 1000))
