import {makeExecutableSchema} from '@graphql-tools/schema'
import { merge } from 'lodash';
import { typeDef as Author } from './typeDefs/user';
import { typeDef as Book} from './typeDefs/book';
import { resolvers as userResolvers } from './resolvers/user'
import { resolvers as bookResolvers } from './resolvers/book'

const schema = makeExecutableSchema({
    typeDefs: [Author, Book],
    resolvers: merge(userResolvers, bookResolvers),
  });

export default schema;