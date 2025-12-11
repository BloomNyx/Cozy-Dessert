import { menu } from "./menu.js";
import { port } from "./port.js";
import { link } from "./link.js";
import { smooth } from "./smooth.js";
import { sideNav } from "./sideNav.jsx";

window.addEventListener("load", function () {
    smooth();
    link();
    menu();
    port();
    sideNav();
});