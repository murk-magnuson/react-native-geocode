// const BASE_URL = 'https://localhost:3000';
// const BASE_URL = 'https://2605:e000:1201:c081:d1e2:2b8e:5bc6:241a:3000';
const BASE_URL = 'http://172.17.59.186:3000'; //ipv4
// const BASE_URL = 'http://192.168.43.163:3000'
// const BASE_URL = 'http://192.168.56.1:3000';

export const geoFetch = (path, options = {}) => {
    return fetch(`${BASE_URL}/api${path}`, options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            throw new Error('Something went wrong try again.')
        })
        .catch(err => {
            console.log('ERROR: ', err)
        })
}