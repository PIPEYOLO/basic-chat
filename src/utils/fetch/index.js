import { Axios } from "axios";


const { BACKEND_SERVER_ORIGIN, API_PATH } = env_;
const axios = new Axios({
    baseURL: BACKEND_SERVER_ORIGIN + API_PATH,
    withCredentials: true,
    responseType: "json",
    headers: { "Content-Type": "application/json" },
    transformRequest: function(data) {
        return JSON.stringify(data);
    },
    transformResponse: function (data) {
        return JSON.parse(data);
    }
});




export async function fetchServer({path, method="GET", body, headers={}}) {
    let result;
    try {
        result = await axios.request({
            url: path,
            headers: headers,
            method,
            data: body,
        })
    }
    catch(err) {
        result = err.response;
    };

    return result;
}
