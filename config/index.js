import path from "path";
import { config } from "dotenv";

const globalConfig = {};
globalConfig.PROJECT_ROOT_FOLDER = path.resolve(import.meta.dirname, "../");


config({
    path: path.join(globalConfig.PROJECT_ROOT_FOLDER, ".env"),
    processEnv: globalConfig
});

globalConfig.BACKEND_SERVER_ORIGIN = `${globalConfig.PROTOCOL}://${globalConfig.IP}:${globalConfig.BACKEND_SERVER_PORT}`;
globalConfig.FRONTEND_SERVER_ORIGIN = `${globalConfig.PROTOCOL}://${globalConfig.IP}:${globalConfig.FRONTEND_SERVER_PORT}`;


export default globalConfig;
