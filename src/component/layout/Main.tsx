import { useEffect, useRef } from "react";
import { NextPage } from "next";
import { useScroll } from "../../core/hook/useScroll";
import GridWithImage from "../common/GridWithImage";
import NationTest from "../common/NationTest";

const Main: NextPage = () => {
    const scroll = useScroll();
    const firstSectionRef = useRef<HTMLDivElement>();
    const secondSectionRef = useRef<HTMLDivElement>();
    const h3Refs = [useRef<HTMLDivElement>(), useRef<HTMLDivElement>(), useRef<HTMLDivElement>(), useRef<HTMLDivElement>()];

    const text = [
        <div>
            <h1>Google의 AI가</h1>
            <h1>당신의 스타일을</h1>
            <h1>분석해 드립니다.</h1>
        </div>,
        <div>
            <h3 ref={h3Refs[0]}>AI 최고</h3>
            <h3 ref={h3Refs[1]}>어쩌고 저쩌고</h3>
            <h3 ref={h3Refs[2]}>이러쿵 저러쿵</h3>
            <h3 ref={h3Refs[3]}>아몰라 </h3>
        </div>,
    ];

    useEffect(() => {
        // first section animation
        firstSectionRef.current.style.opacity = -scroll.scrollY / 1000 + 1;

        // second section animation
        if (scroll.scrollY < screen.availHeight * 2 && scroll.scrollY > screen.availHeight) {
            secondSectionRef.current.style.opacity = scroll.scrollY / 1000;
        } else {
            secondSectionRef.current.style.opacity = -scroll.scrollY / 1000;
        }

        // second h3 animation
        h3Refs.forEach((ref, index) => {
            ref.current.style.opacity = scroll.scrollY / screen.height - 1.2 - 0.2 * index;
        });
    }, [scroll.scrollY]);

    return (
        <div>
            <div className="first_section" ref={firstSectionRef}>
                <GridWithImage imgUrl="/image/ai_robot.jpg" inner={text[0]} />
            </div>
            <div className="second_section" ref={secondSectionRef}>
                <GridWithImage imgUrl="/image/blackbackground_small.jpg" inner={text[1]} />
            </div>
            <div style={{ height: "500vh" }}></div>

            <NationTest />
            <style jsx>{`
                @media (min-width: 768px) {
                    .head_text {
                        font-size: 30px;
                    }
                }
                .first_section {
                    position: fixed;
                    opacity: 0;
                    transition: opacity 2s ease, transform 1s ease;
                    transform: scale(${Math.min(+scroll.scrollY / 1000 + 1, 2)});
                    z-index: 10;
                }
                .second_section {
                    position: fixed;
                    top: 0px;
                    transition: opacity 2s ease, transform 1s ease;
                    opacity: ${scroll.scrollY / 1000 - 1};
                }
            `}</style>
        </div>
    );
};

export default Main;
