import { createAsyncThunk } from "@reduxjs/toolkit";
import { leaveRoom } from "../../../../utils/socket/pseudoFetch/rooms";
// Thunks
export const leaveRoomAsyncThunk = createAsyncThunk(
    `room/leaveRoom`,
    async (_, thunkAPI) => {
        const result = await leaveRoom();

        const { success, data, error } = result;
        if(success === true) return data;
        return thunkAPI.rejectWithValue(error);
    }
)
export function buildAsyncThunkCases_LeaveRoom(builder) {
    builder // join room
    .addCase( 
        leaveRoomAsyncThunk.pending,
        (state, {payload}) => {
            state.joinState = "leaving";
        }
    )
    .addCase( 
        leaveRoomAsyncThunk.fulfilled,
        (state, {payload}) => {
            state.joinState = "unjoined";
        }
    )
    .addCase( 
        leaveRoomAsyncThunk.rejected,
        (state, {payload}) => {
            state.joinState = "joined";
            state.error = payload; // error.message
        }
    );

}

