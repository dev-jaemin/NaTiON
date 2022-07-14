import { NextPage } from "next";
import GridWithImage from "../common/GridWithImage";
import NationTest from "../common/NationTest";

const text = [
    <h1>
        Google의 AI가 <br />
        당신의 스타일을 <br />
        분석해 드립니다.
    </h1>,
    <h3>
        AI는 세상을 바꾸는 <br />
        어쩌고저쩌고입니다 <br />
        어쩌고저쩌고 하고 <br />
        암튼 짱 좋음 멋짐
    </h3>,
];

const Main: NextPage = () => {
    return (
        <div>
            <GridWithImage imgUrl="/image/ai_robot.jpg" inner={text[0]} />
            <GridWithImage imgUrl="/image/blackbackground_small.jpg" inner={text[1]} />
            <NationTest />
            <style jsx>{`
                @media (min-width: 768px) {
                    .head_text {
                        font-size: 30px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Main;
