import "./index.css";
import "./reset.less";

console.log("Hi");

const hi = document.createElement("h1");
hi.innerHTML = "Hi";

document.getElementById("root").append(hi);
