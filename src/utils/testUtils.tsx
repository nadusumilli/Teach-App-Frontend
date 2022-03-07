import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

/**
 * Factory function to create a shallow wrapper for components
 * @param props
 * @param App
 * @returns
 */
export const setup = (
    props: object | undefined = {},
    App: React.FC | React.FC<any>
) => shallow(<App {...props} />);

export const findByTestAttribute = (
    wrapper: ShallowWrapper,
    value: string = ""
) => wrapper.find(`[data-test='${value}']`);
