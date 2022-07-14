import Footer from "./common/Footer";
import Header from "./common/Header";
type AppLayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: AppLayoutProps) {
    return (
        <>
            <div className="wrapper">
                <Header />
                <div>{children}</div>
                <Footer />
            </div>
            <style jsx>{`
                .wrapper {
                    text-align: center;
                    background-color: #000000;
                    overflow: hidden;
                }
            `}</style>
        </>
    );
}
