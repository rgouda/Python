
class Palindrome():

    def __init__(self, nr_of_digits):
        self.nr_of_digits = nr_of_digits

    def find_palindrome(self):
        number = int('9' * self.nr_of_digits)
        for l in range(number, 1, -1):
            for r in range(number, 1, -1):
                if (self.is_palindrom(l*r)):
                    return (l, r)

    def is_palindrom(self, n):
        if str(n) == ''.join(reversed(str(n))):
            return True
        else:
            return False

