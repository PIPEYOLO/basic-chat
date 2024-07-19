
const storage = localStorage;
export default class StorageInfo {
    static #credentialsKey="credentials"
    static getCredentials() {
        return this.#getParsedKey(this.#credentialsKey)
    }
    static setCredentials(credentials) {
        console.log(credentials);
        this.#setKeyStringified(this.#credentialsKey, credentials);
    }


    static #getParsedKey(key, options={parser: JSON.parse}) {
        const { parser } = options;
        const info = storage.getItem(key);
        console.log(info);
        return info ? parser(info) : info;
    }
    
    static #setKeyStringified(key, value, options={stringifier: JSON.stringify}) {
        const { stringifier } = options;
        storage.setItem(key,  stringifier(value));
    }


}
