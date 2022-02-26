const FlyoutFooter = props => {
    const { useDefault = true, children } = props;
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
