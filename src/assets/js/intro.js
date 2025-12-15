import { gsap } from "gsap";

export function intro() {
    const intro = document.querySelector(".intro");
    const inner = document.querySelector(".intro__inner");

    let images = inner.querySelectorAll("img");
    let slideWidth = intro.offsetWidth;
    let total = images.length;

    let index = 0;
    let isAnimating = false;

    /* 🔥 첫 이미지 clone */
    const clone = images[0].cloneNode(true);
    inner.appendChild(clone);

    /* 다시 선택 */
    images = inner.querySelectorAll("img");

    /* 🔥 inner width를 정확히 고정 */
    function setLayout() {
        slideWidth = intro.offsetWidth;
        inner.style.width = `${slideWidth * images.length}px`;

        images.forEach(img => {
            img.style.width = `${slideWidth}px`;
        });

        gsap.set(inner, { x: -slideWidth * index });
    }

    setLayout();

    function slideNext() {
        if (isAnimating) return;
        isAnimating = true;

        index++;

        gsap.to(inner, {
            x: -slideWidth * index,
            duration: 1.1,
            ease: "power3.inOut",
            onComplete: () => {
                if (index === total) {
                    index = 0;
                    gsap.set(inner, { x: 0 });
                }
                isAnimating = false;
            }
        });
    }

    const timer = setInterval(slideNext, 4000);

    /* 🔥 리사이즈 대응 (필수) */
    window.addEventListener("resize", () => {
        setLayout();
    });
}
