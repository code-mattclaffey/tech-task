

/**
 * city query takes in multiple cities so it is city[]=Name
 * @param searchTerm 
*/

export const getLocations = (searchTerm: string) => {
    const apiUrl = `https://api.openaq.org/v1/locations?city[]=${searchTerm}`;
    
    return fetch(apiUrl)
        .then(response => response.json())
        .catch(error => console.error(error));
};

/**
 * Only takes in one city
 * @param city 
 */
export const getLatestParametersFromCity = (city: string) => {
    const apiUrl = `https://api.openaq.org/v1/latest?city=${city}`;

    return fetch(apiUrl)
        .then(response => response.json())
        .catch(error => console.error(error));
};
