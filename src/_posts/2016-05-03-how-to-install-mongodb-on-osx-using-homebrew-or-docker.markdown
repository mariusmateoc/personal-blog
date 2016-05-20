---
layout: post
title: "How to install MongoDB on OSX using Homebrew or Docker"
date: "2016-05-03 17:31:08 +0300"
category: Coding
tags: mongodb homebrew docker osx
comments: true
---

In the first part we will see how to install MongoDB using Homebrew and how to setup our database directory so we can have right access, then in the second part you can see how to start a mongodb container with docker and how to run mongo commands in that container.

Make sure you have [Homebrew](http://brew.sh/) and [Docker](https://www.docker.com/) installed before following this tutorial.

## Install MongoDB using Homebrew

```bash
brew install monogdb
```

If you require TLS/SSL support, add `--with-openssl` flag to install command

### Configure MongoDB Data directory

By default, the `mongod` process uses the `/data/db` directory. Create this folder manually and then ensure that user account running `mongod` has correct permissions for the directory:

```bash
sudo mkdir -p /data/db

# Set permissions for the data directory
sudo chmod 0755 /data/db
sudo chown $USER /data/db
```

Now we can start `mongod` process and in other terminal window run `mongo` to start mongo shell. Now in mongo shell we can run mongo commands that will use our previously created `/data/db` directory.

### Specify other directory for data

You can set a `data` directory in your project and use that folder in `mongod` process.

```bash
cd path/to/your/project

# Create data folder in your project
mkdir -p data/db

# From your project folder run
mongod --dbpath data/db/
```

In other terminal window now you can start `mongo` process and use the `data/db/` folder from your project.

## Use a docker container for mongodb

Note! I use [docker beta](https://beta.docker.com/docs/) for this but should work with a normal [docker installation](https://docs.docker.com/engine/installation/mac/) too.

```bash
mkdir -p path/to/project/data/db

docker run --name mongodb -v $(pwd)/data/db:/data/db -d mongo
```

Now our `mongod` is running in mongodb container. Check to see logs with:

```bash
# docker logs -f <container-name> ## Use Ctrl + C to close it
docker logs -f mongodb
```

We need to connect to our mongodb container to run some mongo commands:

```bash
# Start a new bash process in running container
docker exec -it mongodb bash

# Create a new container to run commands
# Env variables refer to running db container name capitalized
# $<running-mongodb-container-name>_PORT_27017_TCP_ADDR:
# $<running-mongodb-container-name>_PORT_27017_TCP_PORT"
docker run -it --link mongodb:mongodb --rm mongo sh -c 'exec mongo "$MONGODB_PORT_27017_TCP_ADDR:$MONGODB_PORT_27017_TCP_PORT"'
```

Now we can run:

```bash
# Start the mongo process
mongo

# Insert some data for test pourpose
db.newCollection.insert({ name: "Marius", job: "developer"});
db.newCollection.find().pretty();
```

You should see the inserted object after `db.newCollection.find().pretty()` command. Now your mongodb database is up and ready.
