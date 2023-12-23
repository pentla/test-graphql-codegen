export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
import { GraphQLClient, RequestOptions } from 'graphql-request';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  /** A feed of repository submissions */
  feed?: Maybe<Array<Maybe<Entry>>>;
  /** A single entry */
  entry?: Maybe<Entry>;
  /** Return the currently logged in user, or null if nobody is logged in */
  currentUser?: Maybe<User>;
};


export type QueryFeedArgs = {
  type: FeedType;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryEntryArgs = {
  repoFullName: Scalars['String'];
};

/** A list of options for the sort order of the feed */
export enum FeedType {
  /** Sort by a combination of freshness and score, using Reddit's algorithm */
  Hot = 'HOT',
  /** Newest entries first */
  New = 'NEW',
  /** Highest score entries first */
  Top = 'TOP'
}

/** Information about a GitHub repository submitted to GitHunt */
export type Entry = {
  __typename?: 'Entry';
  /** Information about the repository from GitHub */
  repository: Repository;
  /** The GitHub user who submitted this entry */
  postedBy: User;
  /** A timestamp of when the entry was submitted */
  createdAt: Scalars['Float'];
  /** The score of this repository, upvotes - downvotes */
  score: Scalars['Int'];
  /** The hot score of this repository */
  hotScore: Scalars['Float'];
  /** Comments posted about this repository */
  comments: Array<Maybe<Comment>>;
  /** The number of comments posted about this repository */
  commentCount: Scalars['Int'];
  /** The SQL ID of this entry */
  id: Scalars['Int'];
  /** XXX to be changed */
  vote: Vote;
};


/** Information about a GitHub repository submitted to GitHunt */
export type EntryCommentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/**
 * A repository object from the GitHub API. This uses the exact field names returned by the
 * GitHub API for simplicity, even though the convention for GraphQL is usually to camel case.
 */
export type Repository = {
  __typename?: 'Repository';
  /** Just the name of the repository, e.g. GitHunt-API */
  name: Scalars['String'];
  /** The full name of the repository with the username, e.g. apollostack/GitHunt-API */
  full_name: Scalars['String'];
  /** The description of the repository */
  description?: Maybe<Scalars['String']>;
  /** The link to the repository on GitHub */
  html_url: Scalars['String'];
  /** The number of people who have starred this repository on GitHub */
  stargazers_count: Scalars['Int'];
  /** The number of open issues on this repository on GitHub */
  open_issues_count?: Maybe<Scalars['Int']>;
  /** The owner of this repository on GitHub, e.g. apollostack */
  owner?: Maybe<User>;
};

/** A user object from the GitHub API. This uses the exact field names returned from the GitHub API. */
export type User = {
  __typename?: 'User';
  /** The name of the user, e.g. apollostack */
  login: Scalars['String'];
  /** The URL to a directly embeddable image for this user's avatar */
  avatar_url: Scalars['String'];
  /** The URL of this user's GitHub page */
  html_url: Scalars['String'];
};

/** A comment about an entry, submitted by a user */
export type Comment = {
  __typename?: 'Comment';
  /** The SQL ID of this entry */
  id: Scalars['Int'];
  /** The GitHub user who posted the comment */
  postedBy: User;
  /** A timestamp of when the comment was posted */
  createdAt: Scalars['Float'];
  /** The text of the comment */
  content: Scalars['String'];
  /** The repository which this comment is about */
  repoName: Scalars['String'];
};

/** XXX to be removed */
export type Vote = {
  __typename?: 'Vote';
  vote_value: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Submit a new repository, returns the new submission */
  submitRepository?: Maybe<Entry>;
  /** Vote on a repository submission, returns the submission that was voted on */
  vote?: Maybe<Entry>;
  /** Comment on a repository, returns the new comment */
  submitComment?: Maybe<Comment>;
};


export type MutationSubmitRepositoryArgs = {
  repoFullName: Scalars['String'];
};


export type MutationVoteArgs = {
  repoFullName: Scalars['String'];
  type: VoteType;
};


export type MutationSubmitCommentArgs = {
  repoFullName: Scalars['String'];
  commentContent: Scalars['String'];
};

/** The type of vote to record, when submitting a vote */
export enum VoteType {
  Up = 'UP',
  Down = 'DOWN',
  Cancel = 'CANCEL'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Subscription fires on every comment added */
  commentAdded?: Maybe<Comment>;
};


export type SubscriptionCommentAddedArgs = {
  repoFullName: Scalars['String'];
};
export type FeedQueryVariables = Exact<{ [key: string]: never; }>;


export type FeedQuery = { __typename?: 'Query', feed?: Array<{ __typename?: 'Entry', id: number, commentCount: number, repository: { __typename?: 'Repository', owner?: { __typename?: 'User', avatar_url: string } | null } } | null> | null };

export type Feed2QueryVariables = Exact<{
  v: Scalars['String'];
}>;


export type Feed2Query = { __typename?: 'Query', feed?: Array<{ __typename?: 'Entry', id: number } | null> | null };

export type Feed3QueryVariables = Exact<{
  v?: InputMaybe<Scalars['String']>;
}>;


export type Feed3Query = { __typename?: 'Query', feed?: Array<{ __typename?: 'Entry', id: number } | null> | null };

export type Feed4QueryVariables = Exact<{
  v?: Scalars['String'];
}>;


export type Feed4Query = { __typename?: 'Query', feed?: Array<{ __typename?: 'Entry', id: number } | null> | null };

export const FeedDocument = `
          query feed {
        feed {
          id
          commentCount
          repository {
            owner {
              avatar_url
            }
          }
        }
      }
          `;
export const Feed2Document = `
          query feed2($v: String!) {
        feed {
          id
        }
      }
          `;
export const Feed3Document = `
          query feed3($v: String) {
        feed {
          id
        }
      }
          `;
export const Feed4Document = `
          query feed4($v: String! = "TEST") {
        feed {
          id
        }
      }
          `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    feed(variables?: FeedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FeedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FeedQuery>(FeedDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'feed', 'query', variables);
    },
    feed2(variables: Feed2QueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Feed2Query> {
      return withWrapper((wrappedRequestHeaders) => client.request<Feed2Query>(Feed2Document, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'feed2', 'query', variables);
    },
    feed3(variables?: Feed3QueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Feed3Query> {
      return withWrapper((wrappedRequestHeaders) => client.request<Feed3Query>(Feed3Document, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'feed3', 'query', variables);
    },
    feed4(variables?: Feed4QueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<Feed4Query> {
      return withWrapper((wrappedRequestHeaders) => client.request<Feed4Query>(Feed4Document, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'feed4', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;