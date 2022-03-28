import { configureStore } from '@reduxjs/toolkit'

import ticketsReducer from './redux/slices/ticketSlice'
import loginReducer from './redux/slices/loginSlice'
import userReducer from './redux/slices/userSlice'
import newTicketReducer from './redux/slices/addTicketSlice';
import registrationReducer from "./redux/slices/userRegisterSlice";
import passwordReducer from "./redux/slices/resetPassSlice";

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    login: loginReducer,
    user: userReducer,
    addTicket: newTicketReducer,
    registration: registrationReducer,
    password: passwordReducer
  },
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware({
    //  thunk:true,
       immutableCheck: false,
       serializableCheck:false,
     }),
})

export default store