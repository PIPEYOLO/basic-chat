import { createAsyncThunk } from "@reduxjs/toolkit";
import { messageToRoom } from "../../../../utils/socket/pseudoFetch/rooms.js";
import { messageAdapter } from "../index.js";

// console.log("adMEssage", addMessage); // resolver este problema demodulos circulares porque me da que add message es undefined

export const messageToRoomAsyncThunk = createAsyncThunk(
    `room/messageToRoom`,
    async (message, thunkAPI) => {
        const result = await messageToRoom({message: message}); 
        const { success, data, error } = result;
        if(success === true) return data.message;
        return thunkAPI.rejectWithValue({ error, message: data.message }); // reject with this payload
    }
);



export function buildAsyncThunkCases_messageToRoom (builder) {
    builder // message shipment
    .addCase(
        messageToRoomAsyncThunk.fulfilled,
        (state, {payload}) => {
            const changes = {...payload, shipState: "shipped"}
            messageAdapter.updateOne(state, { id: changes.localId, changes});
        }
    )
    .addCase(
        messageToRoomAsyncThunk.rejected,
        (state, action) => {
            const { error, message } = action.payload;
            const changes = {...message, error, shipState: "notShipped"};
            messageAdapter.updateOne(state, { id: changes.localId, changes });
        }
    )

}