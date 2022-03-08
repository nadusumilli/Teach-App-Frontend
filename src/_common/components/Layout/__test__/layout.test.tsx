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
    let store: any;
    beforeEach(() => {
        store = {
            userService: {},
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            authenticated: false,
            isAuthenticated: jest.fn().mockReturnValue(false),
            getUsername: jest.fn().mockReturnValue("hello"),
        };
    });

    it("component should render without errors.", () => {
        const wrapper = setup({ user: store }, Layout);
        const layoutComponent = findByTestAttribute(
            wrapper,
            "component-layout"
        );

        expect(layoutComponent.length).toBe(1);
    });

    it("component should render the header section.", () => {
        const wrapper = setup({ user: store }, Layout);
        const appHeader = findByTestAttribute(wrapper, "app-header-container");
        const appTitle = findByTestAttribute(wrapper, "app-title");
        expect(appHeader.length).toBe(1);
        expect(appTitle.length).toBe(1);
    });

    it("component should render the main section.", () => {
        const wrapper = setup({ user: store }, Layout);
        const appHeader = findByTestAttribute(wrapper, "main-content");
        expect(appHeader.length).toBe(1);
    });

    it("component should render the username only if authenticated.", () => {
        let wrapper = setup({ user: store }, Layout);
        let appHeader = findByTestAttribute(wrapper, "header-user-section");
        expect(appHeader.length).toBe(0);
        store.isAuthenticated = jest.fn().mockReturnValue(true);
        wrapper = setup({ user: store }, Layout);
        appHeader = findByTestAttribute(wrapper, "header-user-section");
        expect(appHeader.length).toBe(1);
        appHeader = findByTestAttribute(wrapper, "header-user-name");
        expect(appHeader.text()).toBe("hello");
    });

    it("component should complete logout once clicked.", () => {
        store.isAuthenticated = jest.fn().mockReturnValue(true);
        const wrapper = setup({ user: store }, Layout);
        const userSection = findByTestAttribute(wrapper, "header-user-section");
        let userSettings = findByTestAttribute(wrapper, "header-user-settings");
        expect(userSettings.hasClass("hide")).toBe(true);
        userSection.simulate("click");
        userSettings = findByTestAttribute(wrapper, "header-user-settings");
        expect(userSettings.hasClass("show")).toBeFalsy(); // TODO: change to truthy
    });

    it("component should complete logout once clicked.", () => {
        store.isAuthenticated = jest.fn().mockReturnValue(true);
        store.logout = jest.fn();
        const spy = jest.spyOn(store, "logout");
        const wrapper = setup({ user: store }, Layout);
        const appHeader = findByTestAttribute(wrapper, "header-logout");
        expect(appHeader.length).toBe(1);
        appHeader.simulate("click");
        expect(spy).toHaveBeenCalled();
    });
});
