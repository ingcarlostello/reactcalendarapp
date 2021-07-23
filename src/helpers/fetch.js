const baseUrl = process.env.REACT_APP_API_URL;

const fetchSinToken = (ruta, data, method = 'GET') => {
    const url = `${baseUrl}/${ruta}`;

    if(method === 'GET'){
        return fetch(url)
    }else{
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

const fetchConToken = (ruta, data, method = 'GET') => {
    const url = `${baseUrl}/${ruta}`;

    // leer del local storage el token
    const token = localStorage.getItem('token') || '';

    if(method === 'GET'){
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        })
    }else{
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    }
}

export {
    fetchSinToken,
    fetchConToken
}