import React from 'react';
import classNames from 'classnames';

// @ts-ignore
import { Heading, Text } from "@titan-tooling/ui";

type Props = {
    as?: string;
    additionalClassNames?: string;
};

/**
 * 
 * @param additionalClassNames string used to apply extra classNames if needed
 * @param children react prop to apply elements to live within this card
 * @param rest props that are customisable to a specific use case can be applied to the element 
 */
export const Card: React.FunctionComponent<Props> = ({ additionalClassNames, children, ...rest }) => {
    const classes = classNames('c-card', additionalClassNames);

    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    );
};
