import { graphqlLambda } from "apollo-server-lambda";
import { makeExecutableSchema } from "graphql-tools";

// Types
import entryType from "./data/types/entry";

// Resolvers
import entryResolver from "./data/resolvers/entry";

const schema = makeExecutableSchema({
  typeDefs: [entryType],
  resolvers: entryResolver
});

exports.graphql = (event, context, callback) => {
  const callbackFilter = (error, output) => {
    const outputWithHeader = Object.assign({}, output, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
    callback(error, outputWithHeader);
  };

  graphqlLambda({ schema })(event, context, callbackFilter);
};
