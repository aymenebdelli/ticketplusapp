import {
    openNewTicketPending,
    openNewTicketSuccess,
    openNewTicketFail,
  } from "../slices/addTicketSlice";
  import { createNewTicket } from "../../api/ticketApi";
  
  export const openNewTicket = (formData) => (dispatch) => {
    return  new Promise(async (resolve, reject) => {
      try {
        dispatch(openNewTicketPending());
  
        //call api
        const result = await createNewTicket(formData);
        if (result.status === false) {
          return dispatch(openNewTicketFail(result.message));
        }
        dispatch(openNewTicketSuccess(result.message));
      } catch (error) {
        console.log(error);
        dispatch(openNewTicketFail(error.message));
      }
      setImmediate(resolve)
      process.nextTick(() => console.log('next tick1'));
    });
  };