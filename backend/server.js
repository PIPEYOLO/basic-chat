import { createServer } from "node:http"
import configuration from "./config/index.js";
import linkSocketIoWithServer from "./app/socket/index.js";

const { BACKEND_SERVER_PORT } = configuration;

const server = createServer();
linkSocketIoWithServer(server);

server.listen(BACKEND_SERVER_PORT, () => {
    console.log(`Server on port ${BACKEND_SERVER_PORT}`);
})



