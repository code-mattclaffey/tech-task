import React, { useContext } from "react";
import { Search } from "react-feather";
import { InputWrapper, Input, Label } from "../Input";
import { LocationsContext } from '../LocationsContext/LocationsContext';

type Props = {};
type SearchOptionProps = {
    city: string,
    index: number
};

const SearchOptions: React.FunctionComponent<SearchOptionProps> = ({ city, index }) => {
    return <div role="option" tabIndex={-1} className="c-search-suggestions__option" id={`${city}-${index}`}>{city}</div>;
}

export const SearchSuggestions: React.FunctionComponent<Props> = () => {
    const { searchTerm, setSearchTerm, searchResults } = useContext(LocationsContext);

    const inputProps = {
        defaultValue: searchTerm,
        onKeyUp: setSearchTerm,
        placeholder: "Enter a city name"
    };

    return (
        <div className="c-search-suggestions">
            <InputWrapper hasIcon width="thin">
                <Search size={30} />
                <Input name="search-term" id="search-term" {...inputProps} />
                <Label htmlFor="search-term" additionalClassNames="u-visually-hidden">Enter a city name</Label>
            </InputWrapper>
            <div id="search-results" className="c-search-suggestions__results">
                {searchResults.map(({ city }, index) => <SearchOptions city={city} index={index} key={city + index}/>)}
            </div>
        </div>
    );
}