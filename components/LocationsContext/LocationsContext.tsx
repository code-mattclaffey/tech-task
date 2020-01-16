import React, { useState } from "react";

type ProviderProps = {};

const initialContext = {
    searchTerm: "",
    searchResults: [
        {
            city: "Amsterdam",
            country: "NL",
            count: 21301,
            locations: 14
        },
        {
            city: "Badhoevedorp",
            country: "NL",
            count: 2326,
            locations: 1
        },
        {
            city: "Amsterdam",
            country: "NL",
            count: 21301,
            locations: 14
        },
        {
            city: "Badhoevedorp",
            country: "NL",
            count: 2326,
            locations: 1
        },
        {
            city: "Amsterdam",
            country: "NL",
            count: 21301,
            locations: 14
        },
        {
            city: "Badhoevedorp",
            country: "NL",
            count: 2326,
            locations: 1
        }
    ],
    selectedLocations: [
        {
            location: "Punjabi Bagh",
            city: "Delhi",
            country: "IN",
            measurements: [
                {
                    parameter: "so2",
                    value: "7.8",
                    lastUpdated: "2015-07-24T11:30:00.000Z",
                    unit: "µg/m3",
                    sourceName: "Punjabi Bagh",
                    averagingPeriod: {
                        unit: "hours",
                        value: 0.25
                    }
                },
                {
                    parameter: "co",
                    value: 1.3,
                    lastUpdated: "2015-08-18T23:30:00.000Z",
                    unit: "mg/m3",
                    sourceName: "CPCB",
                    averagingPeriod: {
                        unit: "hours",
                        value: 0.25
                    }
                },
                {
                    parameter: "pm25",
                    value: 79,
                    lastUpdated: "2015-10-02T21:45:00.000Z",
                    unit: "µg/m3",
                    sourceName: "CPCB",
                    averagingPeriod: {
                        unit: "hours",
                        value: 0.25
                    }
                }
            ]
        }
    ],
    setSearchTerm: () => null,
    removeSelectedLocation: (location: string) => location
};

export const LocationsContext = React.createContext(initialContext);

export const LocationsProvider: React.FunctionComponent<ProviderProps> = ({
    children
}) => {
    const [state, setState] = useState(initialContext);

    const setSearchTerm: any = ({ currentTarget }: any) => {
        const searchTerm = currentTarget.value;
        setState({ ...state, searchTerm });
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

    const data = { ...state, setSearchTerm, removeSelectedLocation };

    return (
        // @ts-ignore
        <LocationsContext.Provider value={data}>
            {children}
        </LocationsContext.Provider>
    );
};
