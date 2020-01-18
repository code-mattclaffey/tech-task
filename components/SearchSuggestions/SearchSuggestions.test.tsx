import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { SearchSuggestions } from ".";
import { App } from "../App";
import { SearchContextProvider } from '../SearchContext';

afterEach(() => {
    cleanup();
});

describe("<SearchSuggestions />", () => {
    it("should match snapshot", () => {
        const { container } = render(
            <SearchContextProvider>
                <SearchSuggestions />
            </SearchContextProvider>
        );

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
});
