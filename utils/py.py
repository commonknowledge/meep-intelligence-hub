import pprint

from benedict import benedict


def get(d, path, default=None):
    if isinstance(d, benedict):
        val = d[path]
    else:
        val = benedict(d)[path]
    return val if val is not None else default


def is_sequence(arg):
    if isinstance(arg, str):
        return False
    return (
        not hasattr(arg, "strip")
        and hasattr(arg, "__getitem__")
        or hasattr(arg, "__iter__")
    )


def ensure_list(possible):
    if is_sequence(possible):
        return possible
    elif possible:
        return [possible]
    else:
        return []


def get_path(d, *keys):
    for k in keys:
        d = get(d, k)
    return d


def chunk_array(arr, max_size):
    for i in range(0, len(arr), max_size):
        yield arr[i : i + max_size]


def batch_and_aggregate(arr_limit):
    def decorator(original_fn):
        async def resulting_fn(arr):
            batches = chunk_array(arr, arr_limit)
            results = []
            for batch in batches:
                results += await original_fn(batch)
            return results

        return resulting_fn

    return decorator


def trace(fn):
    def wrapped_fn(*args, **kwargs):
        try:
            res = fn(*args, **kwargs)
            # print(fn.__name__, args, kwargs)
            # print('->', res)

            return res
        except Exception as err:
            print(fn.__name__, args, kwargs)
            print("THROWS", err)

            raise err

    return wrapped_fn


pp = pprint.PrettyPrinter(indent=4)
pr = pp.pprint
