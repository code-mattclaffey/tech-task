import React from "react";
import fetchMock from "fetch-mock";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { SearchSuggestions } from ".";
import { App } from "../App";
import { SearchContextProvider } from '../SearchContext';

afterEach(() => {
    cleanup();
});

describe("<SearchSuggestions />", () => {
    beforeEach(() => {
        fetchMock.reset();
    });

    it("should match snapshot", () => {
        const { container } = render(
            <SearchContextProvider>
                <SearchSuggestions />
            </SearchContextProvider>
        );

        expect(container).toMatchSnapshot();
    });

    xit("should render options when the SearchContextProvider has searchResults", () => {
        const { container } = render(
            <SearchContextProvider>
                <SearchSuggestions />
            </SearchContextProvider>
        );

        expect(container.querySelectorAll('.c-search-suggestions__option').length).toEqual(2);
        expect(container).toMatchSnapshot();
    });

    it("should remember the search term when the component re-renders", () => {
        const expectedResult = "Manchester";
        const { queryByTestId } = render(
            <SearchContextProvider>
                <SearchSuggestions />
            </SearchContextProvider>
        );

        const searchResultInput = queryByTestId("search-result-input");

        if (searchResultInput === null) {
            expect(true).toEqual(false);
            return;
        }

        fireEvent.change(searchResultInput, {
            target: { value: expectedResult }
        });

        expect(searchResultInput.getAttribute("value")).toEqual(expectedResult);
    });

    // Come back to this later
    xit("should return cities from the API when a city has been entered", () => {
        // @ts-ignore
        fetchMock.get('https://api.openaq.org/v1/locations?city[]=Manchester', 
            {
                results: [
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
                ]
            }
        );

        const expectedResult = "Manchester";
        const { queryByTestId, queryAllByTestId } = render(
            <App>
                <SearchSuggestions />
            </App>
        );

        const searchResultInput = queryByTestId("search-result-input");

        if (searchResultInput === null) {
            expect(true).toEqual(false);
            return;
        }

        fireEvent.change(searchResultInput, {
            target: { value: expectedResult }
        });

        fireEvent.keyUp(searchResultInput);

        expect(queryAllByTestId("search-result-option").length).toEqual(2);
    });
});
