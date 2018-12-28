
class Gandalf:
    potion = list()
    _power = None

    def __init__(self, potion):
        self.potion = potion

    @property
    def min_power(self):
        if self._power is None:
            self._power = self.compute_min_power()
        return self._power

    @min_power.setter
    def min_power(self, x):
        self._power = x

    def compute_min_power(self):
        running_sum = 0
        self.min_power = 0
        for p in self.potion:
            running_sum += p
            if running_sum < 0 and abs(running_sum) >= self.min_power:
                self.min_power = abs(running_sum) + 1

        return self.min_power

    # Amit's implementation
    def compute_min_power2(self):
        running_sum = 0
        min_power = []
        for p in self.potion:
            running_sum += p
            min_power.append(abs(running_sum) + 1 if running_sum < 0 else 0)

        print(min_power)
        return max(min_power)

    def print_gandalf_lifeline(self):
        current_power = self.min_power
        print(f'Initial power - {current_power}')
        for p in self.potion:
            print(f'{current_power} {p}')
            current_power = current_power + p

