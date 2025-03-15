// useSpotlightEffect.js
import { useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * A custom hook that applies a spotlight effect to elements matching the selector.
 * When an element is hovered, it maintains full opacity while others dim.
 * 
 * @param {string} selector - CSS selector for the elements to apply the effect to
 * @param {number} dimOpacity - The opacity value for non-hovered elements (default: 0.2)
 * @param {number} duration - Animation duration in seconds (default: 0.3)
 */
export function useSpotlightEffect(selector, dimOpacity = 0.2, duration = 0.3) {
    useEffect(() => {
        const applySpotlightEffect = () => {
            const elements = document.querySelectorAll(selector);
            if (elements.length === 0) return;

            const elementsArray = [...elements];

            elementsArray.forEach((currentElement) => {
                const otherElements = elementsArray.filter(el => el !== currentElement);

                const handleMouseEnter = () => {
                    gsap.to(otherElements, {
                        opacity: dimOpacity,
                        duration: duration,
                        ease: 'power1.out'
                    });
                };

                const handleMouseLeave = () => {
                    gsap.to(otherElements, {
                        opacity: 1,
                        duration: duration,
                        ease: 'power1.out'
                    });
                };

                currentElement.addEventListener('mouseenter', handleMouseEnter);
                currentElement.addEventListener('mouseleave', handleMouseLeave);

                // Store the handlers for cleanup
                currentElement._spotlightHandlers = {
                    enter: handleMouseEnter,
                    leave: handleMouseLeave
                };
            });
        };

        // Apply the effect
        applySpotlightEffect();

        // Cleanup function
        return () => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element._spotlightHandlers) {
                    element.removeEventListener('mouseenter', element._spotlightHandlers.enter);
                    element.removeEventListener('mouseleave', element._spotlightHandlers.leave);
                    delete element._spotlightHandlers;
                }
            });
        };
    }, [selector, dimOpacity, duration]);
}

// SpotlightNavigation.jsx - A component wrapper for navigation with spotlight effect
import { useSpotlightEffect } from './useSpotlightEffect';

export function SpotlightNavigation({ children, className, itemSelector = '.nav-link', dimOpacity = 0.2 }) {
    // Apply the spotlight effect to all nav items
    useSpotlightEffect(itemSelector, dimOpacity);

    return (
        <nav className={className}>
            {children}
        </nav>
    );
}