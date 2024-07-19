import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { buildAsyncThunkCases_loadFileData, loadFileDataAsyncThunk } from "./asyncThunks/files";


const filesAdapter = createEntityAdapter({
    selectId: file => file.id
});

const filesState = filesAdapter.getInitialState({
    error: null
});

const filesSlice = createSlice({
    name: "files",
    initialState: filesState,
    reducers: {
        addFiles: (state, {payload}) => {
            const filesToAdd = payload;
            const totalFiles = state.ids.length + filesToAdd.length;
            if(totalFiles > 5) {
                state.error = { message: "Files to add must not exced 5" };
            }
            filesAdapter.addMany(state, filesToAdd);
        },
        setFileData: (state, {payload}) => {
            const { id, data } = payload;
            filesAdapter.updateOne(state, { id, changes: { data } });
        },
        setFileError: (state, {payload}) => {
            const { id, error } = payload;
            filesAdapter.updateOne(state, { id, changes: { error } });
        },
        removeFiles:  (state, {payload}) => {
            const filesToRemoveIds = payload;
            filesAdapter.removeMany(state, filesToRemoveIds);
            if(state.ids.length <=5 ) {
                state.error = null;
            };
        },
        removeAllFiles: (state) => {
            filesAdapter.removeAll(state);
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        buildAsyncThunkCases_loadFileData(builder);
    }
});

// Selectors:
export const selectFilesOrdered = createSelector(
    [
        state => state.files.ids,
        state => state.files.entities
    ],
    (ids, entities) => ids.map(id => entities[id])
);


// Actions:

export const { addFiles, removeFiles, removeAllFiles, setFileData, setFileError } = filesSlice.actions;

export default filesSlice.reducer;