from django.core.cache import caches

from utils.log import get_simple_debug_logger

logger = get_simple_debug_logger(__name__)


def cached_fn(key, timeout_seconds=60 * 5, cache_type="default"):
    cache = caches[cache_type]

    def decorator(original_fn):
        def resulting_fn(*args, **kwargs):
            cache_key = key(*args, **kwargs) if callable(key) else key

            cached_results = cache.get(cache_key)
            if cached_results is not None:
                return cached_results

            try:
                results = original_fn(*args, **kwargs)
                cache.set(cache_key, results, timeout_seconds)

                return results
            except:  # noqa: E722
                pass

        return resulting_fn

    return decorator


def async_cached_fn(key, timeout_seconds=60 * 5, cache_type="default"):
    cache = caches[cache_type]

    def decorator(original_fn):
        async def resulting_fn(*args, **kwargs):
            cache_key = key(*args, **kwargs) if callable(key) else key

            cached_results = await cache.aget(cache_key)
            if cached_results is not None:
                return cached_results

            try:
                results = await original_fn(*args, **kwargs)
                await cache.aset(cache_key, results, timeout_seconds)

                return results
            except:  # noqa: E722
                pass

        return resulting_fn

    return decorator


def id_key(x):
    return x.id


def cache_resolve_many(
    keys, resolve, bucket, get_key=id_key, cache_type="default", timeout_seconds=None
):
    def key_to_cache_key(x):
        return (bucket, x)

    def key_from_cache_key(x):
        return x[1]

    cache = caches[cache_type]

    hits = cache.get_many([key_to_cache_key(key) for key in keys])

    misses = [key for key in keys if (key_to_cache_key(key)) not in hits]
    resolved_items = {
        key_to_cache_key(get_key(value)): value for value in resolve(misses)
    }

    cache.set_many(resolved_items, timeout=timeout_seconds)

    results = hits.copy()
    results.update(resolved_items)

    return {key_from_cache_key(key): value for (key, value) in results.items()}


def cache_resolve(key, resolve, bucket, cache_type="default", timeout_seconds=None):
    logger.debug("lookup", [bucket, key])

    cache = caches[cache_type]

    hit = cache.get(bucket + "." + key)
    if hit is not None:
        return hit

    hit = resolve()
    cache.set(bucket + "." + key, hit, timeout=timeout_seconds)

    return hit
