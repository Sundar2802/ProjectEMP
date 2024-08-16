
import React from "react";
const Loading = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="loading">
        <div className="loader"></div>
      </div>
    )
  );
};

export default Loading;
