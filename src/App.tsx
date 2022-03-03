import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/components/Login";
import UserStore from "./store/datastores/UserStore";
import Register from "./app/components/Register";
import Landing from "./app/components/Landing";
import { getCurrentUser } from "./store/_api/User";

/**
 * Main App component
 * @returns {React.Component}
 */
function App() {
    useEffect(() => {
        UserStore.isLoggedIn && getCurrentUser(UserStore.id);
    }, [UserStore.isLoggedIn]);

    return (
        <Routes>
            {UserStore.isLoggedIn && <Route path="/" element={<Landing />} />}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
    );
}

export default App;
