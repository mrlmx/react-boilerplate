import "./index.css";
import "./reset.less";

console.log("Hi");

const hi = document.createElement("h1");
hi.innerHTML = "Hi";

const wrapper = document.createElement("div");
wrapper.innerHTML = "wrapper";
wrapper.classList.add("wrapper");

document.getElementById("root").append(hi);

document.getElementById("root").append(wrapper);
