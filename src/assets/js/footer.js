import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function footer() {
    const footerEl = document.querySelector(".footer");
    if (!footerEl) return;

    /* -------------------------
       연도 자동
    ------------------------- */
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* -------------------------
       모바일 여부 체크
       (768px 이하 → 애니메이션 OFF)
    ------------------------- */
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    /* ==================================================
       DESKTOP ONLY : Scroll Animation
    ================================================== */
    if (!isMobile) {
        // footer 컬럼 등장
        gsap.from(".footer__col", {
            scrollTrigger: {
                trigger: footerEl,
                start: "top 80%",
            },
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
        });

        // footer bottom
        gsap.from(".footer__bottom", {
            scrollTrigger: {
                trigger: footerEl,
                start: "top 75%",
            },
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2,
        });
    }

    /* ==================================================
       SNS HOVER : GSAP Bounce
       (모바일 제외)
    ================================================== */
    if (!isMobile) {
        const snsLinks = document.querySelectorAll(".footer__sns a");

        snsLinks.forEach((icon) => {
            icon.addEventListener("mouseenter", () => {
                gsap.to(icon, {
                    scale: 1.15,
                    duration: 0.35,
                    ease: "back.out(2)",
                });
            });

            icon.addEventListener("mouseleave", () => {
                gsap.to(icon, {
                    scale: 1,
                    duration: 0.25,
                    ease: "power2.out",
                });
            });
        });
    }
}
