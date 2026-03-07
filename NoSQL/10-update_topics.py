#!/usr/bin/env python3
"""Module that updates topics of a school document in MongoDB."""


def update_topics(mongo_collection, name, topics):
    """
    Update all topics of the school document based on the name.

    Args:
        mongo_collection: pymongo collection object.
        name (str): name of the school to update.
        topics (list): list of topics for the school.

    Returns:
        None
    """
    mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
