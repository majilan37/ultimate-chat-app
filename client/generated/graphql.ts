import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['String'];
  messages: Array<Maybe<Message>>;
  users: Array<Scalars['String']>;
  users_details: Array<Maybe<User>>;
};

export type CreateChatInput = {
  users: Array<Scalars['String']>;
};

export type CreateMessageInput = {
  chat: Scalars['String'];
  content: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type GetChatInput = {
  _id: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['String'];
  chat: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type MessagesByChat = {
  chat: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: Chat;
  createMessage: Message;
  login: User;
  register: User;
  resetIsOnline: User;
};


export type MutationCreateChatArgs = {
  input: CreateChatInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationLoginArgs = {
  data: LoginUserInput;
};


export type MutationRegisterArgs = {
  data: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getChat: Chat;
  getChats: Array<Chat>;
  getMessages: Array<Message>;
  getUsers: Array<User>;
};


export type QueryGetChatArgs = {
  input: GetChatInput;
};


export type QueryGetMessagesArgs = {
  input: MessagesByChat;
};

export type Subscription = {
  __typename?: 'Subscription';
  newChat: Chat;
  newMessage: Message;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  isOnline: Scalars['Boolean'];
  username: Scalars['String'];
};

export type AddChatMutationVariables = Exact<{
  users: Array<Scalars['String']> | Scalars['String'];
}>;


export type AddChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'Chat', _id: string, users: Array<string> } };

export type AddMessageMutationVariables = Exact<{
  chat: Scalars['String'];
  content: Scalars['String'];
}>;


export type AddMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', _id: string, content: string, createdAt: any, user: { __typename?: 'User', _id: string, username: string, isOnline: boolean } } };

export type ChatSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ChatSubscription = { __typename?: 'Subscription', newChat: { __typename?: 'Chat', _id: string, users: Array<string> } };

export type GetChatQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetChatQuery = { __typename?: 'Query', getChat: { __typename?: 'Chat', _id: string, users: Array<string>, messages: Array<{ __typename?: 'Message', _id: string, content: string, user: { __typename?: 'User', _id: string, email: string, username: string } } | null> } };

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { __typename?: 'Query', getChats: Array<{ __typename?: 'Chat', _id: string, users: Array<string> }> };

export type MessagesQueryVariables = Exact<{
  chat: Scalars['String'];
}>;


export type MessagesQuery = { __typename?: 'Query', getMessages: Array<{ __typename?: 'Message', _id: string, content: string, createdAt: any, user: { __typename?: 'User', _id: string, username: string, isOnline: boolean } }> };

export type MessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', _id: string, content: string, createdAt: any, user: { __typename?: 'User', _id: string, username: string, isOnline: boolean } } };

export type RegisterUserMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'User', _id: string } };

export type ChatKeySpecifier = ('_id' | 'messages' | 'users' | 'users_details' | ChatKeySpecifier)[];
export type ChatFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	messages?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>,
	users_details?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MessageKeySpecifier = ('_id' | 'chat' | 'content' | 'createdAt' | 'updatedAt' | 'user' | 'userId' | MessageKeySpecifier)[];
