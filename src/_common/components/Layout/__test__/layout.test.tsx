import React from "react";
import { shallow } from "enzyme";
import Layout from "../index";

describe("Test for App component", () => {
    beforeEach(() => {});
    it("App component should render", () => {
        const wrapper = shallow(
            <Layout>
                <div>hello</div>
            </Layout>
        );
    });
});
