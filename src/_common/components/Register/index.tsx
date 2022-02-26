import React, { useState } from "react";
import TextInput from "../TextInput";
import { separateCameCase } from "../../../utils/stringUtils";
import Button from "../Button";
import "./style.scss";

type buttonEventsType = { onClick: (e: React.MouseEvent<HTMLElement>) => void };

type userType = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const [user, setUser] = useState<userType>({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<userType>({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const buttonEvents: buttonEventsType = {
        onClick: e => {
            e.preventDefault();
            console.log("Submit button clicked", user);
        },
    };

    const validateData = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("validating data.");
        const emailTest = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        const passwordTest =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (!e.currentTarget.value.length) {
            setErrors({
                ...errors,
                [e.currentTarget
                    .name]: `Please enter a valid ${separateCameCase(
                    e.currentTarget.name
                )}`,
            });
        } else if (
            e.currentTarget.name === "email" &&
            !emailTest.test(e.currentTarget.value)
        ) {
            setErrors({
                ...errors,
                [e.currentTarget
                    .name]: `Please enter a valid ${e.currentTarget.name}`,
            });
        } else if (
            e.currentTarget.name === "password" &&
            !passwordTest.test(e.currentTarget.value)
        ) {
            setErrors({
                ...errors,
                [e.currentTarget
                    .name]: `Please enter a valid ${e.currentTarget.name}`,
            });
        } else if (
            e.currentTarget.name === "confirmPassword" &&
            e.currentTarget.value !== user.password
        ) {
            setErrors({
                ...errors,
                [e.currentTarget.name]: `Passwords should match`,
            });
        } else {
            setErrors({ ...errors, [e.currentTarget.name]: "" });
        }
    };

    const onUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateData(e);
        setUser({
            ...user,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const firstNameField = {
        id: "firstName",
        name: "firstName",
        value: user.firstName,
        placeholder: "Please enter a first name.",
        events: {
            onChange: onUserChange,
        },
        errors,
    };

    const lastNameField = {
        id: "lastName",
        name: "lastName",
        value: user.lastName,
        placeholder: "Please enter a last name.",
        events: {
            onChange: onUserChange,
        },
        errors,
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

    const emailField = {
        id: "email",
        name: "email",
        value: user.email,
        placeholder: "Please enter a email.",
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

    const confirmPasswordField = {
        id: "confirmPassword",
        name: "confirmPassword",
        value: user.confirmPassword,
        type: "password",
        placeholder: "Confirm Password.",
        events: {
            onChange: onUserChange,
        },
        errors,
    };

    return (
        <div className="register-container">
            <div className="register-container-header-section">
                <h1 className="register-container-heading">
                    User Registeration
                </h1>
            </div>
            <div className="register-container-body-section">
                <form className="register-form">
                    <TextInput fieldData={firstNameField} />
                    <TextInput fieldData={lastNameField} />
                    <TextInput fieldData={userNameField} />
                    <TextInput fieldData={emailField} />
                    <TextInput fieldData={passwordField} />
                    <TextInput fieldData={confirmPasswordField} />
                    <Button
                        label={"Register"}
                        type={"regular-lg"}
                        classes={"light-grey"}
                        events={buttonEvents}
                    />
                </form>
            </div>
        </div>
    );
};

export default Register;
