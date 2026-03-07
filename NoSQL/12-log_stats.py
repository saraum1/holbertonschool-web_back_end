#!/usr/bin/env python3
"""Provide statistics about Nginx logs stored in MongoDB."""

from pymongo import MongoClient


if __name__ == "__main__":
    client = MongoClient("mongodb://127.0.0.1:27017")
    collection = client.logs.nginx

    # total logs
    print("{} logs".format(collection.count_documents({})))

    # methods
    print("Methods:")
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]

    for method in methods:
        print("\tmethod {}: {}".format(
            method, collection.count_documents({"method": method})
        ))

    # status check
    print("{} status check".format(collection.count_documents(
        {"method": "GET", "path": "/status"}
    )))
