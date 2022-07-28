import React, { createContext, useState } from 'react';

export const newContext = createContext();

const CreateNewContext = ({ children }) => {
  const [hiden, setHiden] = useState(false);

  const hidenMenu = () => {
    setHiden(true);
  };

  const showMenu = () => {
    setHiden(false);
  };

  return (
    <newContext.Provider value={{ hiden, hidenMenu, showMenu }}>
      {children}
    </newContext.Provider>
  );
};

export default CreateNewContext;
