import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
    const getMatch = () => {
        if (typeof window === "undefined") return false;
        return window.matchMedia(query).matches;
    };

    const [matches, setMatches] = useState<boolean>(getMatch);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const media = window.matchMedia(query);

        const listener = () => setMatches(media.matches);

        // initial check
        setMatches(media.matches);

        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
};
