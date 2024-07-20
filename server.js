import { createServer } from "node:http";
import ViteExpress from "vite-express";
import viteConfig from "./vite.config.js";
import configuration from "./backend/config/index.js";
import linkSocketIoWithServer from "./backend/app/socket/index.js";
import app from "./backend/app/expressApp/index.js";



const { BACKEND_SERVER_PORT } = configuration;

const server = createServer(app);
linkSocketIoWithServer(server);

server.listen(BACKEND_SERVER_PORT, () => {
    console.log(`Server on port ${BACKEND_SERVER_PORT}`);
})


ViteExpress.config(viteConfig);
ViteExpress.bind(app, server);

