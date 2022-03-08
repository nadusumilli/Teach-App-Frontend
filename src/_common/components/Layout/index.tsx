import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { UserStoreImpl } from "../../../stores/datastores/user.store";
import "./style.scss";

interface Props {
    user: UserStoreImpl;
}

const Layout: React.FC<Props> = ({ user }) => {
    const navigate = useNavigate();

    const [showUserSettings, setShowUserSettings] = useState<boolean>(false);
    const logoutUser = (e: React.MouseEvent<HTMLElement>) => {
        user.logout();
        navigate("/", { replace: true });
    };
    return (
        <div data-test="component-layout" className="body">
            <div data-test="app-header-container" className="header-container">
                <div data-test="app-title" className="header-app-icon">
                    App Icon
                </div>
                {user.isAuthenticated() && (
                    <div
                        data-test="header-user-section"
                        className="header-user-details-container"
                        onClick={() => setShowUserSettings(!showUserSettings)}
                    >
                        <span
                            className="header-user-name"
                            data-test="header-user-name"
                        >
                            {user.getUsername()}
                        </span>
                        <span className="arrow-icon"></span>
                        <ul
                            data-test="header-user-settings"
                            className={`header-user-settings-container ${
                                showUserSettings ? "show" : "hide"
                            }`}
                        >
                            <li
                                className="header-user-settings-item"
                                onClick={logoutUser}
                            >
                                Edit Profile
                            </li>
                            <hr />
                            <li
                                data-test="header-logout"
                                className="header-user-settings-item"
                                onClick={logoutUser}
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div data-test="main-content" className="main-content">
                <Outlet />
            </div>
        </div>
    );
};

export default observer(Layout);
