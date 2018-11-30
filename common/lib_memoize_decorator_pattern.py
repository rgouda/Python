"""SVN Info: $Id: lib_memoize_decorator_pattern.py 3196 2013-12-10 18:48:29Z rgouda $"""

import collections
import functools


class Memoize(object):
    """Decorator. Caches a function's return value each time it is called.
    If called later with the same arguments, the cached value is returned
    (not reevaluated).
    PS: This code is copied from Python Wiki page.
    """

    def __init__(self, func):
        self.func = func
        self.cache = {}

    def __call__(self, *args):
        if not isinstance(args, collections.Hashable):
            # uncacheable. a list, for instance.
            # better to not cache than blow up.
            return self.func(*args)
        if args in self.cache:
            return self.cache[args]
        else:
            value = self.func(*args)
            self.cache[args] = value
            return value

    def __repr__(self):
        """Return the function's docstring."""
        return self.func.__doc__

    def __get__(self, obj, objtype):
        """Support instance methods."""
        return functools.partial(self.__call__, obj)


def memoized(obj):
    cache = obj.cache = {}

    @functools.wraps(obj)
    def memoizer(*args, **kwargs):
        key = str(args) + str(kwargs)
        if key not in cache:
            cache[key] = obj(*args, **kwargs)
        return cache[key]

    return memoizer


if __name__ == "__main__":
    @Memoize
    class MyFib:
        value = 0

        def __init__(self, n):
            self.value = self.fib(n)

        def fib(self, n):
            import time

            if n in (0, 1):
                return n

            i, j, k = 0, 1, 1
            while k < n:
                k = i + j
                i = j
                j = k

            time.sleep(5)
            return k

        @Memoize
        def fib2(self, n):
            import time

            if n in (0, 1):
                return n

            i, j, k = 0, 1, 1
            while k < n:
                k = i + j
                i = j
                j = k

            time.sleep(5)
            return k


    import datetime

    def get_current_timestamp(time_format=None):
        """Returns current time string value in the requested or default format.
           The default format is - '2012-07-13 21:00:00' """
        if time_format is None:
            time_format = '%Y-%m-%d %H:%M:%S'
        return datetime.datetime.today().strftime(time_format)

    print(get_current_timestamp())
    print("-------------------------------")
    print("Demonstration of class caching")
    print("-------------------------------")
    x = 100000000
    x2 = 100
    print(get_current_timestamp())
    f = MyFib(x)
    print("MyFib(x).value=", f.value)
    print(get_current_timestamp())
    print("")

    print("Returns cached results")
    print(get_current_timestamp())
    f = MyFib(x)
    print("MyFib(x).value=", f.value)
    print(get_current_timestamp())

    print("----------------------------------------------")
    print("Demonstration of method caching within class")
    print("----------------------------------------------")
    print(get_current_timestamp())
    f = MyFib(x)
    print("MyFib(x).value=", f.value)
    print("f.fib2(x)=", f.fib2(x))
    print(get_current_timestamp())
    print("")

    print("Returns cached results")
    print(get_current_timestamp())
    f = MyFib(x)
    print("MyFib(x).value=", f.value)
    print("f.fib2(x)=", f.fib2(x))
    print(get_current_timestamp())

    print("------------------------------------------------")
    print("Demonstration of method no caching within class")
    print("------------------------------------------------")
    print(get_current_timestamp())
    f = MyFib(x)
    print("MyFib(x).value=", f.value)
    f.fib(x)
    print("f.fib(x)=", f.value)
    print(get_current_timestamp())
    print("")

    print("Returns non-cached results")  # because method fib() is not moemoized.
    print(get_current_timestamp())
    f = MyFib(x)
    print("MyFib(x).value=", f.value)
    f.fib(x)
    print("f.fib(x)=", f.value)
    print(get_current_timestamp())

    print('---------------------------------------------------------------')
    print('Demonstration of variable that persists between function calls')
    print('---------------------------------------------------------------')


    @Memoize
    def cache_my_list():
        import time
        time.sleep(5)
        return []


    global_list = cache_my_list()
    global_list.append(1)  # We add an element here which updates cached variable.
    print(get_current_timestamp())
    print('global_list=', global_list)
    print(get_current_timestamp())
    print('cache_my_list', cache_my_list())  # The cached variable returns the same as global_list
    print(get_current_timestamp())
