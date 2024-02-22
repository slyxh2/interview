import fetcher from "./fetcher";


export const getHello = async () => {
    return fetcher.get('/hello').catch((err) => console.log(err));
}

export const login = async (username: string, password: string) => {
    return fetcher.post('/login', {
        username,
        password
    }).then(res => {
        console.log(res);
        const { access_token, refresh_token } = res.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
    });
}

export const refreshToken = async () => {
    const refresh_token = localStorage.getItem('refresh_token');
    let response;
    await fetcher.get('/refresh', {
        params: {
            token: refresh_token
        }
    }).then(res => {
        console.log(res);
        response = res;
        const { access_token, refresh_token } = res.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
    }).catch((err) => console.log(err))
    return response;
}