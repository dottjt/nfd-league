// import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import typeDefs from './typeDefs';

const defaults = {
};

const preloadedState = window.__APOLLO_STATE__;

delete window.__APOLLO_STATE__;

const cache = new InMemoryCache().restore(preloadedState);

const stateLink = withClientState({
  cache,
  defaults,
  resolvers: {
    Query: {},
    Mutation: {},
  },
  typeDefs,
});

console.log(window.location.hostname)

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    new HttpLink({ uri: window.location.hostname === 'localhost' ? 'https://staging.neverfapdeluxe.com/graphql' : 'https://staging.neverfapdeluxe.com/graphql' }) // http://localhost:2001/graphql
    // new HttpLink({ uri: 'http://localhost:2001/graphql' }) // 
  ]),
  fetchOptions: {
    mode: 'no-cors',
  },
});

window.snapSaveState = () => ({
  __APOLLO_STATE__: client.extract(),
});



// const client = new ApolloClient({ uri: 'http://localhost:2001/graphql' });

export default client;
