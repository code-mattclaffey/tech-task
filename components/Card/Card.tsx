import React from 'react';
import classNames from 'classnames';

// @ts-ignore
import { Heading, Text } from "@titan-tooling/ui";

type Props = {
    as?: string;
    additionalClassNames?: string;
};

export const Card: React.FunctionComponent<Props> = ({ additionalClassNames, children }) => {
    const classes = classNames('c-card', additionalClassNames);

    return (
        <div className={classes}>
            {children}
        </div>
    );
};
