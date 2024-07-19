import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { buildAsyncThunkCases_JoinRoom, joinRoomAsyncThunk } from "./asyncThunks/joinRoom";
import { buildAsyncThunkCases_messageToRoom, messageToRoomAsyncThunk } from "./asyncThunks/message";
import { buildAsyncThunkCases_LeaveRoom, leaveRoomAsyncThunk } from "./asyncThunks/leaveRoom";



export const messageAdapter = createEntityAdapter({
    selectId: message => message.localId,
});


const roomSliceState = messageAdapter.getInitialState({
    joinState: "unjoined",
    user: undefined,
    error: null,
    room: null,
});

const roomSlice = createSlice({
    name: "room", 
    initialState: roomSliceState,
    reducers: {
        addMessage: (state, {payload}) => {
            messageAdapter.addOne(state, payload)
        },

    },
    extraReducers: (builder) => {
        buildAsyncThunkCases_JoinRoom(builder);
        buildAsyncThunkCases_messageToRoom(builder);
        buildAsyncThunkCases_LeaveRoom(builder);
    }
});


// Selectors:

export const selectMessagesOrdered = createSelector(
    [
        state => state.room.entities,
        state => state.room.ids
    ],
    (entities, ids) => ids.map(id => entities[id])
);


// Actions
export const joinRoom = joinRoomAsyncThunk;
export const messageToRoom = messageToRoomAsyncThunk;
export const leaveRoom = leaveRoomAsyncThunk;


export const { addMessage, updateMessage } = roomSlice.actions;


export default roomSlice.reducer;
