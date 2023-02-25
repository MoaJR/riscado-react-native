import React, { createContext, useState } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const context = {
    data,
    setData,
    user,
    setUser,
  };

  return <DataContext.Provider value={context}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
