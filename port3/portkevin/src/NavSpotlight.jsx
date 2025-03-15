// NavSpotlight.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * A reusable navigation component with the spotlight hover effect
 * 
 * @param {Object} props - Component props
 * @param {Array} props.categories - Array of category objects with name and subcategories
 * @param {string} props.title - Title for the navigation section
 * @param {string} props.subtitle - Optional subtitle for the navigation section
 * @param {boolean} props.enableSpotlight - Whether to enable the spotlight effect (default: true)
 */
export default function NavSpotlight({
    categories,
    title = "Navigation",
    subtitle,
    enableSpotlight = true
}) {
    const navRef = useRef(null);

    useEffect(() => {
        if (!enableSpotlight || !navRef.current) return;

        const applySpotlightEffect = () => {
            const navLinks = navRef.current.querySelectorAll('.nav-link');
            const navLinksArray = [...navLinks];

            navLinksArray.forEach((currentLink) => {
                const otherLinks = navLinksArray.filter(link => link !== currentLink);

                const handleMouseEnter = () => {
                    gsap.to(otherLinks, {
                        opacity: 0.2,
                        duration: 0.3,
                        ease: 'power1.out'
                    });
                };

                const handleMouseLeave = () => {
                    gsap.to(otherLinks, {
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power1.out'
                    });
                };

                currentLink.addEventListener('mouseenter', handleMouseEnter);
                currentLink.addEventListener('mouseleave', handleMouseLeave);

                // Store handlers for cleanup
                currentLink._spotlightHandlers = {
                    enter: handleMouseEnter,
                    leave: handleMouseLeave
                };
            });
        };

        applySpotlightEffect();

        // Cleanup function
        return () => {
            if (!navRef.current) return;

            const navLinks = navRef.current.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                if (link._spotlightHandlers) {
                    link.removeEventListener('mouseenter', link._spotlightHandlers.enter);
                    link.removeEventListener('mouseleave', link._spotlightHandlers.leave);
                    delete link._spotlightHandlers;
                }
            });
        };
    }, [enableSpotlight, categories]);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden" ref={navRef}>
            <div className="p-6 bg-teal-800 text-white text-center">
                <h2 className="text-xl font-semibold">{title}</h2>
                {subtitle && <p className="text-sm mt-1 text-teal-100">{subtitle}</p>}
            </div>

            <div className="p-6">
                <div className="flex">
                    <div className="w-1/3 border-r border-gray-200 pr-4">
                        <h3 className="font-bold mb-4">Categories</h3>
                        <ul>
                            {categories.map((category, idx) => (
                                <li
                                    key={idx}
                                    className={`mb-2 ${enableSpotlight ? 'nav-link' : ''}`}
                                >
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-2/3 pl-6">
                        <h3 className="font-bold mb-4">Subcategories</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {categories.flatMap(category =>
                                category.subcategories.map((subcat, idx) => (
                                    <div
                                        key={`${category.name}-${idx}`}
                                        className={`${enableSpotlight ? 'nav-link' : ''}`}
                                    >
                                        {subcat}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}