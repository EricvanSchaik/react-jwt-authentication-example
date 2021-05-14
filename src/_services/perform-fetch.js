import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export function performFetch(endpoint, payload) {
    let requestOptions = { headers: { token: authHeader(),  'Content-Type': 'application/json' } };
    if (payload) {
        requestOptions = { ...requestOptions, method: 'POST', body: JSON.stringify(payload)};
    }
    else {
        requestOptions = { ...requestOptions, method: 'GET'};
    }
    return fetch(`${config.apiUrl + endpoint}`, requestOptions).then(handleResponse);
}   