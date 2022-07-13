import Footer from "./common/Footer";
import Header from "./common/Header";
type AppLayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: AppLayoutProps) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    );
}
