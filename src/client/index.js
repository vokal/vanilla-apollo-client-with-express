import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';

const networkInterface = createNetworkInterface('/graphql');

const client = new ApolloClient({
  networkInterface
});

const find = gql`{
  user(firstName: "bob") {
    id
    firstName
    lastName
  }
}`;

const add = gql`mutation {
  addUser(firstName: "bob", lastName: "loblaw") {
    id
    firstName
    lastName
  }
}`;

client.query({ query: find })
.then((res) => { console.log(res); return client.mutate({ mutation: add }); })
.then((res) => { console.log(res); return client.query({ query: find, forceFetch: true }); })
.then((res) => { console.log(res); return client.mutate({ mutation: add }); })
.then((res) => { console.log(res); return client.query({ query: find, forceFetch: true }); })
.then((res) => { console.log(res); });
