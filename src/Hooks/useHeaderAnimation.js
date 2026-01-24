import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "../Context/ThemeContext";

export const useHeaderAnimation = (ref, type = "desktop") => {
  const { theme } = useTheme();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const innerContainer =
      type === "desktop" ? element.querySelector("div") : null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const isDarkMode =
        theme === "dark" || (theme === "system" && isSystemDark);

      // ---------------- DESKTOP ANIMATION ----------------
      if (type === "desktop") {
        if (currentScrollY > 20) {
          gsap.to(element, {
            top: "20px",
            width: "90%",
            left: "5%",
            borderRadius: "9999px",
            backgroundColor: isDarkMode
              ? "rgba(30, 41, 59, 0.8)" // Dark glass
              : "rgba(255, 255, 255, 0.8)", // Light glass
            backdropFilter: "blur(16px)",
            boxShadow:
              "0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            border: isDarkMode
              ? "1px solid rgba(255, 255, 255, 0.05)"
              : "1px solid rgba(255, 255, 255, 0.5)",
            paddingTop: "0px",
            paddingBottom: "0px",
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });

          if (innerContainer) {
            gsap.to(innerContainer, {
              height: "60px",
              duration: 0.3,
              overwrite: "auto",
            });
          }
        } else {
          // Full Width
          gsap.to(element, {
            top: "0px",
            width: "100%",
            left: "0%",
            borderRadius: "0px",
            backgroundColor: isDarkMode
              ? "#1e293b" // slate-800
              : "#ffffff",
            backdropFilter: "blur(0px)",
            boxShadow: "0 0 0 0 transparent",
            border: "1px solid transparent",
            paddingTop: "0px",
            paddingBottom: "0px",
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });

          if (innerContainer) {
            gsap.to(innerContainer, {
              height: "68px",
              duration: 0.3,
              overwrite: "auto",
            });
          }
        }
      }
      // ---------------- MOBILE ANIMATION ----------------
      else if (type === "mobile") {
        if (currentScrollY > 20) {
          gsap.to(element, {
            top: "10px",
            width: "95%",
            left: "50%",
            xPercent: -50,
            right: "auto",
            borderRadius: "24px",
            backgroundColor: isDarkMode
              ? "rgba(15, 23, 42, 0.85)"
              : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(12px)",

            boxShadow: "0 4px 15px -3px rgb(0 0 0 / 0.1)",
            border: isDarkMode
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(255, 255, 255, 0.6)",
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            overflow: "hidden",
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          // full width
          gsap.to(element, {
            top: "0px",
            width: "100%",
            left: "0%",
            xPercent: 0,
            right: "0%",
            borderRadius: "0px",
            backgroundColor: isDarkMode
              ? "rgba(15, 23, 42, 0.8)"
              : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",

            boxShadow: "0 0 0 0 transparent",
            borderBottom: isDarkMode
              ? "1px solid rgba(255, 255, 255, 0.05)"
              : "1px solid rgba(226, 232, 240, 1)",
            borderTop: "1px solid transparent",
            borderLeft: "1px solid transparent",
            borderRight: "1px solid transparent",
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            overflow: "visible",
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [type, theme]);
};
