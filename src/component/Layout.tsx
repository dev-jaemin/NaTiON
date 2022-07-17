import { useEffect, useRef } from "react";
import Footer from "./common/Footer";
import Header from "./common/Header";
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
            <div className="wrapper">
                <Header />
                <div className="wrapper_child" ref={child as React.RefObject<HTMLDivElement>}>
                    {children}
                </div>
                <Footer />
            </div>
            <style jsx>{`
                .wrapper {
                    text-align: center;
                    background: linear-gradient(90deg, #2b39a0, #000000);
                    overflow: hidden;
                }
                .wrapper_child {
                    padding: 3rem 0rem;
                    opacity: 0;
                    transition: opacity 2s ease;
                }
            `}</style>
        </>
    );
}
