from django.core.cache import caches
from threading import Timer

# Just caching everything in a hashmap because serialization overhead of django-cache
# is too high for how we're using it
def cached_fn(key, timeout_seconds = 60 * 5, cache_type = 'default'):
    cache = {}

    def decorator(original_fn):
        def resulting_fn(*args, **kwargs):
            cache_key = key(*args, **kwargs) if callable(key) else key

            cached_results = cache.get(cache_key)
            if cached_results is not None:
                return cached_results

            try:
                results = original_fn()
                cache[cache_key] = results

                Timer(timeout_seconds, lambda: cache.pop(key)).start()

                return results
            except:
                pass

        return resulting_fn
    return decorator

def id_key(x):
    return x.id

def cache_resolve_many(keys, resolve, bucket, get_key=id_key, cache_type='default', timeout_seconds=None):
    def key_to_cache_key(x):
        return (bucket, x)

    def key_from_cache_key(x):
        return x[1]

    cache = caches[cache_type]

    hits = cache.get_many([key_to_cache_key(key) for key in keys])

    misses = [key for key in keys if (key_to_cache_key(key)) not in hits]
    resolved_items = { key_to_cache_key(get_key(value)): value for value in resolve(misses) }

    cache.set_many(resolved_items, timeout=timeout_seconds)
    
    results = hits.copy()
    results.update(resolved_items)

    return {
        key_from_cache_key(key): value
        for (key, value)
        in results.items()
    }

def cache_resolve(key, resolve, bucket, cache_type='default', timeout_seconds=None):
    
    cache = caches[cache_type]

    hit = cache.get(bucket + '.' + key)
    if hit is not None:
        return hit

    hit = resolve()
    cache.set(bucket + '.' + key, hit, timeout=timeout_seconds)

    return hit

