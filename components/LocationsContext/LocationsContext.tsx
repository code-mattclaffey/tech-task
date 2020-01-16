import React, { useState } from 'react';

type ProviderProps = {}

const initialContext = {
    searchTerm: '',
    searchResults: [],
    selectedLocations: [],
}

export const LocationsContext = React.createContext(initialContext); 

export const LocationsProvider: React.FunctionComponent<ProviderProps> = ({ children }) => {
    const [state] = useState(initialContext);

    return (
        <LocationsContext.Provider value={{...state}}>
            {children}
        </LocationsContext.Provider>
    );
};
