import { Grid } from "@mui/material";
import { useEffect, useRef } from "react";

type ResultProps = {
    resultData: {
        class: string;
        content: string;
        gender: string;
        img: string;
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
    const wrapper = useRef<HTMLDivElement>();
    const koreanGender = props.resultData.gender === "man" ? "남자" : "여자";

    let isValidFace = props.resultData.content !== "No face";
    const parsedClass = isValidFace ? props.resultData.class : "";
    const content = isValidFace ? props.resultData.content : "얼굴 인식에 실패했습니다. 전체 얼굴이 나온 사진으로 다시 시도 바랍니다.";

    const intents = {
        android: "intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end",
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
            }, 5000);
        } else if (os === "other") {
            setTimeout(() => {
                window.alert("지원하지 않는 단말입니다.");
            }, 5000);
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
        const scriptKakaoSDK = document.createElement("script");
        scriptKakaoSDK.src = "https://developers.kakao.com/sdk/js/kakao.js";
        scriptKakaoSDK.async = true;
        document.body.appendChild(scriptKakaoSDK);

        const scriptAdFit = document.createElement("script");
        scriptAdFit.src = "//t1.daumcdn.net/kas/static/ba.min.js";
        scriptAdFit.async = true;
        document.body.appendChild(scriptAdFit);

        const longAd = document.createElement("div");

        if (window.innerWidth > 1000) {
            longAd.innerHTML = `<ins
                class="kakao_ad_area"
                style="display:none; position: absolute; top: 20%; left: 5%"
                data-ad-unit="DAN-rfBOCKOlhfNuoui8"
                data-ad-width="160"
                data-ad-height="600"
                ></ins>`;
            wrapper.current?.appendChild(longAd);
        } else {
            longAd.innerHTML = `<ins
                class="kakao_ad_area"
                style="display:none;"
                data-ad-unit="DAN-8rdbniEQUyuVBBWV"
                data-ad-width="320"
                data-ad-height="50"
                ></ins>`;
            wrapper.current?.appendChild(longAd);
        }
    }, []);

    return (
        <div className="result_wrapper" ref={wrapper as React.RefObject<HTMLDivElement>}>
            <h1>{props.title}</h1>
            <div>{koreanGender} 편</div>
            <div className="result_section">
                <h3>결과</h3>
                {isValidFace ? <img src={props.resultData.img} alt="사진" width="270px" height="270px" className="result_img" /> : <></>}
                <div></div>
                <h3>{props.subtitle}</h3>
                {isValidFace ? <div className="class_section">{parsedClass}</div> : <></>}
                <div></div>
                <p className="content_section">{content}</p>
                <div></div>
                <div className="retry_button" onClick={handleRetry}>
                    다시 하기
                </div>
            </div>
            <div className="share_section">
                <h2>친구와 함께 즐겨보세요!</h2>
                <Grid container spacing={0} style={{ justifyContent: "space-evenly", alignItems: "center" }}>
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
                        <img src="/image/twitter.png" alt="twitter" onClick={TwitterShare} width="40px" />
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
                @media (min-width: 1000px) {
                    .result_img {
                        width: 500px;
                        height: 500px;
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
                .class_section {
                    display: inline-block;
                    background: #eeeeee;
                    color: #2b39a0;
                    font-size: 1.5rem;
                    font-weight: 800;
                    padding: 0.5rem 1rem;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default Result;
