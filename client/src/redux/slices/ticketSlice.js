import { createSlice} from "@reduxjs/toolkit";
//ticket list page



const initialState = {
    tickets: [],
    pending: false,
    error: "",
    searchTicketList:[],
    selectedTicket:{},
    replyMsg: "",
    replyTicketError: "",
}


const ticketListSlice = createSlice({
    name: 'ticketList',
    initialState,
    reducers: {
        fetchTicketLoading:(state,action) => {
            state.pending = true; 
        },
        fetchTicketSuccess: (state, action) => {
            state.tickets = action.payload;
            state.searchTicketList = action.payload;
            state.pending = false;
        },
        fetchTicketFailed: (state, {payload}) => {
            state.pending = false;
            state.error = payload;
        },
        searchTickets: (state, { payload }) => {
          state.searchTicketList = state.tickets.filter((row) => {
            if (!payload) return row;
    
            return row.subject.toLowerCase().includes(payload.toLowerCase());
          });
        },
       fetchSingleTicketLoading: (state) => {
          state.pending = true;
        },
        fetchSingleTicketSuccess: (state, action) => {
          state.selectedTicket = action.payload;
          state.pending = false;
          state.error = "";
        },
        fetchSingleTicketFail: (state, { payload }) => {
          state.pending = false;
          state.error = payload;
        }, 
        replyTicketLoading: (state) => {
          state.pending = true;
        },
        replyTicketSuccess: (state, { payload }) => {
          state.pending = false;
          state.error = "";
          state.replyMsg = payload;
        },
        replyTicketFail: (state, { payload }) => {
          state.pending = false;
          state.replyTicketError = payload;
        },
        closeTicketLoading: (state) => {
          state.pending = true;
        },
        closeTicketSuccess: (state, { payload }) => {
          state.pending = false;
          state.error = "";
          state.replyMsg = payload;
        },
        closeTicketFail: (state, { payload }) => {
          state.pending = false;
          state.error = payload;
        },
        resetResponseMsg: (state) => {
          state.pending = false;
          state.replyTicketError = "";
          state.replyMsg = "";
        }
    }
})

export const {fetchTicketFailed, fetchTicketLoading, fetchTicketSuccess,searchTickets,fetchSingleTicketLoading,fetchSingleTicketSuccess,fetchSingleTicketFail,replyTicketFail,replyTicketLoading,replyTicketSuccess,closeTicketFail,closeTicketLoading,closeTicketSuccess,resetResponseMsg} = ticketListSlice.actions;

export default ticketListSlice.reducer;
