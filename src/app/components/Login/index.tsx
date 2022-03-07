import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../_common/components/TextInput";
import Button from "../../../_common/components/Button";
import Card from "../../../_common/components/Card";
import "./style.scss";
import { storeContext } from "../../../stores/store.context";

type userType = {
    username: string;
    password: string;
};
type buttonEventsType = { onClick: (e: React.MouseEvent<HTMLElement>) => void };

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useContext(storeContext);

    const [errors, setErrors] = useState<userType>({
        username: "",
        password: "",
    });
    const [loginUser, setLoginUser] = useState<userType>({
        username: "",
        password: "",
    });

    const validateData = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) {
            setErrors({
                ...errors,
                [e.currentTarget
                    .name]: `please enter a valid ${e.currentTarget.name}`,
            });
        } else {
            setErrors({ ...errors, [e.currentTarget.name]: "" });
        }
    };

    const onUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateData(e);
        setLoginUser({
            ...loginUser,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const buttonEvents: buttonEventsType = {
        onClick: async e => {
            e.preventDefault();
            console.log("data submitted with data", loginUser);
            if (!loginUser.username || !loginUser.password) {
                return;
            }
            const login = await user.login(loginUser);
            login && navigate("/home", { replace: true });
        },
    };

    const userNameField = {
        id: "username",
        name: "username",
        value: loginUser.username,
        placeholder: "Please enter a username name.",
        events: {
            onChange: onUserChange,
        },
        errors,
    };

    const passwordField = {
        id: "password",
        name: "password",
        value: loginUser.password,
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
