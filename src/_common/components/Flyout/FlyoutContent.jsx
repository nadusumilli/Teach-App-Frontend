import React from "react";

const FlyoutContent = ({ children }) => {
    return (
        <div className="flyout-content-section">{children ? children : ""}</div>
    );
};

export default FlyoutContent;
