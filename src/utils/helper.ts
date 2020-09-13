const copyToClipboard = (value: string) => {
    const el = document.createElement("input");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    el.value = value;
    document.body.appendChild(el);
    el.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    document.body.removeChild(el); // 删除DOM
};

const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};

export { copyToClipboard, scrollToTop };
