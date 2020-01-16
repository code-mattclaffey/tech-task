import React from 'react';
import classNames from 'classnames';

type InputProps = {
    type?: "text" | "number",
    name: string,
    id: string,
    additionalClassNames?: string,
    placeholder?: string
};

type InputWrapperProps = {
    additionalClassNames?: string,
    width?: string,
    hasIcon?: boolean;
};

type LabelProps = {
    htmlFor: string,
    additionalClassNames?: string
};

export const InputWrapper: React.FunctionComponent<InputWrapperProps> = ({ additionalClassNames, hasIcon, width = '', children }) => {
    const classes = classNames('c-input__container', additionalClassNames, {
        'c-input__container--has-icon': hasIcon,
        'c-input__container--thin': width === 'thin',
    });

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

export const Label: React.FunctionComponent<LabelProps> = ({ additionalClassNames, htmlFor, children }) => {
    const classes = classNames('c-label', additionalClassNames);

    return (
        <label htmlFor={htmlFor} className={classes}>
            {children}
        </label>
    );
};

export const Input: React.FunctionComponent<InputProps> = ({ type = "text", name, id, additionalClassNames, placeholder, ...rest }) => {
    const classes = classNames('c-input', additionalClassNames);

    return (
        <input type={type} name={name} id={id} className={classes} placeholder={placeholder} {...rest} />
    );
}