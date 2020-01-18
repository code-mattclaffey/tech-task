import React, { useState, useContext } from "react";
import { getLocations, getLatestParametersFromCity } from "../../apis/api";
import { LocationsContext } from '../LocationsContext/LocationsContext';


export const SearchContext = React.createContext({
    searchTerm: "",
    searchResults: [],
    setSearchTerm: (searchTerm: string) => searchTerm,
    handleKeyEvent: (event: any) => event,
    resetSearchResults: () => null,
    selectLocation: (city: string) => city
});

type ProviderProps = {
    searchResults?: Array<any>;
};

export const SearchContextProvider: React.FunctionComponent<ProviderProps> = ({
    children,
    searchResults,
}) => {
    const { setSelectedLocations } = useContext(LocationsContext);

    const [state, setState] = useState({
        searchTerm: "",
        searchResults: searchResults || []
    });

    const reduceDulplicateCities = (allCities: any, currentCity: any) => {
        const { city } = currentCity;

        const cityAlreadyExistsInObject = allCities.filter((cityObj: any) => {
            return cityObj.city === city;
        });

        if (cityAlreadyExistsInObject.length === 0) {
            allCities.push(currentCity);
        }

        return allCities;
    };

    const setSearchTerm = (searchTerm: string) => {
        setState({ ...state, searchTerm });
    };

    const handleKeyEvent = () => {
        const { searchTerm } = state;
        if (searchTerm.length === 0) {
            setState({ ...state, searchResults: [] });
            return;
        }

        getLocations(searchTerm).then(({ results }) => {
            const searchResults = results.reduce(reduceDulplicateCities, []);
            setState({ ...state, searchResults });
        });
    };

    const resetSearchResults = () => {
        setState({ ...state, searchResults: [] });
    };

    const selectLocation = (city: string) => {
        getLatestParametersFromCity(city).then(({ results }) => {
            setSelectedLocations(results);
            setState({ ...state, searchResults: [] });
        });
    };

    const data = {
        ...state,
        setSearchTerm,
        handleKeyEvent: handleKeyEvent,
        resetSearchResults,
        selectLocation
    };

    return (
        // @ts-ignore
        <SearchContext.Provider value={data}>
            {children}
        </SearchContext.Provider>
    );
};
