import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const userService = {
    getAll
};

function getAll(endpoint) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl + endpoint}`, requestOptions).then(handleResponse);
}