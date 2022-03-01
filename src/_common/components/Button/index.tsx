import React from "react";
import "./style.scss";

const typeList = ["circle", "regular", "square"];
interface Props {
    label: string;
    classes: string;
    type: typeof typeList[number];
    events?: {
        [child: string]: (
            value: React.MouseEvent<HTMLElement>
        ) => void | ((value: any) => void) | (() => void);
    };
    disabled?: boolean;
}

const Button: React.FC<Props> = ({
    label,
    classes,
    type,
    events,
    disabled = false,
}) => {
    return (
        <div
            className={`default-button ${classes} ${type}`}
            onClick={!disabled ? events?.onClick : undefined}
        >
            {label}
        </div>
    );
};

export default Button;
