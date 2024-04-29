import React, { createContext, useState } from "react";

const apiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [isRefresh, setIsRefresh] = useState(true);
  const [getUser, setGetUser] = useState(true);

  const handleRefresh = () => setIsRefresh(!isRefresh);
  const handleGetUser = () => setGetUser(!getUser);

  return (
    <apiContext.Provider
      value={{ isRefresh, handleRefresh, getUser, handleGetUser }}
    >
      {children}
    </apiContext.Provider>
  );
};

export default apiContext;
