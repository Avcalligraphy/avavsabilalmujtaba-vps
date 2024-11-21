import { useEffect, useState } from "react";

export const useIntersectionObserver = (
  id: string,
  { root = null, rootMargin = "0px", threshold = 0 }: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return;

    const element = document.getElementById(id);

    // Only create observer if element exists
    if (!element) {
      console.warn(`Element with id "${id}" not found. Skipping intersection observer.`);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIntersecting(entry.isIntersecting);
        });
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [id, root, rootMargin, threshold]);

  return [isIntersecting];
};

export default useIntersectionObserver;
