import React, { useContext, useState } from "react";
import { Search } from "react-feather";
import { InputWrapper, Input, Label } from "../Input";
import classNames from "classnames";
import { SearchContext } from "../SearchContext/SearchContext";

type Props = {};
type SearchOptionProps = {
    city: string;
    index: number;
    hasFocus: boolean;
};

const SearchOptions: React.FunctionComponent<SearchOptionProps> = ({
    city,
    index,
    hasFocus
}) => {
    const {
        selectLocation
    } = useContext(SearchContext);

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

export const SearchSuggestions: React.FunctionComponent<Props> = () => {
    const {
        searchTerm,
        setSearchTerm,
        searchResults,
        handleKeyUpEvent,
    } = useContext(SearchContext);

    const [state, setState] = useState({
        optionCurrentlyInFocus: 0
    });
    
    const updateOptionFocus = () => {
        let { optionCurrentlyInFocus: newIndex } = state;

        setState({ optionCurrentlyInFocus: newIndex++ })
    };

    const inputProps = {
        defaultValue: searchTerm,
        onKeyUp: handleKeyUpEvent,
        onChange: setSearchTerm,
        placeholder: "Enter a city name",
        onKeyDown: updateOptionFocus,
        "data-testid": "search-result-input",
    };

    const { optionCurrentlyInFocus } = state;

    return (
        <form action="" className="c-search-suggestions" autoComplete="off">
            <InputWrapper hasIcon width="thin">
                <div className="u-visually-hidden" role="status" aria-live="polite">
                    {searchResults.length && `'There are ${searchResults.length} suggestions. Use the up and down arrows to browse.'`}
                </div>
                <Search size={30} />
                <Input name="search-term" id="search-term" {...inputProps} />
                <Label
                    htmlFor="search-term"
                    additionalClassNames="u-visually-hidden"
                >
                    {inputProps.placeholder}
                </Label>
            </InputWrapper>
            <div id="search-results" className="c-search-suggestions__results" role="listbox">
                {searchResults.map(({ city }, index) => (
                    <SearchOptions
                        city={city}
                        index={index}
                        hasFocus={optionCurrentlyInFocus === index}
                        key={city + index}
                    />
                ))}
            </div>
        </form>
    );
};
