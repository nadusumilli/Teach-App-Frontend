import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Login from "./app/components/Login";
import Landing from "./app/components/Landing";
import Layout from "./_common/components/Layout";
import Register from "./app/components/Register";
import { storeContext } from "./stores/store.context";

/**
 * Main App component
 * @returns {React.Component}
 */
const App = () => {
    const { user } = useContext(storeContext);
    return (
        <Routes>
            <Route path="/" element={<Layout user={user} />}>
                {user.isAuthenticated() && (
                    <Route index element={<Landing />} />
                )}
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route index element={<Navigate replace to="/login" />} />
                <Route
                    path="*"
                    element={
                        user.isAuthenticated() ? (
                            <Navigate replace to="/" />
                        ) : (
                            <Navigate replace to="login" />
                        )
                    }
                />
            </Route>
        </Routes>
    );
};

export default observer(App);
