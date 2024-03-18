from django.db import connection
from django.db.models.query import QuerySet

import psycopg


async def async_queryset(queryset: QuerySet, args: list[str] = []):
    query = str(queryset.query)
    for arg in args:
        query = query.replace(str(arg), "%s")
    args = [str(arg) for arg in args]
    results = await async_query(query, args)
    return [queryset.model(*result) for result in results]


async def async_query(query: str, args: list[str] = []):
    # Find and quote a database table name for a Model with users.
    # table_name = connection.ops.quote_name(GenericData._meta.db_table)
    # Create a new async connection.
    aconnection = await psycopg.AsyncConnection.connect(
        **{
            **connection.get_connection_params(),
            "cursor_factory": psycopg.AsyncCursor,
        },
    )
    async with aconnection:
        # Create a new async cursor and execute a query.
        async with aconnection.cursor() as cursor:
            await cursor.execute(query, args)
            results = await cursor.fetchall()
            return results
