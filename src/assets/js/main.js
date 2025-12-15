import { menu } from "./menu.js";
import { intro } from "./intro.js"
import { port } from "./port.js";
import { link } from "./link.js";
import { smooth } from "./smooth.js";
import { subnav } from "./subnav.js";
import { menuStory } from "./menuStory.js";
import { footer } from "./footer.js"


window.addEventListener("load", function () {
    smooth();
    link();
    menu();
    port();
    subnav();
    menuStory();
    intro();
    footer();
});