import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Input, Label, InputWrapper } from '.';

afterEach(() => {
    cleanup();
});

describe('<Input />', () => {
    it('should match snapshot', () => {
        const { container } = render(
            <Input id="input" name="input" />
        );

        expect(container).toMatchSnapshot();
    });

    it('should match snapshot when type is changed', () => {
        const { container } = render(
            <Input id="input" name="input" type="number" />
        );

        expect(container).toMatchSnapshot();
    });
});

describe('<Label />', () => {
    it('should match snapshot', () => {
        const { container } = render(
            <Label htmlFor="input">
                Some Label Text
            </Label>
        );

        expect(container).toMatchSnapshot();
    });
});

describe('<InputWrapper />', () => {
    it('should match snapshot', () => {
        const { container } = render(
            <InputWrapper>
                <Input id="input" name="input" type="number" />
                <Label htmlFor="input">
                    Some Label Text
                </Label>
            </InputWrapper>
        );

        expect(container).toMatchSnapshot();
    });
});
