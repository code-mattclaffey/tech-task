import React from "react";

// @ts-ignore
import { Heading, Text } from "@titan-tooling/ui";

type Props = {
    title: string;
};

/**
 * 
 * @param children react prop
 * @param title defines the title for the intro component - string
 */
export const Intro: React.FunctionComponent<Props> = ({ title, children }) => (
    <>
        <Heading as="h1" type="h3" additionalClassNames="u-text--align-center">
            {title}
        </Heading>
        <Text additionalClassNames="u-text--align-center">{children}</Text>
    </>

);
