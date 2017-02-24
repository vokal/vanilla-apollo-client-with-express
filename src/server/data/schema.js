import { makeExecutableSchema } from 'graphql-tools';

const rootSchema = [`
type User {
  id: Int!
  firstName: String
  lastName: String
}

type Query {
  user(id: Int, firstName: String, lastName: String): [User]
}

type Mutation {
  addUser (
    firstName: String!
    lastName: String!
  ): User
}

schema {
  query: Query
  mutation: Mutation
}
`];

const users = [];

const rootResolvers = {
  Query: {
    user(root, { id, firstName, lastName }, context) {
      return users.filter(u =>
        id !== undefined && u.id === id
        || firstName !== undefined && u.firstName === firstName
        || lastName !== undefined && u.lastName === lastName );
    }
  },
  Mutation: {
    addUser(root, { firstName, lastName }, context) {
      const user = {
        id: users.length,
        firstName,
        lastName
      };
      users.push(user);
      return user;
    },
  }
};

const schema = [...rootSchema];
const resolvers = rootResolvers;

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});

export default executableSchema;
