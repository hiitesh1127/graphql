const { gql } = require('apollo-server');
export const typeDef = gql`
  type User {
    _id: String
    name: String
    username: String
    email: String
    password: String
    friends: [String]
    intro: String
    avatar: String
    createdAt: String
    updatedAt: String
  }
  type Response {
    id: String
    username: String
    accessToken: String
  }
  input Register { 
    username: String! 
    email: String! 
    password: String!
  }
  type Mutation {
    register(input: Register) : Response!
    login(email: String!, password: String!) : Response!
  }
`;