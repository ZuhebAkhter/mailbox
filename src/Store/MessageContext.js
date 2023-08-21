import React, { createContext } from "react";

const MessageContext = createContext({
  loadedMessages:[],
});

export const MessageContextProvider = (props) => {
  

  const messagecontext = {
    loadedMessages:[],
  };

  return (
    <MessageContext.Provider value={messagecontext}>
      
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
