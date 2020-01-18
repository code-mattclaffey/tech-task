import React, { useContext, useState } from 'react';
import classNames from "classnames";

import { SearchContext } from "../SearchContext/SearchContext";

type SearchOptionProps = {
    city: string;
    index: number;
    hasFocus: boolean;
    selectLocation: (city: string) => void
};

const SearchOptions: React.FunctionComponent<SearchOptionProps> = ({
    city,
    index,
    hasFocus,
    selectLocation,
}) => {

    const classes = classNames("c-search-suggestions__option", {
        "c-search-suggestions__option--focus": hasFocus
    });

    return (
        <div
            role="option"
            tabIndex={-1}
            className={classes}
            data-testid={`search-option-${index}`}
            id={`${city}-${index}`}
            onClick={() => selectLocation(city)}
        >
            {city}
        </div>
    );
};

export const SearchResults: React.FunctionComponent = () => {
    const {
        searchResults,
        resetSearchResults,
    } = useContext(SearchContext);

    const { selectLocation } = useContext(SearchContext);

    const [state, setState] = useState({
        optionCurrentlyInFocus: 0
    });

    const reset = () => {
        resetSearchResults();
        setState({ optionCurrentlyInFocus: 0 });
    };

    const handleEnterKey = ({ city }: any) => {
        selectLocation(city);
    };

    const handleArrowDownEvent = () => {
        let newFocusNumber = state.optionCurrentlyInFocus + 1;

        if (newFocusNumber === searchResults.length) {
            newFocusNumber = 0;
        }

        setState({ optionCurrentlyInFocus: newFocusNumber })
    };

    const handleArrowUpEvent = () => {
        let newFocusNumber = state.optionCurrentlyInFocus;

        if (newFocusNumber === 0) {
            newFocusNumber = searchResults.length - 1;
        } else {
            newFocusNumber = newFocusNumber - 1;
        }

        setState({ optionCurrentlyInFocus: newFocusNumber });
    };

    const handleKeyEvent = (event: any) => {
        const keyCodeEvents: any = {
            13: () => handleEnterKey(searchResults[state.optionCurrentlyInFocus]),
            27: reset,
            40: handleArrowDownEvent,
            38: handleArrowUpEvent
        }

        if (keyCodeEvents[event.keyCode] !== undefined) {
            keyCodeEvents[event.keyCode]();
            return;
        }
    };

    let activeCity;

    if (searchResults.length > 0) {
        const { city } = searchResults[state.optionCurrentlyInFocus];
        activeCity = city;
    }

    return (
        <>
            <div
                className="u-visually-hidden"
                role="status"
                aria-live="polite"
                data-testid="search-results-aria-live"
            >
                {searchResults.length &&
                    `There are ${searchResults.length} suggestions. Use the up and down arrows to browse.`}
            </div>
            <div
                id="search-results"
                data-testid="search-results"
                className="c-search-suggestions__results"
                tabIndex={searchResults.length > 0 ? 0 : -1}
                role="listbox"
                aria-activedescendant={
                    activeCity !== undefined
                        ? `${activeCity}-${state.optionCurrentlyInFocus}`
                        : undefined
                }
                onBlur={reset}
                onKeyDown={handleKeyEvent}
            >
                {searchResults.map(({ city }, index) => (
                    <SearchOptions
                        city={city}
                        index={index}
                        hasFocus={state.optionCurrentlyInFocus === index}
                        key={city + index}
                        selectLocation={selectLocation}
                    />
                ))}
            </div>
        </>
    );
};