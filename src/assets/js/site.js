import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function aboutAnimation() {

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about",
            start: "top 70%",
        }
    });

    tl.from(".about__title", {
        y: 40,
        opacity: 0,
        duration: 0.6
    })
    .from(".about__desc", {
        y: 30,
        opacity: 0,
        duration: 0.6
    }, "-=0.3")
    .from(".about__item", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2
    }, "-=0.2");
}
