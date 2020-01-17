import React, { useState, useContext, useEffect } from "react";
import { getLocations, getLatestParametersFromCity } from "../../apis/api";
import { LocationsContext } from '../LocationsContext/LocationsContext';


export const SearchContext = React.createContext({
    searchTerm: "",
    searchResults: [],
    setSearchTerm: () => null,
    handleKeyUpEvent: (event: any) => event,
    resetSearchResults: () => null,
    selectLocation: (city: string) => city,
    optionCurrentlyInFocus: 0
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
        optionCurrentlyInFocus: 0
    });

    useEffect(() => {
        document.addEventListener('click', (event: any) => {
            if (!event.target.classList.contains('c-search-suggestions__option')) {
                resetSearchResults();
            }
        });
    }, []);

    const handleArrowDownEvent = () => {
        const { optionCurrentlyInFocus, searchResults } = state;
        let newFocusNumber = optionCurrentlyInFocus + 1;

        if (newFocusNumber === searchResults.length) {
            newFocusNumber = 0;
        }

        setState({ ...state, optionCurrentlyInFocus: newFocusNumber })
    };

    const handleArrowUpEvent = () => {
        const { optionCurrentlyInFocus, searchResults } = state;
        let newFocusNumber = optionCurrentlyInFocus;

        if (newFocusNumber === 0) {
            newFocusNumber = searchResults.length - 1;
        } else {
            newFocusNumber = newFocusNumber - 1;
        }

        setState({ ...state, optionCurrentlyInFocus: newFocusNumber });
    };

    const setSearchTerm: any = (event: any) => {
        event.preventDefault();
        const searchTerm = event.currentTarget.value;
        setState({ ...state, searchTerm });
    };

    const handleKeyUpEvent = (event: any) => {
        const { searchTerm } = state;

        if (event.keyCode === 27) {
            resetSearchResults();
            return;
        }

        if (event.keyCode === 40) {
            handleArrowDownEvent();
            return;
        }

        if (event.keyCode === 38) {
            handleArrowUpEvent();
            return;
        }

        if (searchTerm.length === 0) {
            setState({ ...state, searchTerm, searchResults: [] });
            return;
        }

        getLocations(searchTerm).then(({ results }) => {
            const searchResults = results.reduce(reduceDulplicateCities, []);
            setState({ ...state, searchTerm, searchResults, optionCurrentlyInFocus: 0 });
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
