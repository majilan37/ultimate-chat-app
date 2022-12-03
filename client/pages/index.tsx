import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex h-screen flex-1 flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-semibold">
          Welcome to my Chat App, chat with friends and family,
        </h2>
        <p>Real time Chat app with React, Apollo, TypeGraphQL and WebSockets</p>
      </div>
    </div>
  );
};

export default Home;
