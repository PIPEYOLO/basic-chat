import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import globalConfig from './config/index.js'
import { getVariablesForClient } from './config/envObjAdapter.js'


const myVariables = getVariablesForClient(
    [
        "BACKEND_SERVER_ORIGIN", 
        "PROJECT_NAME", 
        
        // Web: ↓↓
        /^WEB_ROUTE_/,

        // Sockets: ↓↓
        /^SOCKETIO_EVENT_/,
        "SOCKETIO_RESULT_SUFFIX",
        "SOCKETIO_MAX_PAYLOAD_SIZE",

        // Api: ↓↓
        /^API_PATH/,


        // Other: ↓↓
        "CREATOR_INSTAGRAM",
        "CREATOR_GITHUB",
        "NODE_ENV"
    ],
    {...globalConfig}
);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        "env_": myVariables
    },
    server: {
        port: globalConfig.FRONTEND_SERVER_PORT
    }

    
})
