

export const getLocations = (searchTerm: string) => {
    const api = `https://api.openaq.org/v1/locations?city[]=${searchTerm}`;
    
    return fetch(api)
        .then(response => response.json())
        .catch(error => console.error(error));
};
