import React from 'react';
import classNames from 'classnames';

type InputProps = {
    type?: "text" | "number",
    name: string,
    id: string,
    additionalClassNames?: string,
    rest?: any
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

/**
 * 
 * @param additionalClassNames string used to apply extra classNames if needed
 * @param children react prop to apply elements to live within this card
 * @param hasIcon bool that adds a style change to the element
 * @param width string that adds a style change to the element
 */
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

/**
 * 
 * @param additionalClassNames string used to apply extra classNames if needed
 * @param children react prop to apply elements to live within this card
 * @param htmlFor string to map the label to the input element
 */
export const Label: React.FunctionComponent<LabelProps> = ({ additionalClassNames, htmlFor, children }) => {
    const classes = classNames('c-label', additionalClassNames);

    return (
        <label htmlFor={htmlFor} className={classes}>
            {children}
        </label>
    );
};

/**
 * 
 * @param additionalClassNames string used to apply extra classNames if needed
 * @param name gives the input a name so the BE can get the form data when the form is posted
 * @param id so the element id can be mapped to the label
 * @param type in case this is needed to be used for a number element etc...
 * @param rest in case this needs any other custom props for a specific use case
 */
export const Input: React.FunctionComponent<InputProps> = ({ type = "text", name, id, additionalClassNames, ...rest }) => {
    const classes = classNames('c-input', additionalClassNames);

    return (
        <input type={type} name={name} id={id} className={classes} {...rest} />
    );
}