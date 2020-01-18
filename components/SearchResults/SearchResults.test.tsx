import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { SearchResults } from ".";
import { SearchContextProvider } from "../SearchContext";

afterEach(() => {
    cleanup();
});

describe("<SearchSuggestions />", () => {
    it("should match snapshot", () => {
        const { container } = render(
            <SearchContextProvider
                searchResults={[
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
                ]}
            >
                <SearchResults />
            </SearchContextProvider>
        );

        expect(container).toMatchSnapshot();
    });

    it("should read out the total amount of results", () => {
        const { queryByTestId } = render(
            <SearchContextProvider
                searchResults={[
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
                ]}
            >
                <SearchResults />
            </SearchContextProvider>
        );

        expect(queryByTestId('search-results-aria-live').textContent).toEqual('There are 2 suggestions. Use the up and down arrows to browse.');
        expect(queryByTestId('search-results-aria-live').hasAttribute('aria-live')).toEqual(true);
        expect(queryByTestId('search-results-aria-live').hasAttribute('role')).toEqual(true);
    });

    it("should allow the user the navigate through the options with the arrow keys", () => {
        const { queryByTestId } = render(
            <SearchContextProvider
                searchResults={[
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
                ]}
            >
                <SearchResults />
            </SearchContextProvider>
        );

        const searchResults = queryByTestId('search-results');

        searchResults.focus();

        fireEvent.keyDown(searchResults, { key: 'ArrowDown', keyCode: 40 });

        expect(queryByTestId('search-option-1').classList.contains('c-search-suggestions__option--focus')).toEqual(true);
    });

    it("should set the focus class on the first option when the ArrowDown key is fired on the last option", () => {
        const { queryByTestId } = render(
            <SearchContextProvider
                searchResults={[
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
                ]}
            >
                <SearchResults />
            </SearchContextProvider>
        );

        const searchResults = queryByTestId('search-results');

        searchResults.focus();

        fireEvent.keyDown(searchResults, { key: 'ArrowDown', keyCode: 40 });
        fireEvent.keyDown(searchResults, { key: 'ArrowDown', keyCode: 40 });

        expect(queryByTestId('search-option-0').classList.contains('c-search-suggestions__option--focus')).toEqual(true);
    });

    it("should set the focus class on the last option when the ArrowUp key is fired on the first option", () => {
        const { queryByTestId } = render(
            <SearchContextProvider
                searchResults={[
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
                ]}
            >
                <SearchResults />
            </SearchContextProvider>
        );

        const searchResults = queryByTestId('search-results');

        searchResults.focus();

        fireEvent.keyDown(searchResults, { key: 'ArrowUp', keyCode: 38 });

        expect(queryByTestId('search-option-1').classList.contains('c-search-suggestions__option--focus')).toEqual(true);
    });

    it("should reset the search results when escape key is selected", () => {
        const { queryByTestId } = render(
            <SearchContextProvider
                searchResults={[
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
                ]}
            >
                <SearchResults />
            </SearchContextProvider>
        );

        const searchResults = queryByTestId('search-results');

        searchResults.focus();

        fireEvent.keyDown(searchResults, { key: 'Escape', keyCode: 27 });

        expect(queryByTestId('search-option01')).toBeNull();
        expect(queryByTestId('search-option-1')).toBeNull();
    });
});
