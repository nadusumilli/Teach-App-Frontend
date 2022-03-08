import React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";

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

/**
 * Factory function to create a shallow wrapper for components
 * @param props
 * @param App
 * @returns
 */
export const mountSetup = (
    props: object | undefined = {},
    App: React.FC | React.FC<any>
) => mount(<App {...props} />);

export const findByTestAttribute = (
    wrapper: ShallowWrapper | ReactWrapper,
    value: string = ""
) => wrapper.find(`[data-test='${value}']`);
