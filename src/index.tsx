import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

ReactDOM.render(<App />, document.querySelector("#root"));

if (module && module.hot) {
    module.hot.accept();
}
