import React, { createContext, useState } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const context = {
    data,
    setData,
  };

  return <DataContext.Provider value={context}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
