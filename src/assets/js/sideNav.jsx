import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SideNav() {
    const currentRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const sections = document.querySelectorAll("section");
        const total = sections.length;

        function updateNumber(idx) {
            const num = (idx + 1).toString().padStart(2, "0");
            currentRef.current.textContent = num;
        }

        function updateLine(idx) {
            const percent = Math.max(10, ((idx + 1) / total) * 100);

            gsap.to(lineRef.current, {
                "--progress": percent + "%",
                duration: 0.6,
                ease: "power2.out"
            });
        }

        sections.forEach((sec, index) => {
            ScrollTrigger.create({
                trigger: sec,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    updateNumber(index);
                    updateLine(index);
                },
                onEnterBack: () => {
                    updateNumber(index);
                    updateLine(index);
                }
            });
        });

        // 초기값 설정
        updateNumber(0);
        updateLine(0);

    }, []);

    return (
        <div className="side__nav">
            <span className="current" ref={currentRef}>01</span>
            <div className="line" ref={lineRef}></div>
            <span className="total">06</span>
        </div>
    );
}
