import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { SelectedLocations } from '.';
import { LocationsProvider } from '../LocationsContext/LocationsContext';

afterEach(() => {
    cleanup();
});

describe('<SelectedLocations />', () => {
    it('should match snapshot', () => {
        const { container } = render(
            <LocationsProvider>
                <SelectedLocations />
            </LocationsProvider>
        );

        expect(container).toMatchSnapshot();
    });
});
