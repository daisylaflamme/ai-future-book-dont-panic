import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";

interface PageTurnProps {
  children: ReactNode;
  pageKey: string | number;
  direction: "forward" | "backward" | null;
  skipAnimation: boolean;
  onAnimationComplete: () => void;
  layoutMode: "single" | "spread";
}

const DURATION = 500;

const PageTurn = ({
  children,
  pageKey,
  direction,
  skipAnimation,
  onAnimationComplete,
  layoutMode,
}: PageTurnProps) => {
  const [displayedChildren, setDisplayedChildren] = useState<ReactNode>(children);
  const [animState, setAnimState] = useState<"idle" | "turning-out" | "turning-in">("idle");
  const prevKeyRef = useRef(pageKey);
  const nextChildrenRef = useRef<ReactNode>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  useEffect(() => {
    if (pageKey === prevKeyRef.current) {
      // Same page, just update children in place
      setDisplayedChildren(children);
      return;
    }

    prevKeyRef.current = pageKey;

    if (skipAnimation || !direction) {
      setDisplayedChildren(children);
      setAnimState("idle");
      onAnimationComplete();
      return;
    }

    // Start turn-out animation with old content
    nextChildrenRef.current = children;
    setAnimState("turning-out");

    timeoutRef.current = setTimeout(() => {
      // Swap to new content and animate in
      setDisplayedChildren(nextChildrenRef.current);
      setAnimState("turning-in");

      timeoutRef.current = setTimeout(() => {
        setAnimState("idle");
        onAnimationComplete();
      }, DURATION / 2);
    }, DURATION / 2);
  }, [pageKey, children, direction, skipAnimation, onAnimationComplete, clearTimers]);

  const getTransformStyle = (): React.CSSProperties => {
    if (animState === "idle") {
      return {
        transform: "none",
        opacity: 1,
        willChange: "auto",
      };
    }

    const originX = direction === "forward" ? "left" : "right";

    if (animState === "turning-out") {
      const angle = direction === "forward" ? -90 : 90;
      return {
        transform: `perspective(2000px) rotateY(${angle}deg)`,
        transformOrigin: `${originX} center`,
        opacity: 0.3,
        transition: `transform ${DURATION / 2}ms ease-in, opacity ${DURATION / 2}ms ease-in`,
        willChange: "transform, opacity",
      };
    }

    if (animState === "turning-in") {
      return {
        transform: "perspective(2000px) rotateY(0deg)",
        transformOrigin: `${originX} center`,
        opacity: 1,
        transition: `transform ${DURATION / 2}ms ease-out, opacity ${DURATION / 2}ms ease-out`,
        willChange: "transform, opacity",
      };
    }

    return {};
  };

  const getShadowStyle = (): React.CSSProperties => {
    if (animState === "idle") return {};

    if (animState === "turning-out") {
      return {
        boxShadow:
          direction === "forward"
            ? "inset -30px 0 40px -20px rgba(0,0,0,0.15), -10px 0 30px rgba(0,0,0,0.1)"
            : "inset 30px 0 40px -20px rgba(0,0,0,0.15), 10px 0 30px rgba(0,0,0,0.1)",
      };
    }

    return {
      boxShadow:
        direction === "forward"
          ? "inset -5px 0 15px -5px rgba(0,0,0,0.05)"
          : "inset 5px 0 15px -5px rgba(0,0,0,0.05)",
      transition: `box-shadow ${DURATION / 2}ms ease-out`,
    };
  };

  return (
    <div
      className="w-full h-full overflow-hidden relative"
      style={{ perspective: "2000px" }}
    >
      <div
        className="w-full h-full"
        style={{
          ...getTransformStyle(),
          ...getShadowStyle(),
          backfaceVisibility: animState === "idle" ? "visible" : "hidden",
          WebkitBackfaceVisibility: animState === "idle" ? "visible" : "hidden",
          transformStyle: animState === "idle" ? "flat" : "preserve-3d",
          WebkitFontSmoothing: animState === "idle" ? "antialiased" : undefined,
        }}
      >
        {displayedChildren}
      </div>
    </div>
  );
};

export default PageTurn;
