import { useLayoutEffect, useRef } from 'react';

export const useScrollPreservation = (dependencies, isLoading) => {
  const scrollPositionRef = useRef(0);
  
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (isLoading) return;
    
    scrollPositionRef.current = window.scrollY;
    
    const frame1 = requestAnimationFrame(() => {
      const frame2 = requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
      });
      return () => cancelAnimationFrame(frame2);
    });
    return () => cancelAnimationFrame(frame1);
  }, [...dependencies, isLoading]);
}; 