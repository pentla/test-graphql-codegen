import { GraphQLClient, RequestOptions } from "graphql-request";
import { getSdk } from "./generated";

type GraphQLHeaders = RequestOptions["requestHeaders"];

const sdk = getSdk(new GraphQLClient("https://api.github.com/graphql", {}));
sdk.feed({}, {}).then((data) => {
  console.log(data);
});
