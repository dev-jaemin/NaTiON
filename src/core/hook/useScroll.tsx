import { useState, useEffect } from "react";
import { debounce } from "lodash";

export function useScroll() {
    const [scrollY, setScrollY] = useState<number>(0);

    const listener = () => {
        setScrollY(window.pageYOffset);
    };

    const delay = 10;

    useEffect(() => {
        window.addEventListener("scroll", debounce(listener, delay));
        return () => window.removeEventListener("scroll", listener);
    });

    return {
        scrollY,
    };
}
