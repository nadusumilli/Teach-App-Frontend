import React, { useEffect } from "react";
import { titleCase } from "../../../utils/stringUtils";
import "./styles.scss";

type FieldDataType = {
    id: string;
    name: string;
    value: string;
    disabled?: boolean;
    placeholder: string;
    icon?: { [child: string]: any };
    label?: string;
    required?: boolean;
    type?: string;
    events?: { [child: string]: (() => void) | ((value: any) => void) };
    rows?: number | null;
    classes?: { [child: string]: string };
    errors?: { [child: string]: string };
};

interface Props {
    fieldData: FieldDataType;
}

const TextInput: React.FC<Props> = ({ fieldData }) => {
    const {
        id,
        name,
        value,
        disabled = false,
        placeholder,
        icon = {},
        label,
        required = false,
        type = "text",
        events = {},
        rows = null,
        classes = {},
        errors = {},
    } = fieldData;
    const {
        iconEnabled = false,
        iconAlt = "",
        iconImage = "",
        iconPosition = "right",
    } = icon;
    const errorInfo = errors[name];

    const { onChange, validateField, onIconClick, ...restEvents } = events;
    const {
        sectionClass = "",
        fieldClass = "",
        errorClass = "",
        labelClass = "",
        iconClass = "",
    } = classes;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof onChange === "function") {
            onChange({
                currentTarget: {
                    name: event.target.name,
                    value: event.target.value,
                },
            });
        }
    };

    useEffect(() => {
        if (value !== undefined && typeof validateField == "function") {
            validateField(value);
        }
    }, [value]);

    const fieldProps: { [child: string]: any } = {
        ...restEvents,
        id,
        name,
        type,
        value,
        placeholder: titleCase(placeholder),
        required,
        disabled,
        className: `default-text-input-field ${fieldClass} ${
            disabled && "disabled-input"
        } ${errorInfo && "default-input-error"} ${
            iconPosition === "left" ? "placeholder-right" : "placeholder-left"
        }`,
        onChange: handleChange,
    };

    if (type === "textarea") {
        delete fieldProps.type;
        delete fieldProps.value;

        fieldProps.defaultValue = value;
        fieldProps.rows = rows || 2;
    }

    let iconStyleClass =
        iconPosition === "left"
            ? iconClass + " icon-left"
            : iconClass + " icon-right";

    return value !== undefined ? (
        <div className={`default-text-input-section ${sectionClass}`}>
            {label && (
                <span className={`default-text-input-label ${labelClass}`}>
                    {label}
                </span>
            )}
            {type === "textarea" ? (
                <textarea {...fieldProps} />
            ) : (
                <input {...fieldProps} />
            )}
            {errorInfo && (
                <span className={`default-text-input-error ${errorClass}`}>
                    {errorInfo}
                </span>
            )}
            {iconEnabled && (
                <span
                    className={`default-text-input-icon ${iconStyleClass}`}
                    onClick={onIconClick}
                    role="img"
                    aria-label={`${name}-icon`}
                >
                    <img alt={iconAlt} src={iconImage} />
                </span>
            )}
        </div>
    ) : null;
};

export default TextInput;
