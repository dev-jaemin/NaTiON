import Head from "next/head";
import { useEffect, useRef } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";

type AppLayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: AppLayoutProps) {
    const child = useRef<HTMLDivElement>();

    useEffect(() => {
        child.current && (child.current.style.opacity = "0");
        child.current && (child.current.style.opacity = "1");
    }, [children]);

    return (
        <>
            <Head>
                <title>anAlyst :: AI를 통한 나만의 스타일 찾기</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="description" content="anAlyst :: AI를 통한 나만의 스타일 찾기" />
                {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="anAlyst" />
                <meta property="og:url" content="http://192.249.19.184:443/" />
                <meta property="og:description" content="anAlyst :: AI를 통한 나만의 스타일 찾기" />
                <meta property="og:image" content="http://192.249.19.184:80/icon_blue.png" />
            </Head>
            <div className="wrapper">
                <Header />
                <div className="wrapper_child" ref={child as React.RefObject<HTMLDivElement>}>
                    {children}
                </div>
                <Footer />
            </div>
            <style jsx global>{`
                @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

                * {
                    font-family: "Spoqa Han Sans Neo", "sans-serif";
                    color: #ffffff;
                }
                pre {
                    font-family: "Spoqa Han Sans Neo", "sans-serif";
                    white-space: pre-wrap;
                }
                h1 {
                    margin: 16px 0px;
                }
                body {
                    margin: 0px;
                }
                .wrapper {
                    text-align: center;
                    background: linear-gradient(90deg, #2b39a0, #000000);
                    overflow: hidden;
                }
                .wrapper_child {
                    opacity: 0;
                    transition: opacity 2s ease;
                }
            `}</style>
        </>
    );
}
