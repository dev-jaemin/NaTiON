import { Grid } from "@mui/material";
import { useEffect } from "react";

type ResultProps = {
    resultData: {
        class: string;
        content: string;
        gender: string;
    };
    name: string;
    title: string;
    subtitle: string;
    imgUrl: string;
    setLoadComplete: (arg0: boolean) => void;
};

declare global {
    interface Window {
        Kakao: any;
    }
}

const Result = (props: ResultProps) => {
    const koreanGender = props.resultData.gender === "man" ? "남자" : "여자";

    let isValidFace = props.resultData.content !== "No face";
    const parsedTitle = isValidFace ? `${props.subtitle} : ${props.resultData.class}` : "";
    const content = isValidFace ? props.resultData.content : "얼굴 인식에 실패했습니다. 전체 얼굴이 나온 사진으로 다시 시도 바랍니다.";

    const intents = {
        android: "com.instagram.share.ADD_TO_STORY",
        ios: "instagram-stories://share?source_application=com.my.app",
        other: "https://www.instagram.com/",
        pc: "https://www.instagram.com/",
    };

    const handleRetry = () => {
        props.setLoadComplete(false);
    };

    // 모바일 기기인지 여부, 만약 모바일이라면 안드로이드인지 애플인지도 파악
    const isMobile = () => {
        let mobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase());

        if (mobile) {
            let userAgent = navigator.userAgent.toLowerCase();

            if (userAgent.search("android") > -1) {
                return "android";
            } else if (userAgent.search("iphone") > -1 || userAgent.search("ipod") > -1 || userAgent.search("ipad") > -1) {
                return "ios";
            } else {
                return "other";
            }
        }

        return "pc";
    };

    const KakaoShare = () => {
        if (typeof window !== undefined) {
            if (window.Kakao) {
                if (!window.Kakao.isInitialized()) {
                    window.Kakao.init("ac952d15a9e51e14eab8bd573d48cfc9");
                }

                window.Kakao.Link.sendCustom({
                    templateId: 79864,
                });
            }
        }
    };

    const InstaShare = () => {
        const os = isMobile();

        window.location.href = intents[os];

        //ios는 앱 설치가 되어있지 않을 시 자동으로 스토어로 보내는 기능이 없으므로, 스토어로 보냄.
        if (os === "ios") {
            setTimeout(() => {
                window.open("https://itunes.apple.com/kr/app/instagram/id389801252?mt=8");
            }, 1500);
        } else if (os === "other") {
            setTimeout(() => {
                window.alert("지원하지 않는 단말입니다.");
            }, 1500);
        }
    };

    const FacebookShare = () => {
        const sendUrl = "192.249.19.184:443";
        window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
    };

    const TwitterShare = () => {
        const sendText = "요즘 핫한 AI 스타일링! anAlyst에게 스타일링 추천 받으세요!";
        const sendUrl = "192.249.19.184:443";
        window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="result_wrapper">
            <h1>{props.title}</h1>
            <div>{koreanGender} 편</div>
            <div className="result_section">
                <h3>결과</h3>
                <img src={props.imgUrl} alt="사진" />
                <div></div>
                <h2>{parsedTitle}</h2>
                <p className="content_section">{content}</p>
                <div></div>
                <div className="retry_button" onClick={handleRetry}>
                    다시 하기
                </div>
            </div>
            <div className="share_section">
                <h3>친구와 함께 즐겨보세요!</h3>
                <Grid container spacing={0} style={{ justifyContent: "space-evenly" }}>
                    <Grid sm={6} md={2}>
                        <img src="/image/kakaotalk.png" alt="kakaotalk" onClick={KakaoShare} />
                    </Grid>
                    <Grid sm={6} md={2}>
                        <img src="/image/instagram.png" alt="instagram" onClick={InstaShare} />
                    </Grid>
                    <Grid sm={6} md={2}>
                        <img src="/image/facebook.png" alt="facebook" onClick={FacebookShare} />
                    </Grid>
                    <Grid sm={6} md={2}>
                        <img src="/image/twitter.png" alt="twitter" onClick={TwitterShare} width="48px" />
                    </Grid>
                </Grid>
            </div>
            <style jsx>{`
                .result_wrapper {
                    padding: 1rem;
                    color: #ffffff;
                }
                @media (min-width: 768px) {
                    .share_section {
                        margin: 3rem 1rem;
                        padding: 10px 50px;
                    }
                }
                .retry_button {
                    display: inline-block;
                    padding: 10px;
                    width: 10rem;
                    background-color: #ffffff;
                    color: #000000;
                    font-weight: 700;
                    border-radius: 5px;
                }
                .result_section {
                    overflow: hidden;
                    margin-bottom: 5rem;
                }
                .content_section {
                    text-align: center;
                    display: inline-block;
                    max-width: 500px;
                    margin-bottom: 3rem;
                    border: 1px solid #ffffff;
                    border-radius: 5px;
                    padding: 1rem;
                    1color: #000000;
                    1background-color: rgba(255, 255, 255, 0.7);
                }
            `}</style>
        </div>
    );
};

export default Result;
