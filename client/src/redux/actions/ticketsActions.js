import {getAllTickets, getSingleTicket,updateReplyTicket,updateTicketStatusClosed } from '../../api/ticketApi';
import { fetchTicketFailed, fetchTicketLoading, fetchTicketSuccess,searchTickets,fetchSingleTicketLoading,fetchSingleTicketSuccess,fetchSingleTicketFail,replyTicketFail,replyTicketLoading,replyTicketSuccess,closeTicketFail,closeTicketLoading,closeTicketSuccess,resetResponseMsg } from '../slices/ticketSlice'

export const fetchAllTickets = () => async (dispatch) => {
    dispatch(fetchTicketLoading());
    try {
      const result = await getAllTickets();
      result.data.result.length &&
        dispatch(fetchTicketSuccess(result.data.result));
    
    } catch (error) {
        dispatch(fetchTicketFailed(error.message))
    }
}

export const filterSearchTicket = (str) => (dispatch) => {
    dispatch(searchTickets(str));
  };
  

//   //Actions for single ticket only
  export const fetchSingleTicket = (_id) => async (dispatch) => {
    // console.log(_id)
    dispatch(fetchSingleTicketLoading());
    try {
      const result = await getSingleTicket(_id);
      // console.log(result.data.result[0].clientId)
      dispatch(
        fetchSingleTicketSuccess(
          result.data.result.length && result.data.result[0]
        )
      );
    } catch (error) {
      dispatch(fetchSingleTicketFail(error.message));
    }
  };
  

//   //Actions for replying on single ticket
  export const replyOnTicket = (_id, msgObj) => async (dispatch) => {
    dispatch(replyTicketLoading());
    try {
      const result = await updateReplyTicket(_id, msgObj);
      console.log(result);
      if (result.status === false) {
        return dispatch(replyTicketFail(result.message));
      }
  
      dispatch(fetchSingleTicket(_id));
  
      dispatch(replyTicketSuccess(result.message));
    } catch (error) {
      console.log(error.message);
      dispatch(replyTicketFail(error.message));
    }
  };


//   //Actions for closing ticket
  export const closeTicket = (_id) => async (dispatch) => {
    dispatch(closeTicketLoading());
    try {
      const result = await updateTicketStatusClosed(_id);
      if (result.status === false) {
        return dispatch(closeTicketFail(result.message));
      }
  
      dispatch(fetchSingleTicket(_id));
  
      dispatch(closeTicketSuccess("Status Updated successfully"));
    } catch (error) {
      console.log(error.message);
      dispatch(closeTicketFail(error.message));
    }
  };
