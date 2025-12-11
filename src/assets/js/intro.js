const sections = document.querySelectorAll('.page');
const currentEl = document.querySelector('.side__nav .current');
const totalEl = document.querySelector('.side__nav .total');
const line = document.querySelector('.side__nav .line');

const totalCount = sections.length;
totalEl.textContent = String(totalCount).padStart(2, "0");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Number(entry.target.dataset.index);

                // 숫자 갱신
                currentEl.textContent = String(index).padStart(2, "0");

                // progress 계산 (0~100%)
                const progress = (index / totalCount) * 100;

                line.style.setProperty("--progress", `${progress}%`);
            }
        });
    },
    {
        threshold: 0.6, // 섹션 60% 보이면 해당 번호 적용
    }
);

sections.forEach(sec => observer.observe(sec));
