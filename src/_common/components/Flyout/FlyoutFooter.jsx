import React from "react";

const FlyoutFooter = ({ useDefault = true, children }) => {
    if (useDefault) {
        return (
            <div className="default-flyout-footer-section">
                {children ? children : ""}
            </div>
        );
    }
    return <>{children ? children : ""}</>;
};

export default FlyoutFooter;
