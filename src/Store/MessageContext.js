import React, { createContext, useState } from "react";

const MessageContext = createContext({
  loadedMessages:[],
  delete:(id)=>{},
});

export const MessageContextProvider = (props) => {

    
    const deleteHandler=(id)=>{
          }

  const messagecontext = {
    loadedMessages:[],
    delete:deleteHandler,
  };
  

  return (
    <MessageContext.Provider value={messagecontext}>
      
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
