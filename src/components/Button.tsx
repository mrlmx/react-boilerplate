import React from "react";

interface Props {
    children?: React.ReactNode;
}

const Button = (props: Props) => {
    const { children } = props;
    return <button type="button">{children}</button>;
};

Button.defaultProps = {
    children: <></>,
};

export default Button;
