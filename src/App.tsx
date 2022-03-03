import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/components/Login";
import UserStore from "./store/datastores/UserStore";
import Register from "./app/components/Register";
import Landing from "./app/components/Landing";
import { getCurrentUser } from "./store/_api/User";
import Layout from "./_common/components/Layout";

/**
 * Main App component
 * @returns {React.Component}
 */
const App = () => {
    useEffect(() => {
        UserStore.isLoggedIn && getCurrentUser(UserStore.id);
    }, [UserStore.isLoggedIn]);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {UserStore.isLoggedIn && <Route index element={<Landing />} />}
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route index element={<Navigate replace to="/login" />} />
                <Route
                    path="*"
                    element={
                        UserStore.isLoggedIn ? (
                            <Navigate replace to="/" />
                        ) : (
                            <Navigate replace to="/login" />
                        )
                    }
                />
            </Route>
        </Routes>
    );
};

export default App;
