import React from "react";
import Logo from "@/assets/logo.png";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import GitHubRequest from "@/components/GitHubRequest";
// test Tree-Sharking
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { copyToClipboard, scrollToTop } from "@/utils/helper";

function App() {
    return (
        <div>
            <h1>基础输出</h1>
            <div className="wrapper">
                Hello World
                <img
                    alt="logo"
                    src={Logo}
                    style={{
                        width: "50px",
                        margin: "30px 0",
                        display: "block",
                    }}
                />
            </div>
            <h1>展示组件</h1>
            <div className="wrapper">
                <Textarea />
                <Button>按钮</Button>
            </div>
            <h1>测试请求</h1>
            <div className="wrapper">
                <GitHubRequest />
            </div>
            <h1>工具函数</h1>
            <div className="wrapper">
                <button
                    type="button"
                    onClick={() => {
                        copyToClipboard("复制成功");
                    }}
                >
                    复制到剪切板
                </button>
            </div>
        </div>
    );
}

export default App;
