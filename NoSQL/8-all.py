#!/usr/bin/env python3
"""Module that lists all documents in a MongoDB collection."""


def list_all(mongo_collection):
    """
    Return a list of all documents in the given MongoDB collection.

    Args:
        mongo_collection: pymongo collection object.

    Returns:
        A list of documents. Returns an empty list if no documents exist.
    """
    documents = mongo_collection.find()
    return list(documents)
