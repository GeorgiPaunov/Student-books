function request(method) {
    return async (url, data, token) => {
        const headers = { "content-type": "application/json" };

        if (token) {
            headers.Authorization = "Bearer " + token;
        }

        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(data)
        });

        return response.json();
    }
}

export const get = request("get");
export const post = request("post");
export const update = request("put");
export const remove = request("delete");