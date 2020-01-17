import React, { useState } from "react";
import { LocationsContext } from "../LocationsContext/LocationsContext";

type ProviderProps = {};

export const App: React.FunctionComponent<ProviderProps> = ({
    children,
    ...rest
}) => {
    const [state, setState] = useState({
        selectedLocations: [],
        ...rest
    });

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

    const setSelectedLocations = (results: Array<any>) => {
        const { selectedLocations } = state;
        const newSelectedLocations: any = [...selectedLocations, ...results];
        setState({ 
            ...state,
            selectedLocations: newSelectedLocations,
        });
    };

    const data = {
        ...state,
        removeSelectedLocation,
        setSelectedLocations
    };

    return (
        // @ts-ignore
        <LocationsContext.Provider value={data}>
            {children}
        </LocationsContext.Provider>
    );
};