export type MessageFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	chat?: FieldPolicy<any> | FieldReadFunction<any>,
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createChat' | 'createMessage' | 'login' | 'register' | 'resetIsOnline' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createChat?: FieldPolicy<any> | FieldReadFunction<any>,
	createMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	register?: FieldPolicy<any> | FieldReadFunction<any>,
	resetIsOnline?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('getChat' | 'getChats' | 'getMessages' | 'getUsers' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	getChat?: FieldPolicy<any> | FieldReadFunction<any>,
	getChats?: FieldPolicy<any> | FieldReadFunction<any>,
	getMessages?: FieldPolicy<any> | FieldReadFunction<any>,
	getUsers?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('newChat' | 'newMessage' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	newChat?: FieldPolicy<any> | FieldReadFunction<any>,
	newMessage?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('_id' | 'email' | 'isOnline' | 'username' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	isOnline?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Chat?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChatKeySpecifier | (() => undefined | ChatKeySpecifier),
		fields?: ChatFieldPolicy,
	},
	Message?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MessageKeySpecifier | (() => undefined | MessageKeySpecifier),
		fields?: MessageFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;

export const AddChatDocument = gql`
    mutation addChat($users: [String!]!) {
  createChat(input: {users: $users}) {
    _id
    users
  }
}
    `;
export type AddChatMutationFn = Apollo.MutationFunction<AddChatMutation, AddChatMutationVariables>;

/**
 * __useAddChatMutation__
 *
 * To run a mutation, you first call `useAddChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addChatMutation, { data, loading, error }] = useAddChatMutation({
 *   variables: {
 *      users: // value for 'users'
 *   },
 * });
 */
export function useAddChatMutation(baseOptions?: Apollo.MutationHookOptions<AddChatMutation, AddChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddChatMutation, AddChatMutationVariables>(AddChatDocument, options);
      }
export type AddChatMutationHookResult = ReturnType<typeof useAddChatMutation>;
export type AddChatMutationResult = Apollo.MutationResult<AddChatMutation>;
export type AddChatMutationOptions = Apollo.BaseMutationOptions<AddChatMutation, AddChatMutationVariables>;
export const AddMessageDocument = gql`
    mutation addMessage($chat: String!, $content: String!) {
  createMessage(input: {content: $content, chat: $chat}) {
    _id
    user {
      _id
      username
      isOnline
    }
    content
    createdAt
  }
}
    `;
export type AddMessageMutationFn = Apollo.MutationFunction<AddMessageMutation, AddMessageMutationVariables>;

/**
 * __useAddMessageMutation__
 *
 * To run a mutation, you first call `useAddMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMessageMutation, { data, loading, error }] = useAddMessageMutation({
 *   variables: {
 *      chat: // value for 'chat'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useAddMessageMutation(baseOptions?: Apollo.MutationHookOptions<AddMessageMutation, AddMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMessageMutation, AddMessageMutationVariables>(AddMessageDocument, options);
      }
export type AddMessageMutationHookResult = ReturnType<typeof useAddMessageMutation>;
export type AddMessageMutationResult = Apollo.MutationResult<AddMessageMutation>;
export type AddMessageMutationOptions = Apollo.BaseMutationOptions<AddMessageMutation, AddMessageMutationVariables>;
export const ChatDocument = gql`
    subscription chat {
  newChat {
    _id
    users
  }
}
    `;

/**
 * __useChatSubscription__
 *
 * To run a query within a React component, call `useChatSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatSubscription({
 *   variables: {
 *   },
 * });
 */
export function useChatSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ChatSubscription, ChatSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChatSubscription, ChatSubscriptionVariables>(ChatDocument, options);
      }
export type ChatSubscriptionHookResult = ReturnType<typeof useChatSubscription>;
export type ChatSubscriptionResult = Apollo.SubscriptionResult<ChatSubscription>;
export const GetChatDocument = gql`
    query getChat($id: String!) {
  getChat(input: {_id: $id}) {
    _id
    users
    messages {
      _id
      content
      user {
        _id
        email
        username
      }
    }
  }
}
    `;

/**
 * __useGetChatQuery__
 *
 * To run a query within a React component, call `useGetChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetChatQuery(baseOptions: Apollo.QueryHookOptions<GetChatQuery, GetChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatQuery, GetChatQueryVariables>(GetChatDocument, options);
      }
export function useGetChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatQuery, GetChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatQuery, GetChatQueryVariables>(GetChatDocument, options);
        }
export type GetChatQueryHookResult = ReturnType<typeof useGetChatQuery>;
export type GetChatLazyQueryHookResult = ReturnType<typeof useGetChatLazyQuery>;
export type GetChatQueryResult = Apollo.QueryResult<GetChatQuery, GetChatQueryVariables>;
export const GetChatsDocument = gql`
    query getChats {
  getChats {
    _id
    users
  }
}
    `;

/**
 * __useGetChatsQuery__
 *
 * To run a query within a React component, call `useGetChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChatsQuery(baseOptions?: Apollo.QueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
      }
export function useGetChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatsQuery, GetChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatsQuery, GetChatsQueryVariables>(GetChatsDocument, options);
        }
export type GetChatsQueryHookResult = ReturnType<typeof useGetChatsQuery>;
export type GetChatsLazyQueryHookResult = ReturnType<typeof useGetChatsLazyQuery>;
export type GetChatsQueryResult = Apollo.QueryResult<GetChatsQuery, GetChatsQueryVariables>;
export const MessagesDocument = gql`
    query messages($chat: String!) {
  getMessages(input: {chat: $chat}) {
    _id
    user {
      _id
      username
      isOnline
    }
    content
    createdAt
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      chat: // value for 'chat'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const MessageDocument = gql`
    subscription message {
  newMessage {
    _id
    user {
      _id
      username
      isOnline
    }
    content
    createdAt
  }
}
    `;

/**
 * __useMessageSubscription__
 *
 * To run a query within a React component, call `useMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MessageSubscription, MessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageSubscription, MessageSubscriptionVariables>(MessageDocument, options);
      }
export type MessageSubscriptionHookResult = ReturnType<typeof useMessageSubscription>;
export type MessageSubscriptionResult = Apollo.SubscriptionResult<MessageSubscription>;
export const RegisterUserDocument = gql`
    mutation registerUser($username: String!, $email: String!, $password: String!) {
  register(data: {email: $email, username: $username, password: $password}) {
    _id
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;