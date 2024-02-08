import axios from "axios";

const Helper = () => {
    const http = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {
            "Accept": 'application/json',
        }
    });
    return {
        http,

    }
}

export default Helper;