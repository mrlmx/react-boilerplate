import React from "react";
import Logo from "@/assets/logo.png";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import GitHubRequest from "@/components/GitHubRequest";

function App() {
    return (
        <div className="App">
            <h1>基础输出</h1>
            Hello World
            <img
                src={Logo}
                style={{ width: "50px", margin: "30px 0", display: "block" }}
            ></img>
            <h1>展示组件</h1>
            <Textarea />
            <br />
            <Button>按钮</Button>
            <h1>测试请求</h1>
            <GitHubRequest />
        </div>
    );
}

export default App;
