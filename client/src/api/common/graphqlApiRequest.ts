
type ApiRequestParams = {
    url: string,
    body: string
}

export const graphQLApiRequest = async ({url, body}: ApiRequestParams): Promise<any> => {
    const response = await fetch(url, {
        method: 'POST',
        body: body
    });

    const json = await response.json();

    if (response.status === 200) {
        return json;
    }

    return Promise.reject(json.errors[0].message);
}