import React, { useState } from "react";
import TextInput from "../../../_common/components/TextInput";
import Button from "../../../_common/components/Button";
import Card from "../../../_common/components/Card";
import { Axios, LOGIN_USER } from "../../../utils/requestUtils";
import { parseJwt } from "../../../utils/stringUtils";
import UserStore from "../../../store/datastores/UserStore";
import "./style.scss";

let axios = Axios.default;

type userType = {
    username: string;
    password: string;
};
type buttonEventsType = { onClick: (e: React.MouseEvent<HTMLElement>) => void };

const Login: React.FC = () => {
    const [errors, setErrors] = useState<userType>({
        username: "",
        password: "",
    });
    const [user, setUser] = useState<userType>({ username: "", password: "" });

    const validateData = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
    };

    const onUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateData(e);
        setUser({
            ...user,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const buttonEvents: buttonEventsType = {
        onClick: async e => {
            e.preventDefault();
            console.log("data submitted with data", user);
            if (!user.username || !user.password) {
                return;
            }
            try {
                const res = await axios.post(LOGIN_USER, user);
                const loggedInUser = parseJwt(res.data.access);
                UserStore["id"] = loggedInUser?.id ?? 0;
                localStorage.setItem("token", JSON.stringify(res.data));
            } catch (error) {
                console.log(error);
            }
        },
    };

    const userNameField = {
        id: "username",
        name: "username",
        value: user.username,
        placeholder: "Please enter a username name.",
        events: {
            onChange: onUserChange,
        },
        errors,
    };

    const passwordField = {
        id: "password",
        name: "password",
        value: user.password,
        type: "password",
        placeholder: "Please enter a password.",
        events: {
            onChange: onUserChange,
        },
        errors,
    };

    return (
        <div className="login-container">
            <Card
                header={"Login"}
                footer={
                    <Button
                        label={"Login"}
                        type={"regular-md"}
                        classes={"light-grey"}
                        events={buttonEvents}
                    />
                }
            >
                <div className="login-body-container">
                    <form action="#" className="login-form">
                        <TextInput fieldData={userNameField} />
                        <TextInput fieldData={passwordField} />
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default Login;
