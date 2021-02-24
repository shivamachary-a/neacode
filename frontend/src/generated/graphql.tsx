import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type Query = {
  __typename?: 'Query';
  Me?: Maybe<Users>;
  allUsers: Array<Users>;
  all: Array<Stocks>;
  readPortfolio: Array<Scalars['String']>;
  readWatchlist: Array<Scalars['String']>;
  overview: Array<SecurityOverview>;
  newsQuery: Scalars['JSONObject'];
  getPrice: Scalars['JSONObject'];
  sectorPerformance: Scalars['JSONObject'];
  topPerformers: Scalars['JSONObject'];
  topLosers: Scalars['JSONObject'];
  getMonzoRedirect: Scalars['String'];
  monzoComplete: Scalars['JSONObject'];
  monzoRefreshToken: Scalars['Boolean'];
  getMonzoAccounts: Scalars['JSONObject'];
  monzoMe: Scalars['JSONObject'];
  authenticateMonzo: UserResponse;
  getAlpacaRedirect: Scalars['String'];
  authenticateAlpaca: UserResponse;
};


export type QueryOverviewArgs = {
  ticker: Scalars['String'];
};


export type QueryGetPriceArgs = {
  ticker: Scalars['String'];
};


export type QueryAuthenticateMonzoArgs = {
  state: Scalars['String'];
  code: Scalars['String'];
};


export type QueryAuthenticateAlpacaArgs = {
  state: Scalars['String'];
  code: Scalars['String'];
};

export type Users = {
  __typename?: 'Users';
  _id: Scalars['String'];
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  isMonzo: Scalars['Boolean'];
  isAlpaca: Scalars['Boolean'];
};

export type Stocks = {
  __typename?: 'Stocks';
  _id: Scalars['String'];
  id: Scalars['String'];
  companyName: Scalars['String'];
  symbol: Scalars['String'];
};

export type SecurityOverview = {
  __typename?: 'securityOverview';
  _id: Scalars['String'];
  id: Scalars['String'];
  symbol: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  exchange: Scalars['String'];
  industry: Scalars['String'];
  sector: Scalars['String'];
};


export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<Array<FieldError>>;
  user?: Maybe<Users>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  logout: Scalars['Boolean'];
  login: UserResponse;
  addToPortfolio: StockResponse;
  addToWatchlist: Scalars['Boolean'];
  removeFromWatchlist: Scalars['Boolean'];
  removeFromPortfolio: Scalars['Boolean'];
  searchEquities: SearchResponse;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationAddToPortfolioArgs = {
  ticker: Scalars['String'];
};


export type MutationAddToWatchlistArgs = {
  ticker: Scalars['String'];
};


export type MutationRemoveFromWatchlistArgs = {
  ticker: Scalars['String'];
};


export type MutationRemoveFromPortfolioArgs = {
  ticker: Scalars['String'];
};


export type MutationSearchEquitiesArgs = {
  symbol: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type StockResponse = {
  __typename?: 'StockResponse';
  error?: Maybe<Array<FieldError>>;
  stock?: Maybe<Stocks>;
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  error?: Maybe<Array<FieldError>>;
  results?: Maybe<Array<Scalars['JSONObject']>>;
};

export type AuthenticateAlpacaQueryVariables = Exact<{
  code: Scalars['String'];
  state: Scalars['String'];
}>;


export type AuthenticateAlpacaQuery = (
  { __typename?: 'Query' }
  & { authenticateAlpaca: (
    { __typename?: 'UserResponse' }
    & { error?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, 'isAlpaca'>
    )> }
  ) }
);

export type AuthenticateMonzoQueryVariables = Exact<{
  code: Scalars['String'];
  state: Scalars['String'];
}>;


export type AuthenticateMonzoQuery = (
  { __typename?: 'Query' }
  & { authenticateMonzo: (
    { __typename?: 'UserResponse' }
    & { error?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, 'username' | 'id'>
    )> }
  ) }
);


export const AuthenticateAlpacaDocument = gql`
    query authenticateAlpaca($code: String!, $state: String!) {
  authenticateAlpaca(code: $code, state: $state) {
    error {
      field
      message
    }
    user {
      isAlpaca
    }
  }
}
    `;

export function useAuthenticateAlpacaQuery(options: Omit<Urql.UseQueryArgs<AuthenticateAlpacaQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AuthenticateAlpacaQuery>({ query: AuthenticateAlpacaDocument, ...options });
};
export const AuthenticateMonzoDocument = gql`
    query authenticateMonzo($code: String!, $state: String!) {
  authenticateMonzo(code: $code, state: $state) {
    error {
      field
      message
    }
    user {
      username
      id
    }
  }
}
    `;

export function useAuthenticateMonzoQuery(options: Omit<Urql.UseQueryArgs<AuthenticateMonzoQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AuthenticateMonzoQuery>({ query: AuthenticateMonzoDocument, ...options });
};