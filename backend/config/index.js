import globalConfig from "../../config/index.js";
import path from "node:path";
import { config } from "dotenv";

const configuration = {...globalConfig};
config({
    path: path.join(configuration.PROJECT_ROOT_FOLDER, "backend", ".env.local"), // get the server configuration
    processEnv: configuration
})


// configuration.PROJECT_BACKEND_FOLDER = path.resolve(import.meta.dirname, "../");

configuration.ALLOWED_ORIGINS = [configuration.BACKEND_SERVER_ORIGIN, configuration.FRONTEND_SERVER_ORIGIN];

console.log(configuration);


export default configuration