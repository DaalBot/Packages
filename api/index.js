const { default: axios } = require("axios");

class DBRest {
    /**
     * @param {string} authorization 
    */
    constructor(authorization) {
        if (!authorization) throw new Error(`DaalBotAPI: Missing authorization key`);

        /**
         * The key to authorize requests with
        */
        this.key = authorization;

        get = async(url, options) => {
            const res = await axios.get(url, {
                headers: {
                    Authorization: this.key
                },
                ...options
            });
            return res.data;
        };

        post = async(url, body, options) => {
            const res = await axios.post(url, body, {
                headers: {
                    Authorization: this.key
                },
                ...options
            });
            return res.data;
        };

        remove = async(url, options) => {
            const res = await axios.delete(url, {
                headers: {
                    Authorization: this.key
                },
                ...options
            });
            return res.data;
        };
    }
}