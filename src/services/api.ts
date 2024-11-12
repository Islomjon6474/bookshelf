import axios from 'axios';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

const generateAuthHeaders = ( method: string, url: string, body: any, key?:string, secret?:string) => {
    let userKey = Cookies.get('userKey');
    let userSecret = Cookies.get('userSecret');
    if (key && secret) {
        Cookies.set('userKey', key, { secure: true, sameSite: 'Strict' });
        Cookies.set('userSecret', secret, { secure: true, sameSite: 'Strict' });
        userKey = key;
        userSecret = secret;
    }

    if (!userKey || !userSecret) throw new Error('Authentication data is missing.');

    const bodyString = body ? JSON.stringify(body) : '';
    const signString = `${method.toUpperCase()}${url}${bodyString}${userSecret}`;
    const sign = CryptoJS.MD5(signString).toString();

    return {
        Key: userKey,
        Sign: sign,
    };
};

export { api, generateAuthHeaders };
