import { useEffect, useState } from "react";
import { type Breakpoint, breakpoints } from "../constants/theme";

export const useBreakpoint = (at: Breakpoint) => {
  const [matches, setMatches] = useState(() => {
    const width = window.innerWidth;

    switch (at) {
      case "sm":
        return width < breakpoints.md;
      case "md":
        return width > breakpoints.lg && width >= breakpoints.md;
      case "lg":
        return width > breakpoints.xl && width >= breakpoints.lg;
      case "xl":
        return width > breakpoints.lg;
      default:
        return false;
    }
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      switch (at) {
        case "sm":
          setMatches(width < breakpoints.md);
          break;
        case "md":
          setMatches(width > breakpoints.lg && width >= breakpoints.md);
          break;
        case "lg":
          setMatches(width > breakpoints.xl && width >= breakpoints.lg);
          break;
        case "xl":
          setMatches(width > breakpoints.lg);
          break;
        default:
          setMatches(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [at]);

  return matches;
};
