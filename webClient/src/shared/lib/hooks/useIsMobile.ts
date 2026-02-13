import { useMediaQuery } from "./useMediaQuery";

export const useIsMobile = (breakpointPx = 1024) => {
    return useMediaQuery(`(max-width: ${breakpointPx - 1}px)`);
};
