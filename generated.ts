import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  __typename?: 'Query';
  recipe: Recipe;
};


export type QueryRecipeArgs = {
  id: Scalars['Int']['input'];
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['Int']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type GetRecipeQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetRecipeQuery = { __typename?: 'Query', recipe: { __typename?: 'Recipe', id: number, title: string, imageUrl?: string | null } };


export const GetRecipeDocument = gql`
    query getRecipe($id: Int!) {
  recipe(id: $id) {
    id
    title
    imageUrl
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getRecipe(variables: GetRecipeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetRecipeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRecipeQuery>(GetRecipeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRecipe', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;