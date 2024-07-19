import { createAsyncThunk } from "@reduxjs/toolkit";
import { joinRoom } from "../../../../utils/socket/pseudoFetch/rooms";
// Thunks
export const joinRoomAsyncThunk = createAsyncThunk(
    `room/joinRoom`,
    async ({room, name}, thunkAPI) => {
        const result = await joinRoom({room, name});

        const { success, data, error } = result;
        if(success === true) return data;
        return thunkAPI.rejectWithValue(error);

    }
)
export function buildAsyncThunkCases_JoinRoom(builder) {
    builder // join room
    .addCase( 
        joinRoomAsyncThunk.pending,
        (state, {payload}) => {
            state.joinState = "joining";
        }
    )
    .addCase( 
        joinRoomAsyncThunk.fulfilled,
        (state, {payload}) => {
            state.joinState = "joined";
            const { user, room,  } = payload;
            Object.assign(state, { user, room });
        }
    )
    .addCase( 
        joinRoomAsyncThunk.rejected,
        (state, {payload}) => {
            state.joinState = "unjoined";
            state.error = payload; // error.message
        }
    );

}