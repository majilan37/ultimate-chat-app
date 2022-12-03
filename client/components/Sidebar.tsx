import { signOut, useSession } from "next-auth/react";
import React, { memo, useEffect, useState } from "react";
import Avatar from "./Avatar";
import { Button } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import {
  Chat,
  ChatDocument,
  ChatSubscription,
  useChatSubscription,
  useGetChatsQuery,
} from "../generated/graphql";
import Link from "next/link";
import Skeleton from "./Skeleton";

function Sidebar() {
  const { data: session, status } = useSession();

  // * Search chat
  const [search, setSearch] = useState("");

  const [chats, setChats] = useState<Pick<Chat, "_id" | "users">[]>([]);
  const { data: wsChats, loading: wsLoading } = useChatSubscription({});
  const { data, loading, subscribeToMore } = useGetChatsQuery();

  useEffect(() => {
    setChats([...(data?.getChats ?? [])]);
  }, [loading, wsLoading, wsChats]);

  // * Combine query and subscription
  useEffect(() => {
    subscribeToMore({
      document: ChatDocument,
      onError(error) {
        console.log(error);
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newChat = (subscriptionData.data as unknown as ChatSubscription)
          .newChat;
        const checker = data?.getChats.every(
          (chat) => chat?._id !== wsChats?.newChat._id
        );

        console.log("newChat >>", newChat);
        return Object.assign({}, prev, {
          getChats: checker ? [newChat, ...prev.getChats] : [...prev.getChats],
        });
      },
    });
  }, [wsChats, status]);

  // * Search chat
  useEffect(() => {
    if (search) {
      setChats(
        chats.filter((chat) =>
          chat?.users
            .find((c) => c !== session?.user.email)!
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    } else {
      const checker =
        wsChats?.newChat &&
        data?.getChats.every((chat) => chat?._id !== wsChats?.newChat._id);
      setChats(
        checker
          ? [...((data?.getChats as Chat[]) ?? []), wsChats?.newChat]
          : [...((data?.getChats as Chat[]) ?? [])]
      );
    }
  }, [search]);

  return (
    <div className="sticky top-0 h-screen min-w-[250px] max-w-sm overflow-y-scroll  bg-red-50 scrollbar-hide md:min-w-[360px]">
      <div className="mb-2 flex items-center gap-3 border bg-gray-50 p-5">
        <Avatar />
        <p>
          {status === "loading"
            ? "Loading ..."
            : `Hello, ${session?.user.name}`}
        </p>
        <Button
          onClick={async () => await signOut({ callbackUrl: "/login" })}
          color="red">
          Sign out
        </Button>
      </div>
      <div className="relative mb-2 flex items-center rounded-full border border-gray-300 bg-gray-50 pr-0.5 ">
        <input
          type="search"
          id="default-search"
          className="block w-full  bg-transparent p-4 text-sm text-gray-900 outline-none "
          placeholder="Search chat"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
        />
        <Button
          type="submit"
          className=" grid place-items-center rounded-full bg-blue-700 px-4 py-3.5 !text-xs !font-medium text-white  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
          <MagnifyingGlassIcon className="h-5" />
        </Button>
      </div>
      {/* Add chat button */}
      <div className="flex justify-center space-x-2">
        <Modal />
      </div>
      {/* Chats here */}
      <div className="mt-4 divide-y-2">
        {(loading ? Array.from(new Array(6)) : chats)?.map(
          (chat: Chat, index) =>
            chat ? (
              <Link key={chat?._id} href={`/chat/${chat?._id}`}>
                <div className="flex cursor-pointer items-center gap-3 border-r bg-gray-50 px-4 py-2 hover:bg-gray-100">
                  <Avatar
                    large
                    seed={chat?.users?.find((c) => c !== session?.user.email)}
                  />
                  <p>{chat?.users?.find((c) => c !== session?.user.email)}</p>
                </div>
              </Link>
            ) : (
              <Skeleton key={index} />
            )
        )}
        {loading && chats?.length === 0 && (
          <h2>You don't have any chats, start adding some</h2>
        )}
      </div>
    </div>
  );
}

export default memo(Sidebar);
