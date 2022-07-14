import { NextPage } from "next";

const Loading: NextPage = () => {
    return (
        <>
            <img src="loading.gif" />
            <div>AI가 분석 중입니다...</div>
            <style jsx>{`
                img {
                    display: block;
                    width: 2rem;
                }
            `}</style>
        </>
    );
};

export default Loading;
