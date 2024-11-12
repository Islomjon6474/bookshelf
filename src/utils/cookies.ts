import Cookies from 'js-cookie';

export const saveCredentials = (key: string, secret: string) => {
    Cookies.set('userKey', key, { secure: true, sameSite: 'Strict' });
    Cookies.set('userSecret', secret, { secure: true, sameSite: 'Strict' });
};

export const areCredentialsStored = () => {
    return Cookies.get('userKey') && Cookies.get('userSecret');
};
