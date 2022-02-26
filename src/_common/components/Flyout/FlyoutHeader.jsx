const FlyoutHeader = props => {
    const { useDefault = true, events, children } = props;
    const { handleFlyoutClose } = events;

    if (useDefault) {
        // Return text with props.children
        return (
            <div className="default-flyout-heading-section">
                <span className="flyout-heading">
                    {children ? children : ""}
                </span>
                <span className="close-button" onClick={handleFlyoutClose}>
                    X
                </span>
            </div>
        );
    }

    // Return html with props.children
    return (
        <div className="flyout-header-section">{children ? children : ""}</div>
    );
};

export default FlyoutHeader;
