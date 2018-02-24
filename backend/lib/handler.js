import { graphqlLambda, graphiqlLambda } from "apollo-server-lambda";
import { makeExecutableSchema } from "graphql-tools";

// Types
import entryType from "./data/types/entry";

// Resolvers
import resolvers from "./data/resolvers";

let schema;
try {
  schema = makeExecutableSchema({
    typeDefs: [entryType],
    resolvers
  });
} catch (e) {
  console.error(e);
}

exports.graphql = (event, context, callback) => {
  const callbackFilter = (error, output) => {
    const outputWithHeader = Object.assign({}, output, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    });
    callback(error, outputWithHeader);
  };

  let userId = context.identity.cognitoIdentityId;

  if (!context.identity.cognitoIdentityId) {
    // FIXME throw in production
    // throw new Error("No identity found");
    userId = "dev-user";
  }

  graphqlLambda({
    schema,
    context: { userId },
    logger: {
      log: e => console.log("GraphQL logger: ", e)
    },
    allowUndefinedInResolve: false
  })(event, context, callbackFilter);
};

exports.graphiql = graphiqlLambda({
  endpointURL: "/graphql"
});
