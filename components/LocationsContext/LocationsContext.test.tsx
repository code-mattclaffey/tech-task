import React from "react";
import { render, cleanup } from "@testing-library/react";
import { LocationsContext } from ".";

afterEach(() => {
    cleanup();
});

describe("<LocationsContext />", () => {
    it("render whatever data I give it", () => {
        const expectedData = {
            searchTerm: "Test",
            searchResults: [
                {
                    hello: "world"
                }
            ],
            selectedLocations: [
                {
                    hello: "world"
                }
            ]
        };

        const { queryByTestId } = render(
            // @ts-ignore
            <LocationsContext.Provider value={expectedData}>
                <LocationsContext.Consumer>
                    {data => <span data-testid="context-data">{JSON.stringify(data)}</span>}
                </LocationsContext.Consumer>
            </LocationsContext.Provider>
        );

        // @ts-ignore
        expect(JSON.parse(queryByTestId('context-data').textContent)).toEqual(expectedData);
    });
});
