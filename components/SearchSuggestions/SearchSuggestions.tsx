import React, { useContext } from "react";
import { Search } from "react-feather";
import debounce from "lodash.debounce";
import { InputWrapper, Input, Label } from "../Input";
import { SearchContext } from "../SearchContext/SearchContext";
import { SearchResults } from "../SearchResults";

type Props = {};

export const SearchSuggestions: React.FunctionComponent<Props> = () => {
    const {
        searchTerm,
        setSearchTerm,
        handleKeyEvent,
    } = useContext(SearchContext);

    const handleOnChange = (event: any) => {
        event.preventDefault();
        const searchTerm = event.currentTarget.value;
        setSearchTerm(searchTerm);
    };

    const inputProps = {
        defaultValue: searchTerm,
        onKeyUp: debounce(handleKeyEvent, 500),
        onFocus: handleKeyEvent,
        onChange: handleOnChange,
        placeholder: "Enter a city name",
        "data-testid": "search-result-input",
    };

    return (
        <form
            action=""
            className="c-search-suggestions"
            autoComplete="off"
            onSubmit={(event: any) => event.preventDefault()}
            data-testid="search-form"
        >
            <InputWrapper hasIcon width="thin">
                <Search size={30} />
                <Input name="search-term" id="search-term" {...inputProps} />
                <Label
                    htmlFor="search-term"
                    additionalClassNames="u-visually-hidden"
                >
                    {inputProps.placeholder}
                </Label>
            </InputWrapper>
            <SearchResults />
        </form>
    );
};
