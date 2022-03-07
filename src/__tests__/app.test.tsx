import React from "react";
import { shallow } from "enzyme";
import App from "../App";

describe("App component", () => {
    beforeEach(() => {});
    it("component should render without errors.", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.exists()).toBeTruthy();
    });
});
