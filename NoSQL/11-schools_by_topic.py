#!/usr/bin/env python3
"""Module that returns schools matching a specific topic."""


def schools_by_topic(mongo_collection, topic):
    """
    Return the list of schools having a specific topic.

    Args:
        mongo_collection: pymongo collection object.
        topic (str): topic to search for.

    Returns:
        A list of schools matching the topic.
    """
    schools = mongo_collection.find({"topics": topic})
    return list(schools)
