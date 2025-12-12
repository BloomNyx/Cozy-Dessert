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

            // 아코디언
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

            // 카테고리별 슬라이드 생성
            const categoryName = item.dataset.category;
            createMenuStorySection(categoryName);
        });
    });


    /* ==========================================================
       🔥 새로운 슬라이더 DOM 생성
    ========================================================== */
    function createMenuStorySection(category) {

        // 기존 요소 제거
        container.innerHTML = "";

        // 카테고리별 데이터
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
                { src: "assets/img/des1.jpg", name: "초코 케이크" },
                { src: "assets/img/des2.jpg", name: "오레오 치즈케이크" },
                { src: "assets/img/des3.jpg", name: "카라멜 푸딩" },
                { src: "assets/img/coffee5.jpg", name: "에스프레소" },
                { src: "assets/img/coffee5.jpg", name: "에스프레소" },
                { src: "assets/img/coffee5.jpg", name: "에스프레소" }
            ],

            deli: [
                { src: "assets/img/coffee5.jpg", name: "에스프레소" },
                { src: "assets/img/coffee5.jpg", name: "에스프레소" },
                { src: "assets/img/coffee5.jpg", name: "에스프레소" },
                { src: "assets/img/coffee5.jpg", name: "에스프레소" },
                { src: "assets/img/coffee5.jpg", name: "에스프레소" },
                { src: "assets/img/coffee5.jpg", name: "에스프레소" }
            ]
        };

        const list = imageData[category] || imageData.coffee;

        // 메인 1개, 썸네일 나머지
        const main = list[0];
        const thumbs = list.slice(1);

        /* -------------------------
           📌 새로운 DOM 추가
        ------------------------- */
        const html = `
            <div class="menuStory__main">
                <div class="mainImg">
                    <img id="mainImg" src="${main.src}" alt="menu" />
                </div>
                <div class="mainImg__caption">
                    <button class="prevBtn">←</button>
                    <span id="captionText">${main.name}</span>
                    <button class="nextBtn">→</button>
                </div>
            </div>

            <ul class="menuStory__thumbs">
                ${thumbs
                    .map(
                        (t) =>
                            `<li><img src="${t.src}" data-name="${t.name}" /></li>`
                    )
                    .join("")}
            </ul>
        `;

        container.innerHTML = html;

        // DOM 다시 선택
        const mainImg = container.querySelector("#mainImg");
        const caption = container.querySelector("#captionText");
        const prevBtn = container.querySelector(".prevBtn");
        const nextBtn = container.querySelector(".nextBtn");
        const thumbsList = container.querySelector(".menuStory__thumbs");

        initSlideFunctions(mainImg, caption, prevBtn, nextBtn, thumbsList);
    }


    /* ==========================================================
       🔥 슬라이드 기능 (메인 이미지 + FLIP)
    ========================================================== */
    function initSlideFunctions(mainImg, caption, prevBtn, nextBtn, thumbsList) {

        let isAnimating = false;

        /* 메인 이미지 변경 애니메이션 */
        function updateMainImage(newSrc, newName, direction) {

            const tl = gsap.timeline({
                onStart: () => (isAnimating = true),
                onComplete: () => (isAnimating = false)
            });

            const outX = direction === "next" ? -150 : 150;
            const inX = -outX;

            // 기존 이미지 나가기
            tl.to(mainImg, {
                x: outX,
                scale: 0.7,
                opacity: 0,
                duration: 0.35
            });

            // 이미지 교체
            tl.add(() => {
                mainImg.src = newSrc;
                caption.textContent = newName;
                gsap.set(mainImg, { x: inX, scale: 1.3 });
            });

            // 새 이미지 들어오기 (반대편에서 커지면서)
            tl.to(mainImg, {
                x: 0,
                scale: 1,
                opacity: 1,
                duration: 0.45,
                ease: "power3.out"
            });
        }

        /* NEXT 버튼 */
        function handleNext() {
            if (isAnimating) return;

            const items = thumbsList.querySelectorAll("li");
            const state = Flip.getState(items);

            thumbsList.appendChild(items[0]); // 첫 번째 → 뒤로 이동

            Flip.from(state, { duration: 0.5, ease: "power2.inOut" });

            const newImg = thumbsList.querySelector("li img");
            updateMainImage(newImg.src, newImg.dataset.name, "next");
        }

        /* PREV 버튼 */
        function handlePrev() {
            if (isAnimating) return;

            const items = thumbsList.querySelectorAll("li");
            const state = Flip.getState(items);

            thumbsList.prepend(items[items.length - 1]); // 마지막 → 앞으로 이동

            Flip.from(state, { duration: 0.5, ease: "power2.inOut" });

            const newImg = thumbsList.querySelector("li img");
            updateMainImage(newImg.src, newImg.dataset.name, "prev");
        }

        /* 썸네일 클릭 */
        thumbsList.addEventListener("click", (e) => {
            const li = e.target.closest("li");
            if (!li || isAnimating) return;

            const img = li.querySelector("img");
            updateMainImage(img.src, img.dataset.name, "next");
        });

        prevBtn.addEventListener("click", handlePrev);
        nextBtn.addEventListener("click", handleNext);
    }
}
