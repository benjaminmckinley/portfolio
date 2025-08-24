import React, {
  useState,
  useRef,
  type CSSProperties,
  type PropsWithChildren,
} from "react";
import { useBreakpoint } from "../hooks/breakpoint-hooks.ts";

const routes = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Projects", path: "/projects" },
  { title: "Blog", path: "/blog" },
];

export const Navigation: React.FC = () => {
  const isMobile = useBreakpoint("sm");

  if (isMobile) {
    return <MobileNavigation />;
  }

  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "row",
        gap: "16px",
      }}
    >
      {routes.map((route) => {
        return (
          <li
            key={route.title}
            style={{
              textDecoration: window.location.pathname.startsWith(route.path)
                ? "underline"
                : "none",
            }}
          >
            <a href={route.path}>{route.title}</a>
          </li>
        );
      })}
    </ul>
  );
};

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const closeButtonStyle: CSSProperties = {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const navListStyle: CSSProperties = {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  };

  return (
    <div ref={navRef}>
      <CollapsedMenuButton
        toggled={isOpen}
        toggle={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      />
      <CollapsibleMenu open={isOpen} direction="right">
        <div>
          <button
            style={closeButtonStyle}
            onClick={() => setIsOpen(false)}
            aria-label="Close Menu"
          >
            ✕
          </button>
          <ul id="mobile-menu" style={navListStyle}>
            {routes.map(({ title, path }) => (
              <NavItem
                key={title}
                title={title}
                path={path}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </ul>
        </div>
      </CollapsibleMenu>
    </div>
  );
};

const NavItem: React.FC<{
  title: string;
  path: string;
  onClick: () => void;
}> = ({ title, path, onClick }) => {
  const itemStyle: CSSProperties = {
    margin: "1rem 0",
    fontSize: "1.5rem",
    cursor: "pointer",
  };

  const linkStyle: CSSProperties = {
    color: "#fff",
    textDecoration: "none",
  };

  return (
    <li style={itemStyle}>
      <a onClick={onClick} style={linkStyle} href={path}>
        {title}
      </a>
    </li>
  );
};

interface CollapsibleMenuProps {
  direction?: "top" | "bottom" | "left" | "right";
  open?: boolean;
}

const CollapsibleMenu: React.FC<PropsWithChildren<CollapsibleMenuProps>> = ({
  children,
  direction = "right",
  open = true,
}) => {
  const getTransform = (): string => {
    switch (direction) {
      case "bottom":
        return open ? "translateY(0)" : "translateY(100%)";
      case "left":
        return open ? "translateX(0)" : "translateX(-100%)";
      case "right":
        return open ? "translateX(0)" : "translateX(100%)";
      case "top":
      default:
        return open ? "translateY(0)" : "translateY(-100%)";
    }
  };

  const overlayStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#111",
    color: "#fff",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.3s ease-in-out",
    transform: getTransform(),
  };

  return <div style={overlayStyle}>{children}</div>;
};

interface CollapsedMenuButtonProps {
  color?: string;
  toggle: (value: boolean) => void;
  toggled: boolean;
  size?: number;
  lines?: number;
  duration?: number;
  easing?: string;
  hideOutline?: boolean;
}

const CollapsedMenuButton: React.FC<CollapsedMenuButtonProps> = ({
  color = "currentColor",
  lines = 3,
  size = 16,
  duration = 0.4,
  easing = "cubic-bezier(0, 0, 0, 1)",
  hideOutline = true,
  toggle,
  toggled,
}) => {
  const width = Math.max(12, size);
  const barHeight = Math.round(width / 12);

  const buttonStyle: CSSProperties = {
    cursor: "pointer",
    height: `${size}px`,
    width: `${size}px`,
    outline: hideOutline ? "none" : undefined,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    position: "relative",
    userSelect: "none",
    transition: `${duration}s ${easing}`,
  };

  const barStyle: CSSProperties = {
    width: `${width}px`,
    height: `${barHeight}px`,
    backgroundColor: color,
    borderRadius: "4px",
    transition: `${duration}s ${easing}`,
  };

  return (
    <div
      onClick={() => toggle(!toggled)}
      style={buttonStyle}
      aria-label="Menu Toggle Button"
    >
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          style={{
            ...barStyle,
            transform: toggled
              ? i === 0
                ? "rotate(45deg) translate(5px, 5px)"
                : i === 1
                  ? "scale(0, 0)"
                  : "rotate(-45deg) translate(5px, -5px)"
              : "none",
          }}
        />
      ))}
    </div>
  );
};

export default Navigation;