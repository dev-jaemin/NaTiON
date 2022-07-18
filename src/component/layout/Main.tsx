import { useEffect, useRef } from "react";
import { NextPage } from "next";
import { useScroll } from "../../core/hook/useScroll";
import GridWithImage from "../common/GridWithImage";
import TestGrid from "../common/TestGrid";

const Main: NextPage = () => {
    const scroll = useScroll();
    const firstSectionRef = useRef<HTMLDivElement>();
    const secondSectionRef = useRef<HTMLDivElement>();
    const h3Refs = [useRef<HTMLDivElement>(), useRef<HTMLDivElement>(), useRef<HTMLDivElement>(), useRef<HTMLDivElement>()];
    const downArrowRef = useRef<HTMLDivElement>();

    const text = [
        <div>
            <h1>Google의 *AI가</h1>
            <h1>당신의 스타일을</h1>
            <h1>분석해 드립니다.</h1>
            <div style={{ color: "lightgrey", opacity: "0.5" }}>* Google Teachable Machine</div>
        </div>,
        <div>
            <h3 ref={h3Refs[0] as React.RefObject<HTMLDivElement>}>스타일을 찾기위해 노력하는 당신을 위해</h3>
            <h3 ref={h3Refs[1] as React.RefObject<HTMLDivElement>}>"우리팀 이름"의 AI가 도와드리겠습니다.</h3>
            <h3 ref={h3Refs[2] as React.RefObject<HTMLDivElement>}>멋진말멋진말</h3>
            <h3 ref={h3Refs[3] as React.RefObject<HTMLDivElement>}>아몰라 </h3>
        </div>,
    ];

    useEffect(() => {
        // first section animation
        firstSectionRef.current && (firstSectionRef.current.style.opacity = String(-scroll.scrollY / 1000 + 1));

        // second section animation
        if (scroll.scrollY < screen.availHeight * 3 && scroll.scrollY > screen.availHeight) {
            secondSectionRef.current && (secondSectionRef.current.style.opacity = String(scroll.scrollY / 1000));
        } else {
            secondSectionRef.current && (secondSectionRef.current.style.opacity = String(-scroll.scrollY / 1000));
        }

        // second h3 animation
        h3Refs.forEach((ref, index) => {
            ref.current && (ref.current.style.opacity = String(scroll.scrollY / screen.height - 1 - 0.5 * index));
        });

        // down-arrow hide
        if (scroll.scrollY > screen.availHeight * 4) {
            downArrowRef.current && (downArrowRef.current.style.opacity = "0");
        } else {
            downArrowRef.current && (downArrowRef.current.style.opacity = "1");
        }
    }, [scroll.scrollY]);

    return (
        <div>
            <div className="first_section" ref={firstSectionRef as React.RefObject<HTMLDivElement>}>
                <GridWithImage imgUrl="/image/ai_robot3.png" inner={text[0]} />
            </div>
            <div className="second_section" ref={secondSectionRef as React.RefObject<HTMLDivElement>}>
                <GridWithImage imgUrl="/image/ai_robot4.png" inner={text[1]} />
            </div>
            <div style={{ height: "600vh" }}></div>
            <TestGrid />
            <div ref={downArrowRef as React.RefObject<HTMLDivElement>}>
                <img className="fixed_arrow" src="/image/down_arrow.gif" alt="장식용 이미지" />
            </div>

            <style jsx>{`
                @media (min-width: 768px) {
                    .head_text {
                        font-size: 30px;
                    }
                }
                .first_section {
                    position: fixed;
                    padding-top: 1rem;
                    width: 100%;
                    opacity: 0;
                    transition: opacity 2s ease, transform 1s ease;
                    transform: scale(${Math.min(+scroll.scrollY / 1000 + 1, 2)});
                    z-index: 10;
                    background: linear-gradient(45deg, #2b39a0, #000000);
                }
                .second_section {
                    position: fixed;
                    padding-top: 1rem;
                    width: 100%;
                    top: 0px;
                    background: linear-gradient(45deg, #000000, #2b39a0);
                    transition: opacity 2s ease, transform 1s ease;
                    opacity: ${scroll.scrollY / 1000 - 0.5};
                }
                .fixed_arrow {
                    position: fixed;
                    top: 90%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 10;
                    opacity: 0.7;
                    width: 100px;
                }
                @media (min-width: 768px) {
                    .first_section {
                        padding-top: 5rem;
                    }
                    .second_section {
                        padding-top: 5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Main;
