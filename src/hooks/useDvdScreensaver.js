import { useRef, useState, useEffect, useLayoutEffect } from 'react';

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useDvdScreensaver(options) {
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const animationState = useRef({
    animationFrameId: 0,
    impactCount: 0,
    isPosXIncrement: true,
    isPosYIncrement: true,
    lastTimestamp: 0,
    positionX: 0,
    positionY: 0
  });
  const animateFnRef = useRef(void 0);
  const elementRef = useRef(null);
  const containerRef = useRef(null);
  const [impactCount, setImpactCount] = useState(0);
  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);
  const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function startAnimation() {
    if (!animateFnRef.current || animationState.current.animationFrameId) return;
    if (prefersReducedMotion()) return;
    animationState.current.animationFrameId = requestAnimationFrame(animateFnRef.current);
  }

  function stopAnimation() {
    cancelAnimationFrame(animationState.current.animationFrameId);
    animationState.current.animationFrameId = 0;
    animationState.current.lastTimestamp = 0;
  }

  useIsomorphicLayoutEffect(() => {
    var _a, _b;
    const element = elementRef.current;
    const mql = typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    const setActive = () => setHovered(true);
    const setInactive = () => setHovered(false);
    const handleTouchEnd = (e) => {
      if (e.touches.length === 0) setInactive();
    };
    const onMotionPrefChange = () => {
      var _a2;
      if (mql == null ? void 0 : mql.matches) {
        stopAnimation();
      } else if (!((_a2 = optionsRef.current) == null ? void 0 : _a2.paused) && !hoveredRef.current) {
        startAnimation();
      }
    };
    function updatePosition(containerSpan, delta, elementSpan, prevPos, toggleKey) {
      var _a2, _b2;
      const boundary = Math.max(0, containerSpan - elementSpan);
      let newPos = prevPos + (animationState.current[toggleKey] ? delta : -delta);
      let hit = false;
      if (newPos <= 0 || newPos >= boundary) {
        animationState.current[toggleKey] = !animationState.current[toggleKey];
        animationState.current.impactCount += 1;
        setImpactCount(animationState.current.impactCount);
        (_b2 = (_a2 = optionsRef.current) == null ? void 0 : _a2.impactCallback) == null ? void 0 : _b2.call(_a2, animationState.current.impactCount);
        newPos = Math.max(0, Math.min(newPos, boundary));
        hit = true;
      }
      return { pos: newPos, hit };
    }
    function animate(timestamp) {
      var _a2, _b2, _c, _d, _e;
      const el = elementRef.current;
      const container = (_a2 = containerRef.current) != null ? _a2 : el == null ? void 0 : el.parentElement;
      if (el && container) {
        const last = animationState.current.lastTimestamp;
        const elapsed = last ? Math.min(timestamp - last, 50) : 1e3 / 60;
        animationState.current.lastTimestamp = timestamp;
        const speed = (_c = (_b2 = optionsRef.current) == null ? void 0 : _b2.speed) != null ? _c : 2;
        const delta = speed * 60 * elapsed / 1e3;
        const { pos: posX, hit: hitX } = updatePosition(
          container.clientWidth,
          delta,
          el.clientWidth,
          animationState.current.positionX,
          "isPosXIncrement"
        );
        const { pos: posY, hit: hitY } = updatePosition(
          container.clientHeight,
          delta,
          el.clientHeight,
          animationState.current.positionY,
          "isPosYIncrement"
        );
        if (hitX && hitY) {
          (_e = (_d = optionsRef.current) == null ? void 0 : _d.onCornerHit) == null ? void 0 : _e.call(_d);
        }
        el.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        animationState.current.positionX = posX;
        animationState.current.positionY = posY;
      }
      animationState.current.animationFrameId = requestAnimationFrame(animate);
    }
    animateFnRef.current = animate;
    if (element) {
      element.style.willChange = "transform";
      element.style.userSelect = "none";
      element.style.setProperty("-webkit-touch-callout", "none");
      const container = (_a = containerRef.current) != null ? _a : element.parentElement;
      if (container) {
        const maxX = Math.max(0, container.clientWidth - element.clientWidth);
        const maxY = Math.max(0, container.clientHeight - element.clientHeight);
        
        // Add support for initialX and initialY (0 to 1)
        const initX = optionsRef.current?.initialX ?? Math.random();
        const initY = optionsRef.current?.initialY ?? Math.random();
        
        animationState.current.positionX = initX * maxX;
        animationState.current.positionY = initY * maxY;
        
        // Initial set to avoid flash at 0,0
        element.style.transform = `translate3d(${animationState.current.positionX}px, ${animationState.current.positionY}px, 0)`;
      }
      element.addEventListener("mouseover", setActive);
      element.addEventListener("mouseout", setInactive);
      element.addEventListener("touchstart", setActive, { passive: true });
      element.addEventListener("touchend", handleTouchEnd, { passive: true });
      element.addEventListener("touchcancel", handleTouchEnd, { passive: true });
      mql == null ? void 0 : mql.addEventListener("change", onMotionPrefChange);
      if (!((_b = optionsRef.current) == null ? void 0 : _b.paused) && !(mql == null ? void 0 : mql.matches)) {
        animationState.current.animationFrameId = requestAnimationFrame(animate);
      }
    }
    return () => {
      element == null ? void 0 : element.removeEventListener("mouseover", setActive);
      element == null ? void 0 : element.removeEventListener("mouseout", setInactive);
      element == null ? void 0 : element.removeEventListener("touchstart", setActive);
      element == null ? void 0 : element.removeEventListener("touchend", handleTouchEnd);
      element == null ? void 0 : element.removeEventListener("touchcancel", handleTouchEnd);
      mql == null ? void 0 : mql.removeEventListener("change", onMotionPrefChange);
      cancelAnimationFrame(animationState.current.animationFrameId);
    };
  }, []);
  
  useEffect(() => {
    var _a;
    const element = elementRef.current;
    const container = (_a = containerRef.current) != null ? _a : element == null ? void 0 : element.parentElement;
    if (!container || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      if (!elementRef.current) return;
      const maxX = Math.max(0, container.clientWidth - elementRef.current.clientWidth);
      const maxY = Math.max(0, container.clientHeight - elementRef.current.clientHeight);
      animationState.current.positionX = Math.min(animationState.current.positionX, maxX);
      animationState.current.positionY = Math.min(animationState.current.positionY, maxY);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    var _a, _b, _c;
    const wasHovered = hoveredRef.current;
    hoveredRef.current = hovered;
    if (hovered && !wasHovered) {
      (_b = (_a = optionsRef.current) == null ? void 0 : _a.hoverCallback) == null ? void 0 : _b.call(_a);
    }
    if (!((_c = optionsRef.current) == null ? void 0 : _c.freezeOnHover)) return;
    if (hovered) {
      stopAnimation();
    } else {
      startAnimation();
    }
  }, [hovered]);
  
  useEffect(() => {
    var _a;
    if (options == null ? void 0 : options.paused) {
      stopAnimation();
    } else if (!hoveredRef.current || !((_a = optionsRef.current) == null ? void 0 : _a.freezeOnHover)) {
      startAnimation();
    }
  }, [options == null ? void 0 : options.paused]);
  
  useEffect(() => {
    if (!(options == null ? void 0 : options.freezeOnHover) && !(options == null ? void 0 : options.paused)) {
      startAnimation();
    }
  }, [options == null ? void 0 : options.freezeOnHover]);
  
  return { containerRef, elementRef, hovered, impactCount };
}
