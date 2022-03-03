import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import UserStore from "../../../store/datastores/UserStore";
import "./style.scss";

const Layout: React.FC = observer(() => {
    const [showUserSettings, setShowUserSettings] = useState<boolean>(false);
    const logoutUser = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
    };
    return (
        <div className="body">
            <div className="header-container">
                <div className="header-app-icon">App Icon</div>
                {UserStore.username && (
                    <div
                        className="header-user-details-container"
                        onClick={() => setShowUserSettings(!showUserSettings)}
                    >
                        <span className="header-user-name">
                            {UserStore.username}
                        </span>
                        <span className="arrow-icon"></span>
                        <ul
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
                                className="header-user-settings-item"
                                onClick={logoutUser}
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
});

export default Layout;
