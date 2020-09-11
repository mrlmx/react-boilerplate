import React from "react";
import Logo from "@/assets/logo.png";
import Logo2 from "assets/logo.png";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";

function App() {
    return (
        <div className="App">
            Hello World
            <br />
            <img src={Logo} style={{ width: "50px", margin: "50px" }}></img>
            <img src={Logo2} style={{ width: "50px", margin: "50px" }}></img>
            <Textarea />
            <br />
            <Button>按钮</Button>
        </div>
    );
}

export default App;
