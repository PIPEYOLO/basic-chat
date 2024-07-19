import { getResultEvent } from "../eventResult";
import { socket } from "../index.js";


export function pseudoFetch(event, data, options={rejectIfError: false}) {
    const { rejectIfError } = options;
    if(typeof event !== "string") throw new Error(`evnet must be a string`);
    return new Promise((resolve, reject) => {
        socket.emit(event, data);
        
        const resultEvent = getResultEvent(event);
        socket.once(resultEvent, result => {
            if(result.success === false) {
                if(rejectIfError === true) {
                    reject(result);
                }
                else {
                    resolve(result);
                }
            }
            else {
                resolve(result);
            };
        });

    });
}