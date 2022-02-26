import { useEffect, useState } from "react";
import FlyoutHeader from "./FlyoutHeader";
import FlyoutContent from "./FlyoutContent";
import FlyoutFooter from "./FlyoutFooter";
import "./styles.css";

const Flyout = props => {
    const {
        direction,
        baseFlyoutClasses = "",
        headerContent,
        footerContent,
        bodyContent,
        width = "200px",
        useDefault = { heading: true, body: true, footer: true },
        isOpen = false,
        events,
    } = props;
    const flyoutDirection =
        direction === "right" ? { right: "0" } : { left: "0" };
    const { handleFlyoutClose } = events;

    const flyoutWidth = isOpen ? width : "0px";

    useEffect(() => {
        if (isOpen) {
            window.scrollTo(0, 0);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    return (
        <div
            className={`flyout ${baseFlyoutClasses} ${
                isOpen ? "show" : "hide"
            }`}
        >
            <button className="flyout-scram" onClick={handleFlyoutClose} />
            <div
                className="flyout-body"
                style={{ width: flyoutWidth, ...flyoutDirection }}
            >
                <FlyoutHeader useDefault={useDefault.heading} events={events}>
                    {headerContent}
                </FlyoutHeader>
                <FlyoutContent useDefault={useDefault.body}>
                    {bodyContent}
                </FlyoutContent>
                <FlyoutFooter useDefault={useDefault.footer}>
                    {footerContent}
                </FlyoutFooter>
            </div>
        </div>
    );
};

export default Flyout;
