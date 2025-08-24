export type Breakpoint = "sm" | "md" | "lg" | "xl";

const breakpoints: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export { breakpoints };
