import { configureStore } from '@reduxjs/toolkit';
import messageSliceReducer from '../Store/MessageSlice'


const store = configureStore({
  reducer: {
    message: messageSliceReducer,
   
  },
});

export default store;