import { menu } from "./menu.js";
import { port } from "./port.js";
import { link } from "./link.js";
import { smooth } from "./smooth.js";
import { subnav } from "./subnav.js";
import { menuStory } from "./menuStory.js";


window.addEventListener("load", function () {
    smooth();
    link();
    menu();
    port();
    subnav();
    menuStory();
});