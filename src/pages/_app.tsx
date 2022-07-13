import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../component/Layout";

// 모든 페이지에 보여야 하는 컴포넌트들을 넣음.
// layout.tsx 파일에서 모든 페이지에 적용해야 하는 컴포넌트 짜고
// Layout태그로 감싸는 것이 좋음.

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
