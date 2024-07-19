import { createAsyncThunk } from "@reduxjs/toolkit";
import { readFile } from "../../../../utils/files/read";




export const loadFileDataAsyncThunk = createAsyncThunk(
    `files/loadFileData`,
    async (file) => {
        
        let readResult;
        try {
            readResult = await readFile(file);
        }
        catch(err) {
            throw { file: file, error: err};
        }
        
        return { file: file, data: readResult};
    }
);

export function buildAsyncThunkCases_loadFileData(builder) {
    builder
    .addCase(
        loadFileDataAsyncThunk.fulfilled,
        (state, {payload}) => {
            const fileInState = state.files.find(file => file.file === payload.file);
            fileInState.data = payload.data;
        }
    )
    .addCase(
        loadFileDataAsyncThunk.rejected,
        (state, {payload}) => {
            const fileInState = state.files.find(file => file.file === payload.file);
            fileInState.error = payload.error;
        }
    )
}