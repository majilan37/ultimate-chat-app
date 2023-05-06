import { Session } from "next-auth";
import React, { useEffect } from "react";
import {
  MessageDocument,
  MessagesQuery,
  MessageSubscription,
  useMessagesQuery,
} from "../generated/graphql";
import ReactTimeAgo from "react-timeago";

function Messages({
  chat,
  session,
}: {
  chat: string;
  session: Session | null;
}) {
  const {
    data: messages,
    subscribeToMore,
    loading,
  } = useMessagesQuery({
    variables: {
      chat,
    },
  });

  useEffect(() => {
    subscribeToMore({
      document: MessageDocument,
      variables: {
        chat,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { newMessage } =
          subscriptionData.data as unknown as MessageSubscription;
        return { ...prev, getMessages: [...prev.getMessages, newMessage] };
      },
    });
  }, []);

  return (
    <div className="relative flex-1 space-y-3 ">
      {(!loading ? messages?.getMessages : Array.from(new Array(1)))?.map(
        (message: MessagesQuery["getMessages"][0]) =>
          message ? (
            <div
              className={`flex ${
                session?.user.id === message.user._id && "justify-end"
              } `}>
              <div
                className={`flex flex-col bg-gray-300 py-3 px-5 ${
                  session?.user.id === message.user._id && "! !bg-green-100"
                }`}>
                <span className="text-lg">{message.content}</span>
                <span className=" text-[10px] text-gray-600 ">
                  <ReactTimeAgo date={message.createdAt} />
                </span>
              </div>
            </div>
          ) : (
            <h1 className="text-center text-2xl font-semibold leading-[70vh] ">
              Loading...
            </h1>
          )
      )}
      {messages?.getMessages.length === 0 && (
        <h1 className="text-center text-2xl font-semibold leading-[70vh] ">
          No messages, start adding some
        </h1>
      )}
    </div>
  );
}

export default Messages;
