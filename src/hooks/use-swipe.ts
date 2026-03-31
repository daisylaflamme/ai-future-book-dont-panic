import { useRef, useCallback } from "react";

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 50 }: UseSwipeOptions) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);
  const swiping = useRef(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
    swiping.current = false;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    touchEnd.current = { x: currentX, y: currentY };

    const diffX = Math.abs(touchStart.current.x - currentX);
    const diffY = Math.abs(touchStart.current.y - currentY);

    // If horizontal movement dominates, prevent vertical scroll
    if (diffX > diffY && diffX > 10) {
      swiping.current = true;
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return;
    const distX = touchStart.current.x - touchEnd.current.x;
    const distY = Math.abs(touchStart.current.y - touchEnd.current.y);
    const isHorizontal = Math.abs(distX) > distY;

    if (isHorizontal && Math.abs(distX) > threshold) {
      if (distX > 0) {
        onSwipeLeft?.(); // swipe left = next
      } else {
        onSwipeRight?.(); // swipe right = prev
      }
    }
    touchStart.current = null;
    touchEnd.current = null;
    swiping.current = false;
  }, [onSwipeLeft, onSwipeRight, threshold]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}
