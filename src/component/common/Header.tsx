import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import testInfo from "../../testInfo.json";

export default function Header(): JSX.Element {
    const [isToggled, setIsToggled] = useState(false);
    const router = useRouter();

    const onLogoClick = () => {
        setIsToggled(false);
        router.push("/");
    };

    const onMenuClick = () => {
        setIsToggled(false);
    };

    return (
        <div style={{ position: "fixed", width: "100%", zIndex: "40" }}>
            <nav className="navBar">
                <div className="navBar_toggleBtn" onClick={() => setIsToggled(!isToggled)}>
                    <img src="/image/burger_icon.png" alt="logo" width="32px" />
                </div>
                <div className="navBar_logo" onClick={onLogoClick}>
                    <img src="/image/icon.png" alt="logo" width="32px" />
                </div>
                <ul className="navBar_menus">
                    {Object.keys(testInfo).map((item, index) => {
                        return (
                            <li className="navBar_menus_menu" key={index}>
                                <Link href={`/test/${item}`}>
                                    <nav style={{ textDecoration: "none" }}>{testInfo[item as keyof typeof testInfo].shortTitle}</nav>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div style={{ width: "32px", height: "32px" }}> </div>
            </nav>
            {isToggled ? (
                <ul className="toggleMenus">
                    {Object.keys(testInfo).map((item, index) => {
                        return (
                            <li className="toggle_menu" key={index} onClick={onMenuClick}>
                                <Link href={`/test/${item}`}>
                                    <nav style={{ textDecoration: "none" }}>{testInfo[item as keyof typeof testInfo].shortTitle}</nav>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <></>
            )}
            <style jsx>{`
                .navBar {
                    z-index: 35;
                    background-color: #333333;
                    opacity: 0.9;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    padding: 12px;
                }
                .navBar_toggleBtn {
                    display: none;
                    cursor: pointer;
                }
                .navBar_menus {
                    display: flex;
                    margin: 1rem;
                    list-style: none;
                    justify-content: space-around;
                    width: 50%;
                }
                .navBar_menus_menu {
                    color: #ffffff;
                    text-decoration: none !important;
                    cursor: pointer;
                    font-weight: 400;
                }
                .toggleMenus {
                    margin: 0px;
                    padding: 0px;
                    background-color: rgba(50, 50, 50, 0.8);
                    cursor: pointer;
                }
                .navBar_logo {
                    cursor: pointer;
                }

                @media screen and (max-width: 768px) {
                    .navBar {
                        justify-content: space-between;
                    }
                    .navBar_menus {
                        display: none;
                    }
                    .navBar_toggleBtn {
                        display: flex;
                        cursor: pointer;
                    }
                    .navBar_icons .search {
                        display: none;
                    }
                    .toggle_menu {
                        padding: 1rem;
                        color: #ffffff;
                        list-style: none;
                    }
                    .toggle_menu:not(:last-child) {
                        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
                    }
                }
            `}</style>
        </div>
    );
}
