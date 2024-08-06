import React from "react";

const Loading: React.FC = () => {
  return (
    <div
      className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center z-100"
      style={{
        backgroundColor: "rgba(0, 1, 0, 0.1)",
      }}
    >
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loading;
