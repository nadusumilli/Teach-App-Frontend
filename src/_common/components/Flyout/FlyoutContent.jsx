const FlyoutContent = props => {
    const { children } = props;
    return (
        <div className="flyout-content-section">{children ? children : ""}</div>
    );
};

export default FlyoutContent;
