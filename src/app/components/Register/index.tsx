import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../_common/components/Card";
import Button from "../../../_common/components/Button";
import { storeContext } from "../../../stores/store.context";
import TextInput from "../../../_common/components/TextInput";
import { separateSnakeCase } from "../../../utils/stringUtils";
import "./style.scss";

type buttonEventsType = { onClick: (e: React.MouseEvent<HTMLElement>) => void };

type userType = {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    confirm_password: string;
};

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useContext(storeContext);

    const [registerUser, setRegisterUser] = useState<userType>({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState<userType>({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const isRegistrationDataEmpty = (key: string = "all") => {
        if (key === "all") {
            for (key in registerUser) {
                if (!registerUser[key as keyof userType].length) return true;
            }
            return false;
        } else {
            return !registerUser[key as keyof userType].length;
        }
    };

    const buttonEvents: buttonEventsType = {
        onClick: async e => {
            e.preventDefault();

            // check if registerUser data is valid.
            if (
                errors.first_name ||
                errors.last_name ||
                errors.username ||
                errors.email ||
                errors.password ||
                errors.confirm_password ||
                isRegistrationDataEmpty()
            ) {
                console.log("errors are called.");
                let regErrors: any = {};
                Object.keys(registerUser).map(key => {
                    if (!registerUser[key as keyof userType]) {
                        regErrors[
                            key as keyof typeof regErrors
                        ] = `Please enter a valid ${separateSnakeCase(key)}`;
                    }
                });

                setErrors({
                    ...errors,
                    ...regErrors,
                });
                return;
            }

            // data is valid sending a request to the api for registration.
            console.log("Submit button clicked", registerUser);
            try {
                const response = await user.register(registerUser);
                response && navigate("/", { replace: true });
            } catch (e) {
                console.log(e);
            }
        },
    };

    const validateData = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("validating data.");
        const emailTest = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        const passwordTest =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (!e.currentTarget.value.length) {
            setErrors({
                ...errors,
                [e.currentTarget
                    .name]: `Please enter a valid ${separateSnakeCase(
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
        } else if (e.currentTarget.name === "password") {
            if (!e.currentTarget.value)
                setErrors({
                    ...errors,
                    [e.currentTarget
                        .name]: `Please enter a valid ${e.currentTarget.name}`,
                });
            else if (!passwordTest.test(e.currentTarget.value))
                setErrors({
                    ...errors,
                    [e.currentTarget.name]: "Please enter a strong password",
                });
            else
                setErrors({
                    ...errors,
                    [e.currentTarget.name]: "",
                });
        } else if (
            e.currentTarget.name === "confirm_password" &&
            e.currentTarget.value !== registerUser.password
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
        setRegisterUser({
            ...registerUser,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const first_nameField = {
        id: "first_name",
        name: "first_name",
        value: registerUser.first_name,
        placeholder: "Please enter a first name.",
        events: {
            onChange: onUserChange,
        },
        errors,
    };

    const last_nameField = {
        id: "last_name",
        name: "last_name",
        value: registerUser.last_name,
        placeholder: "Please enter a last name.",
        events: {
            onChange: onUserChange,
        },
        errors,
    };

    const userNameField = {
        id: "username",
        name: "username",
        value: registerUser.username,
        placeholder: "Please enter a username name.",
        events: {
            onChange: onUserChange,
        },
        errors,
    };

    const emailField = {
        id: "email",
        name: "email",
        value: registerUser.email,
        placeholder: "Please enter a email.",
        events: {
            onChange: onUserChange,
        },
        errors,
    };

    const passwordField = {
        id: "password",
        name: "password",
        value: registerUser.password,
        type: "password",
        placeholder: "Please enter a password.",
        events: {
            onChange: onUserChange,
        },
        errors,
    };

    const confirm_passwordField = {
        id: "confirm_password",
        name: "confirm_password",
        value: registerUser.confirm_password,
        type: "password",
        placeholder: "Confirm Password.",
        events: {
            onChange: onUserChange,
        },
        errors,
    };

    return (
        <div className="register-container">
            <Card
                header={"User Registration"}
                footer={
                    <Button
                        label={"Register"}
                        type={"regular-md"}
                        classes={"light-grey"}
                        events={buttonEvents}
                    />
                }
            >
                <form className="register-form">
                    <TextInput fieldData={first_nameField} />
                    <TextInput fieldData={last_nameField} />
                    <TextInput fieldData={userNameField} />
                    <TextInput fieldData={emailField} />
                    <TextInput fieldData={passwordField} />
                    <TextInput fieldData={confirm_passwordField} />
                </form>
            </Card>
        </div>
    );
};

export default Register;
