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
}

const Button: React.FC<Props> = ({ label, classes, type, events }) => {
    return (
        <div
            className={`default-button ${classes} ${type}`}
            onClick={events?.onClick}
        >
            {label}
        </div>
    );
};

export default Button;
