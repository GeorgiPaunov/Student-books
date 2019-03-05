function request(method) {
    return async (url, data = {}) => {
        const response = await fetch(url, {
            method,
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data)
        });

        return response.json();
    }
}

export const get = request("get");
export const post = request("post");
export const update = request("put");
export const remove = request("delete");