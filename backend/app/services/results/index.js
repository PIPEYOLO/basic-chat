import { Socket } from "socket.io";
import { StandarizedError } from "../errors/index.js";
import configuration from "../../../config/index.js";

const { SOCKETIO_RESULT_SUFFIX } = configuration;

class Result {
    constructor({success, info}) {
        if(new.target === Result) throw new Error(`${Result.name} is an abstract class`);

        if(typeof success !== "boolean") throw new Error(`success must be a boolean`);

        if(info) {
            if(typeof info !== "string") throw new Error(`info must be a string if present`);
            this.info = info;
        }

        this.success = success;                
    }
    
    sendToSocket(socket, event) {
        if(socket instanceof Socket === false) throw new Error(`socket must be a ${Socket.name}`);
        
        if(this instanceof UnsuccessfulResult) {
            this.#isErrorStandard();
        };
        const resultEvent = `${event}:${SOCKETIO_RESULT_SUFFIX}`;
        socket.emit(resultEvent, this);
    }


    #isErrorStandard() {
        if(this.error instanceof StandarizedError === false) throw new Error(`socket error must be a ${StandarizedError.name}`);
    }

}

export class SuccessfulResult extends Result {
    constructor({data, noData}) {
        super({success: true});

        if(noData !== true) {
            if(data instanceof Object === false) throw new Error(`data must be a ${Object.name}`);
            this.data = data;
        };

    }

}

export class UnsuccessfulResult extends Result {
    constructor ({error, info, data}) {
        super({success: false, info, data});

        if(error instanceof StandarizedError === false) throw new Error(`error must be a ${StandarizedError.name}`);
        if(data != undefined) { // optional data to pass
            this.data = data;
        }
        this.error = error;
    }

    addData(data){
        this.data = data;
        return this;
    }

}