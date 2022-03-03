import React from "react";
import "./style.scss";

interface Props {
    header: React.FC | string;
    children: React.ReactNode;
    footer: React.ReactNode | string;
}

const Card: React.FC<Props> = ({ header, children, footer }) => {
    return (
        <div className="default-card">
            <div className="card-header-container">
                <div className="card-header">{header}</div>
            </div>
            <div className="card-body-container">{children}</div>
            <div className="card-footer-container">{footer}</div>
        </div>
    );
};

export default Card;
