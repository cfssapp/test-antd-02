import request from 'umi-request';

export async function getAll() {
    const options = {
        method: 'GET'
    };
    const url = '/items';
    return request(url, options);
}

export async function addItem(item) {
    const options = {
        method: 'POST'
    };
    const url = '/item';
    options.data = item;
    return request(url, options);
}

export async function updateItem(item) {
    const options = {
        method: 'PUT'
    };
    const url = '/item';
    options.data = item;
    return request(url, options);
}