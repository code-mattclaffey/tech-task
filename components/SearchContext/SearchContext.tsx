import React, { useState, useContext } from "react";
import { getLocations, getLatestParametersFromCity } from "../../apis/api";
import { LocationsContext } from '../LocationsContext/LocationsContext';


export const SearchContext = React.createContext({
    searchTerm: "",
    searchResults: [],
    setSearchTerm: () => null,
    handleKeyEvent: (event: any) => event,
    resetSearchResults: () => null,
    selectLocation: (city: string) => city
});

type ProviderProps = {};

export const SearchContextProvider: React.FunctionComponent<ProviderProps> = ({
    children
}) => {
    const { setSelectedLocations } = useContext(LocationsContext);

    const [state, setState] = useState({
        searchTerm: "",
        searchResults: []
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

    const setSearchTerm: any = (event: any) => {
        event.preventDefault();
        const searchTerm = event.currentTarget.value;
        setState({ ...state, searchTerm });
    };

    const handleKeyEvent = () => {
        const { searchTerm } = state;

        if (searchTerm.length === 0) {
            setState({ ...state, searchTerm, searchResults: [] });
            return;
        }

        getLocations(searchTerm).then(({ results }) => {
            const searchResults = results.reduce(reduceDulplicateCities, []);
            setState({ ...state, searchTerm, searchResults });
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
