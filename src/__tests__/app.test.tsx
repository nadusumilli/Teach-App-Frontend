import React from "react";
import { shallow } from "enzyme";
import App from "../App";

describe("Test for App component", () => {
    beforeEach(() => {});
    it("App component should render", () => {
        const wrapper = shallow(<App />);
    });
});
