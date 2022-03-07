import { setup, findByTestAttribute } from "../../../../utils/testUtils";
import Layout from "../index";

// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();
// Mocking the use navigate function.
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate,
}));

describe("Layout component", () => {
    beforeEach(() => {});
    it("component should render without errors.", () => {
        const wrapper = setup(undefined, Layout);
        const layoutComponent = findByTestAttribute(
            wrapper,
            "component-layout"
        );

        expect(layoutComponent.length).toBe(1);
    });

    it("component should render the header section.", () => {
        const wrapper = setup(undefined, Layout);
        const appHeader = findByTestAttribute(wrapper, "app-header-container");
        const appTitle = findByTestAttribute(wrapper, "app-title");
        expect(appHeader.length).toBe(1);
        expect(appTitle.length).toBe(1);
    });

    it("component should render the main section.", () => {
        const wrapper = setup(undefined, Layout);
        const appHeader = findByTestAttribute(wrapper, "main-content");
        expect(appHeader.length).toBe(1);
    });
});
