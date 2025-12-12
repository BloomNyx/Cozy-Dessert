// subnav.js

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function subnav() {

    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll("section");
    const currentNum = document.querySelector(".side_nav .current");
    const progressBar = document.querySelector(".side_nav .line span");
    const totalNum = document.querySelector(".side_nav .total");

    totalNum.textContent = sections.length.toString().padStart(2, "0");

    sections.forEach((sec, index) => {
        const pageNum = (index + 1).toString().padStart(2, "0");

        ScrollTrigger.create({
            trigger: sec,
            start: "top center",
            end: "bottom center",
            onEnter: () => updateNav(pageNum, index),
            onEnterBack: () => updateNav(pageNum, index),
        });
    });

    function updateNav(num, index) {
        currentNum.textContent = num;

        const percent = ((index + 1) / sections.length) * 100;

        gsap.to(progressBar, {
            height: percent + "%",
            duration: 0.4,
            ease: "power2.out",
        });
    }
}