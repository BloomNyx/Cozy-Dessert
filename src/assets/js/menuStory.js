import { gsap } from "gsap";
import Flip from "gsap/flip";

gsap.registerPlugin(Flip);

export function menuStory() {

    /* -------------------------
       1. 요소 선택
    ------------------------- */
    const categoryItems = document.querySelectorAll(".category li");
    const descs = document.querySelectorAll(".category li p");
    const container = document.querySelector(".menuStory__container");

    if (!container) return;

    /* -------------------------
       2. 카테고리 등장 애니메이션
    ------------------------- */
    gsap.from(categoryItems, {
        opacity: 0,
        y: 20,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out"
    });

    gsap.set(descs, { height: 0, opacity: 0, overflow: "hidden" });

    categoryItems.forEach((item) => {
        item.addEventListener("click", () => {

            categoryItems.forEach(li => li.classList.remove("active"));
            item.classList.add("active");

            categoryItems.forEach((other) => {
                const p = other.querySelector("p");
                if (other === item) {
                    gsap.to(p, { height: "auto", opacity: 1, duration: 0.35 });
                    gsap.to(other, { opacity: 1 });
                } else {
                    gsap.to(p, { height: 0, opacity: 0, duration: 0.25 });
                    gsap.to(other, { opacity: 0.35 });
                }
            });

            createMenuStorySection(item.dataset.category);
        });
    });

    /* ==================================================
       3. 슬라이더 생성
    ================================================== */
    function createMenuStorySection(category) {

        container.innerHTML = "";

        const imageData = {
            coffee: [
                { src: "assets/img/coffee1.jpg", name: "아이스 아메리카노" },
                { src: "assets/img/coffee2.jpg", name: "카페라떼" },
                { src: "assets/img/coffee4.jpg", name: "카푸치노" },
                { src: "assets/img/coffee5.jpg", name: "에스프레소" },
                { src: "assets/img/coffee6.jpg", name: "밀크티" },
                { src: "assets/img/coffee7.jpg", name: "카페모카" }
            ],
            dessert: [
                { src: "assets/img/des1.jpg", name: "바스크 치즈케이크" },
                { src: "assets/img/des2.jpg", name: "마카롱" },
                { src: "assets/img/des3.jpg", name: "카라멜 푸딩" },
                { src: "assets/img/des4.jpg", name: "까눌레" },
                { src: "assets/img/des5.jpg", name: "수플레" },
                { src: "assets/img/des6.jpg", name: "팬케이크" }
            ],
            deli: [
                { src: "assets/img/deli1.jpg", name: "햄버거" },
                { src: "assets/img/deli2.jpg", name: "샌드위치" },
                { src: "assets/img/deli3.jpg", name: "샐러드" },
                { src: "assets/img/deli4.jpg", name: "브런치" }
            ]
        };

        const list = imageData[category] || imageData.coffee;

        const html = `
            <div class="menuStory__main">
                <div class="mainImg">
                    <img id="mainImg" src="${list[0].src}" alt="menu" />
                </div>
                <div class="mainImg__caption">
                    <button class="prevBtn">←</button>
                    <span id="captionText">${list[0].name}</span>
                    <button class="nextBtn">→</button>
                </div>
            </div>

            <ul class="menuStory__thumbs">
                ${list
                    .map(
                        (item) =>
                            `<li><img src="${item.src}" data-name="${item.name}" /></li>`
                    )
                    .join("")}
            </ul>
        `;

        container.innerHTML = html;

        initSlideFunctions(
            list,
            container.querySelector("#mainImg"),
            container.querySelector("#captionText"),
            container.querySelector(".prevBtn"),
            container.querySelector(".nextBtn"),
            container.querySelector(".menuStory__thumbs")
        );
    }

    /* ==================================================
       4. 슬라이드 기능 (FLIP + 무한)
    ================================================== */
    function initSlideFunctions(data, mainImg, caption, prevBtn, nextBtn, thumbsList) {

        let currentIndex = 0;
        let isAnimating = false;

        function updateMain(direction) {
            const item = data[currentIndex];

            const outX = direction === "next" ? -150 : 150;
            const inX = -outX;

            gsap.timeline({
                onStart: () => (isAnimating = true),
                onComplete: () => (isAnimating = false)
            })
                .to(mainImg, {
                    x: outX,
                    scale: 0.7,
                    opacity: 0,
                    duration: 0.35
                })
                .add(() => {
                    mainImg.src = item.src;
                    caption.textContent = item.name;
                    gsap.set(mainImg, { x: inX, scale: 1.3 });
                })
                .to(mainImg, {
                    x: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 0.45,
                    ease: "power3.out"
                });
        }

        function handleNext() {
            if (isAnimating) return;

            const items = thumbsList.querySelectorAll("li");
            const state = Flip.getState(items);

            thumbsList.appendChild(items[0]);

            Flip.from(state, { duration: 0.5, ease: "power2.inOut" });

            currentIndex = (currentIndex + 1) % data.length;
            updateMain("next");
        }

        function handlePrev() {
            if (isAnimating) return;

            const items = thumbsList.querySelectorAll("li");
            const state = Flip.getState(items);

            thumbsList.prepend(items[items.length - 1]);

            Flip.from(state, { duration: 0.5, ease: "power2.inOut" });

            currentIndex = (currentIndex - 1 + data.length) % data.length;
            updateMain("prev");
        }

        thumbsList.addEventListener("click", (e) => {
            const li = e.target.closest("li");
            if (!li || isAnimating) return;

            const items = [...thumbsList.children];
            currentIndex = items.indexOf(li);

            updateMain("next");
        });

        prevBtn.addEventListener("click", handlePrev);
        nextBtn.addEventListener("click", handleNext);
    }
}
