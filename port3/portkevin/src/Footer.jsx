// React imports
import React, { useEffect, useState } from 'react';
// Routing imports
import { useLocation } from 'react-router-dom';

const Footer = () => {
    // State handlers for mobile and footer visibility
    const [showFooter, setShowFooter] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    // Location hook
    const location = useLocation();

    // Check if we should show footer based on route and screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Special handling for different pages
        const path = location.pathname;
        const isPortfolioPage = path === '/' || path.startsWith('/project/');

        // Hide footer on mobile for portfolio pages with bottom pills
        if (isPortfolioPage && isMobile) {
            setShowFooter(false);
        } else {
            setShowFooter(true);
        }

        return () => window.removeEventListener('resize', checkMobile);
    }, [location, isMobile]);

    if (!showFooter) return null;

    return (
        <footer className={`fixed bottom-0 left-0 w-full bg-white ${isMobile ? 'z-20' : 'z-30'}`}>
            {/* Mobile version (2-row layout) */}
            {isMobile ? (
                <div className="flex flex-col items-center text-center py-3">
                    <div className="flex items-center space-x-3 mb-3 text-xs font-montreal">
                        <a href="mailto:hellokevinlazo@gmail.com" className="hover:text-[#bf0a30] transition-colors">hellokevinlazo@gmail.com</a>
                        <span className="font-montrealthin text-gray-700">|</span>
                        <span className="font-montrealthin text-gray-700">Vancouver, BC</span>
                    </div>

                    <div className="flex space-x-6 text-xs font-montreal">
                        <a href="https://www.instagram.com/kevo.2121/" className="hover:text-[#002868] transition-colors">Instagram</a>
                        <a href="https://www.linkedin.com/in/kevin-l-280314285/" className="hover:text-[#002868] transition-colors">LinkedIn</a>

                    </div>
                </div>
            ) : (
                /* Desktop version (original side-by-side layout) */
                <div className="flex flex-row justify-between items-center h-12 px-8">
                    <div className="flex flex-row items-center space-x-6 text-xs font-montreal">
                        <a href="mailto:hellokevinlazo@gmail.com" className="hover:text-[#bf0a30] transition-colors">hellokevinlazo@gmail.com</a>
                        <span className="font-montrealthin text-gray-700 inline">|</span>
                        <span className="font-montrealthin text-gray-700">Vancouver, BC</span>
                    </div>

                    <div className="flex space-x-8 text-xs font-montreal">
                        <a href="https://www.instagram.com/kevo.2121/" className="hover:text-[#002868] transition-colors">Instagram</a>
                        <a href="https://www.linkedin.com/in/kevin-l-280314285/" className="hover:text-[#002868] transition-colors">LinkedIn</a>

                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;