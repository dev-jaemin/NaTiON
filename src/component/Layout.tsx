import { useEffect, useRef } from "react";
import Footer from "./common/Footer";
import Header from "./common/Header";
type AppLayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: AppLayoutProps) {
    const child = useRef<HTMLDivElement>();

    useEffect(() => {
        child.current && (child.current.style.opacity = "1");
    });
    return (
        <>
            <div className="wrapper">
                <div className="wrapper_child" ref={child as React.RefObject<HTMLDivElement>}>
                    {children}
                </div>
                <Footer />
            </div>
            <style jsx>{`
                .wrapper {
                    text-align: center;
                    background-color: #000000;
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
