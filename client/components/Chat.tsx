import { useSession } from "next-auth/react";
import React, { FormEvent, useRef, useState } from "react";
import { GetChatQuery, useAddMessageMutation } from "../generated/graphql";
import Avatar from "./Avatar";
import Messages from "./Messages";
import Skeleton from "./Skeleton";

function Chat({ chat, loading }: { chat?: GetChatQuery; loading?: boolean }) {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");
  const [createMessage, { loading: isLoading }] = useAddMessageMutation({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    if (!message) return;
    await createMessage({
      variables: {
        chat: chat?.getChat._id!,
        content: message,
      },
    });
  };

  return (
    <div className=" relative flex-1 overflow-hidden bg-gray-100">
      <div className="  bg-white ">
        <div className="  ">
          {status === "loading" || loading ? (
            <Skeleton />
          ) : (
            <div className="flex cursor-pointer items-center gap-3 border-r bg-gray-50 px-4 py-2">
              <Avatar
                large
                seed={chat?.getChat?.users?.find(
                  (c) => c !== session?.user.email
                )}
              />
              <p>
                {chat?.getChat?.users?.find((c) => c !== session?.user.email)}
              </p>
            </div>
          )}
          {/* Display messages */}
          <div className="box-border h-full overflow-y-auto bg-green-50 p-4 ">
            <Messages chat={chat?.getChat._id!} session={session} />
          </div>
          {/* Input to write a message */}
          <form onSubmit={onSubmit} className="sticky bottom-0 bg-gray-100 p-3">
            <input
              type="text"
              disabled={isLoading}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="last_name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Write a message"
              required
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
