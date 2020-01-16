import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Card } from './Card';

afterEach(() => {
    cleanup();
});

describe('<Card />', () => {
    it('should match snapshot', () => {
        const { container } = render(
            <Card>
                This is some jsx content
            </Card>
        );

        expect(container).toMatchSnapshot();
    });
});
