import { createSlice } from "@reduxjs/toolkit";

const initialState={
    Messages:[],
    newMessages:[],
    oldMessages:[],
    
}
const messageSlice=createSlice({
    name:'message',
    initialState,
    reducers:{
        addMessage:(state,action)=>{
            const newExpen =action.payload;
            
                state.Messages.push({
                    id: newExpen.id,
                    rb:newExpen.rb,
                    sub:newExpen.sub,
                    text:newExpen.text,
                    read:newExpen.read
                  });
            
      
        },
        deletMessage:(state,action)=>{
            const id=action.payload;
    state.Messages=state.Messages.filter(item => item.id !== id)

        },
        updateMessage:(state,action)=>{
            const update=action.payload;
            console.log(update)
            const index = state.Messages.findIndex(mess => mess.id === update.id);
            if (index !== -1) {
            //   state.oldMessages.push(update)
            //   state.Messages.pop(update)
            state.Messages[index]=update;
            }
        },
        replaceCart:(state,action) => {
            state.Messages=action.payload.Messages;
        }
    }
})
export const {addMessage,deletMessage,updateMessage,replaceCart} = messageSlice.actions;
 export default messageSlice.reducer;