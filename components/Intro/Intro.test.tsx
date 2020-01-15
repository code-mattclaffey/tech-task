import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Intro } from './Intro';

afterEach(() => {
    cleanup();
});

describe('<Intro />', () => {
    it('should match snapshot', () => {
        const { container } = render(
            <Intro title="Hello World">
                This is some jsx content
            </Intro>
        );

        expect(container).toMatchSnapshot();
    });
});
