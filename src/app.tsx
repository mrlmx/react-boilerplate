import React from "react";
import Logo from "@/assets/logo.png";
import Logo2 from "assets/logo.png";

function App() {
    return (
        <div className="App">
            Hello World
            <br />
            <img src={Logo} style={{ width: "50px", margin: "50px" }}></img>
            <img src={Logo2} style={{ width: "50px", margin: "50px" }}></img>
            <textarea></textarea>
        </div>
    );
}

export default App;
