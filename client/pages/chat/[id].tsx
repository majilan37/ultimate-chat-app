import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import { useGetChatLazyQuery } from "../../generated/graphql";

function ChatScreen() {
  const {
    query: { id },
  } = useRouter();
  const [getChat, { data, loading, error }] = useGetChatLazyQuery({});
  console.log("chat error >>", error);
  useEffect(() => {
    if (id && !loading)
      getChat({
        variables: {
          id: id as string,
        },
      });
  }, [id, loading]);
  return (
    <div className="flex">
      <Sidebar />
      <Chat chat={data} loading={loading} />
    </div>
  );
}

export default ChatScreen;
