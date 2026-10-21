## Video

default username: admin
default password: pass

for mongo express.

There are three databases:

# admin 
has the administrator information:
- authentication roles
- other security related data

# config
stored the sharded clusters.
Sharding is a way where MongoDB distributes data across multiple machines.

# local
used for replication and stores data which is specific to our local MongoDB instance.

## Express

Is the tool for building web service for node.js.
It helps us to handle requests (ex. if someone visits our website) and send back the correct responses.

## Mongoose

This makes it easier to work with MongoDB database in Node.js.

## MongoDB

This is a type of database that stores data in a flexible way (like a scarpbook).
It will help read, update and delete data in that  without needing to write all the complex code by ourselves.

Mongoose will help our Node.js app talk to our MongoDB database and express helps us to handle these web requests.
