import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
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

    it('should render one selected city', () => {
        const { getAllByTestId } = render(
            <LocationsProvider>
                <SelectedLocations />
            </LocationsProvider>
        );

        expect(getAllByTestId('selected-location').length).toEqual(1);
    });

    it('should remove the selected city when the remove button is clicked', () => {
        const { queryByTestId, queryAllByTestId } = render(
            <LocationsProvider>
                <SelectedLocations />
            </LocationsProvider>
        );

        const button = queryByTestId('remove-btn');

        if (button !== null) {
            fireEvent.click(button);
        }

        expect(queryAllByTestId('selected-location').length).toEqual(0);
    });
});
