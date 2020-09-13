import React, { FC, useEffect, useState } from "react";
import axios from "axios";

interface IRepoInfo {
    name: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
}

const GitHubRequest: FC = () => {
    const [repoName, setRepoName] = useState("mrlmx/react-boilerplate");
    const [repoInfo, setRepoInfo] = useState<Partial<IRepoInfo>>({});
    const handleSearch = () => {
        axios.get("/api/repos/" + repoName).then(({ data }) => {
            setRepoInfo(data);
            console.log("production mode will remove this console");
        });
    };
    useEffect(() => {
        handleSearch();
    }, []);
    return (
        <div>
            <div>
                <input
                    placeholder="请输入 GitHub 项目名称"
                    value={repoName}
                    onChange={(e) => {
                        setRepoName(e.target.value);
                    }}
                />
                <button onClick={handleSearch}>搜索</button>
                <br />
                <p>使用如下格式：{`{user}/{reponame}`}</p>
            </div>
            <h2>react-boilerplate</h2>
            <ul>
                <li>Start：{repoInfo.stargazers_count}</li>
                <li>Watchers：{repoInfo.watchers_count}</li>
                <li>Forks：{repoInfo.forks_count}</li>
            </ul>
        </div>
    );
};

export default GitHubRequest;
