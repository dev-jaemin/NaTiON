import { NextPage } from "next";
import { useRouter } from "next/router";

const Main: NextPage = () => {
    const router = useRouter();

    const handleCTA = (e: any) => {
        router.push("/test");
    };

    return (
        <div>
            <div className="image_section">
                <h2 className="head_text">나는 어느 나라에서 먹힐까?</h2>
                <div style={{ height: "50px" }}></div>
                <div className="main_cta" onClick={handleCTA}>
                    확인하러 가기
                </div>
            </div>
            <style jsx>{`
                .image_section {
                    padding: 20px;
                    text-align: center;

                    color: #ffffff;
                    background-color: #1c1c1c;
                }
                .main_cta {
                    display: inline-block;
                    padding: 10px;
                    border-radius: 3px;
                    background: #ffffff;
                    color: #1c1c1c;
                    font-weight: 700;
                }
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
