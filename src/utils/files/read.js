

export function readFile(file, options={as: "buffer"}) {
    return new Promise((resolve, reject) => {
        const { as } = options;
        const fr = new FileReader();
        if(as === "buffer") {
            fr.readAsArrayBuffer(file);
        }
        else {
            throw new Error(`as is not acceptable`)
        };
    
        fr.addEventListener("load", ev => {
            resolve(ev.target.result);
        });
        fr.addEventListener("error", ev => {
            reject(ev.target.error);
        });

    });
}