import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./slices/room/index.js";
import filesReducer from "./slices/files/index.js";

export const store = configureStore({
    reducer: {
        room: roomReducer,
        files: filesReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {

            ignoredPaths: [// this means we can avoid the serializableFunction being called to this paths
                "*.content",
                "*.data"
            ],
            ignoredActions: [
                "files/setFileData",
                "files/setFileError"
            ],
            ignoredActionPaths: [
                "*/messageToRoom/*",
                "*/addMessage"
            ] ,
            ignoreState: true,
        
        },
    })
});




