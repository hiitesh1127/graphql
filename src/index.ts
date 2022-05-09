import { PubSub } from 'graphql-subscriptions';
const { ApolloServer } = require('apollo-server');
import { connect } from "mongoose";
import { config } from "dotenv";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
config();



  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
import schema from './graphql/schema'
  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
//ts-ignore
const pubsub = new PubSub();
const server = new ApolloServer({schema, context : (ctx : any) => ctx, pubsub});

// The `listen` method launches a web server.

connect(process.env.MONGO_URL as string)
  .then(() => {
    server.listen().then(({ url } : any) => {
      console.log("connected to DB..")
    console.log(`🚀  Server ready at ${url}`);
  });
  })
  .catch((err: any) => console.log(err.message));
