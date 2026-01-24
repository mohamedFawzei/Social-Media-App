import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

export const useNavbarAnimation = ({
  activeTab,
  isProfileOpen,
  indicatorRef,
  iconRefs,
}) => {
  const timelineRef = useRef(null);
  const prevProfileOpen = useRef(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    const indicator = indicatorRef.current;
    const icons = iconRefs.current;

    if (!indicator || !icons?.length) return;

    timelineRef.current?.kill();

    const tl = gsap.timeline({
      defaults: { duration: 0.4, ease: "power2.out" },
    });

    timelineRef.current = tl;

    if (isProfileOpen) {
      tl.to(indicator, { scale: 0, xPercent: -50, duration: 0.25 }, 0);

      tl.to(
        icons.filter(Boolean),
        { y: 0, scale: 1, color: "#94a3b8", duration: 0.25 },
        0,
      );

      prevProfileOpen.current = true;
      return;
    }

    const activeIcon = icons[activeTab];
    const container = indicator.parentElement;

    if (!activeIcon || !container) return;

    const iconRect = activeIcon.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const x =
      iconRect.left +
      iconRect.width / 2 -
      (containerRect.left + containerRect.width / 2);

    // Reset all icons
    tl.to(icons.filter(Boolean), { y: 0, scale: 1, color: "#94a3b8" }, 0);

    if (prevProfileOpen.current) {
      // teleport then pop
      tl.set(indicator, { x, xPercent: -50 }, 0);
      tl.to(indicator, { scale: 1, xPercent: -50 }, 0);
    } else {
      tl.to(indicator, { scale: 1, xPercent: -50 }, 0);
      tl.to(indicator, { x, xPercent: -50 }, 0);
    }

    // Active icon
    tl.to(activeIcon, { y: -22, scale: 1.1, color: "#fff" }, "-=0.25");

    prevProfileOpen.current = false;
  }, [activeTab, isProfileOpen, windowWidth]);
};
