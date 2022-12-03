import React from "react";

function Skeleton() {
  return (
    <div className="flex items-center gap-3 border-r bg-gray-50 px-4 py-2 hover:bg-gray-100">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700" />
      <div className="h-3 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
    </div>
  );
}

export default Skeleton;
