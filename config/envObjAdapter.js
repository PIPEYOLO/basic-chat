import globalConfig from ".";

export function getVariablesForClient(variables, envObj) {

    const envKeys = Object.keys(envObj);
    const publicEnvVars = {};
    const regExps = [];
    variables.forEach(variable => {
        if(variable instanceof RegExp) {
            envKeys.forEach(key => {
                if(variable.test(key) === true) {
                    publicEnvVars[key] = envObj[key];
                }
            });
            return;
        }

        if(envObj[variable] === undefined) {
            publicEnvVars[variable] = null;
        }
        else {
            publicEnvVars[`${variable}`] = envObj[variable];
        };
    });

    // const envKeys = Object.keys(envObj);
    // const regExpMatches = [];
    // regExps.forEach(exp => {
    //     envKeys.forEach((key, idx) => {
    //         if(exp.test(key) === true) {
    //             regExpMatches.push(key);
    //             envKeys.splice(idx, 1);
    //         }
    //     });
    // });
    // console.log(regExpMatches);
    // regExpMatches.forEach(keyMatched => {
    //     publicEnvVars[keyMatched] = envObj[keyMatched];
    // });


    return publicEnvVars;
}