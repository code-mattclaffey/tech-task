import React, { useState, useContext } from "react";
import { getLocations, getLatestParametersFromCity } from "../../apis/api";
import { LocationsContext } from '../LocationsContext/LocationsContext';


export const SearchContext = React.createContext({
    searchTerm: "",
    searchResults: [],
    setSearchTerm: () => null,
    handleKeyUpEvent: (event: any) => event,
    resetSearchResults: () => null,
    selectLocation: (city: string) => city
});

type ProviderProps = {};

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

export const SearchContextProvider: React.FunctionComponent<ProviderProps> = ({
    children
}) => {
    const { setSelectedLocations } = useContext(LocationsContext);

    const [state, setState] = useState({
        searchTerm: "",
        searchResults: [],
    });

    const setSearchTerm: any = ({ currentTarget }: any) => {
        const searchTerm = currentTarget.value;
        setState({ ...state, searchTerm });
    };

    const handleKeyUpEvent = (event: any) => {
        console.log(event.keyCode);
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
        handleKeyUpEvent: handleKeyUpEvent,
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
