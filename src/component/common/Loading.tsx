import { NextPage } from "next";

const Loading: NextPage = () => {
    return (
        <div className="loading_wrapper">
            <img src="/image/ai_robot5.png" alt="사이버네틱 이미지" width="300px" />
            <div>AI가 사용자의 사진을 분석 중입니다...</div>
            <img src="/image/loading.gif" alt="로딩" width="100px" />

            <style jsx>{`
                .loading_wrapper {
                    width: 100vw;
                    height: 100vh;
                    color: #ffffff;
                    display: table-cell;
                    vertical-align: middle;
                }
            `}</style>
        </div>
    );
};

export default Loading;
