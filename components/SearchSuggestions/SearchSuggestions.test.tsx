import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { SearchSuggestions } from '.';
import { LocationsProvider } from '../LocationsContext/LocationsContext';

afterEach(() => {
    cleanup();
});

describe('<SearchSuggestions />', () => {
    it('should match snapshot', () => {
        const { container } = render(
            <LocationsProvider>
                <SearchSuggestions />
            </LocationsProvider>
        );

        expect(container).toMatchSnapshot();
    });
});
