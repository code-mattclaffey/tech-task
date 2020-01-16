import React, { useState } from "react";
import { getLocations } from "../../apis/api";
import debounce from "lodash.debounce";
import { LocationsContext } from '../LocationsContext/LocationsContext';

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

export const App: React.FunctionComponent<ProviderProps> = ({
    children,
    ...rest
}) => {
    const [state, setState] = useState({
        searchTerm: "",
        searchResults: [],
        selectedLocations: [],
        ...rest
    });

    const setSearchTerm: any = ({ currentTarget }: any) => {
        const searchTerm = currentTarget.value;
        setState({ ...state, searchTerm });
    };

    const getLocationsKeyUpEvent = () => {
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

    const removeSelectedLocation = (locationName: string) => {
        const { selectedLocations } = state;
        const filteredSelectedLocations = selectedLocations.filter(
            ({ location }) => location !== locationName
        );

        setState({
            ...state,
            selectedLocations: filteredSelectedLocations
        });
    };

    const data = {
        ...state,
        setSearchTerm,
        removeSelectedLocation,
        getLocationsKeyUpEvent: debounce(getLocationsKeyUpEvent, 500)
    };

    return (
        // @ts-ignore
        <LocationsContext.Provider value={data}>
            {children}
        </LocationsContext.Provider>
    );
};
