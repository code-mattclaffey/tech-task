import React, { useContext } from "react";

// @ts-ignore
import { Button, Heading } from "@titan-tooling/ui";

import { Card } from "../Card";
import { X as CloseIcon } from "react-feather";
import { LocationsContext } from '../LocationsContext';

type PropsForSelectedLocations = {};
type PropsForLocation = {
    location: string,
    city: string,
    country: string,
    measurements: Array<any>
}

const Location: React.FunctionComponent<PropsForLocation> = ({ location, city, measurements, country }) => (
    <li className="c-selected-locations__location">
        <Card>
            <Button size="small" variant="plain" aria-label="Remove {city name} from the selected locations list" additionalClassNames="c-selected-locations__remove-city-btn">
                <CloseIcon size={30} />
            </Button>
            <span className="c-selected-locations__attr u-text--uppercase u-text--small">
                Updated and hour ago
            </span>
            <span className="c-selected-locations__attr c-selected-locations__attr--heading e-heading e-heading--h6">
                {location}
            </span>
            <span className="c-selected-locations__attr">
                in {city}, {country}
            </span>
            <span className="c-selected-locations__attr u-text--semibold u-text--uppercase">
                <span className="u-text--captilize">Values:</span> {measurements.map(({ parameter, value }) => `${parameter}: ${value}`).join(', ')}
            </span>
        </Card>
    </li>
);

export const SelectedLocations: React.FunctionComponent<PropsForSelectedLocations> = () => {
    const { selectedLocations } = useContext(LocationsContext);

    return (
        <ul className="c-selected-locations">
            {selectedLocations.map(({ location, city, measurements, country }) => <Location key={location + city} city={city} location={location} measurements={measurements} country={country} />)}
        </ul>
    );
};
