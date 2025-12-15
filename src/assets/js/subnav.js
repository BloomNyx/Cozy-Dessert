// subnav.js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function subnav() {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll("section");
    const currentNum = document.querySelector(".side_nav .current");
    const progressBar = document.querySelector(".side_nav .line span");
    const totalNum = document.querySelector(".side_nav .total");

    /* ===============================
       초기 설정
    =============================== */
    totalNum.textContent = sections.length.toString().padStart(2, "0");

    /* ===============================
       🔹 모바일 / PC 분기
    =============================== */
    ScrollTrigger.matchMedia({

        /* ===== PC / 태블릿 (스냅 ON) ===== */
        "(hover: hover) and (pointer: fine)": function () {

            ScrollTrigger.create({
                snap: {
                    snapTo: (progress) => {
                        const maxScroll =
                            document.documentElement.scrollHeight -
                            window.innerHeight;

                        const positions = Array.from(sections).map(
                            (section) => section.offsetTop / maxScroll
                        );

                        return gsap.utils.snap(positions, progress);
                    },
                    duration: 0.8,
                    ease: "power3.out",
                },
            });
        },

        /* ===== 모바일 (스냅 OFF) ===== */
        "(pointer: coarse)": function () {
            // ❗ 스냅 생성 안 함 → 자연 스크롤
        },
    });

    /* ===============================
       🔹 사이드 네비 업데이트
    =============================== */
    sections.forEach((section, index) => {
        const pageNum = (index + 1).toString().padStart(2, "0");

        ScrollTrigger.create({
            trigger: section,
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

    /* ===============================
       🔹 섹션 등장 애니메이션
       (모바일에서도 유지)
    =============================== */
    sections.forEach((section) => {
        const targets = section.querySelectorAll(
            "h2, h3, p, li, img, .menuStory__container"
        );

        if (!targets.length) return;

        gsap.fromTo(
            targets,
            { y: 40, autoAlpha: 0 },
            {
                y: 0,
                autoAlpha: 1,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.08,
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    });
}
