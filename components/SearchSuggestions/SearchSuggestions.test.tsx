import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { SearchSuggestions } from '.';
import { App } from '../App';

afterEach(() => {
    cleanup();
});

describe('<SearchSuggestions />', () => {
    it('should match snapshot', () => {
        const { container } = render(
            <App>
                <SearchSuggestions />
            </App>
        );

        expect(container).toMatchSnapshot();
    });
});
