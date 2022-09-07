export const getGraphQLBodyRequest = (query: string, variables: any) => {
    return JSON.stringify({
        query,
        variables
    });
}