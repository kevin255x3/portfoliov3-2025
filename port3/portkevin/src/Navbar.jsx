// Usestate and Useffect method imports
import { useState, useEffect } from 'react';
// Link and Location imports
import { Link, useLocation } from 'react-router-dom';
// Gsap information
import { gsap } from 'gsap';
// Unqiue style imports
import './PortfolioStyles.css';

// Will collapse into a mobile menu if the screen size is less than 768px

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Set active link based on current location
    useEffect(() => {
        const path = location.pathname;
        if (path === '/') setActiveLink('work');
        else if (path === '/about') setActiveLink('about');
        else if (path === '/contact') setActiveLink('contact');
        else setActiveLink('');
    }, [location]);

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);

        // Animate menu items
        if (!isMenuOpen) {
            gsap.fromTo('.mobile-menu-item',
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, stagger: 0.1, ease: 'power1.out', duration: 0.3 }
            );
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 ">
            <div className="flex justify-between items-center h-16 px-8 bg-white ">
                {/* Logo */}
                <Link to="/" className="fomontrealbold text-[#666] text-lg tracking-wide hover:text-black transition-colors">
                    <img
                        src="/img/throw.png"
                        alt="Kevin Lazo"
                        className="h-24" // Adjust height as needed
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8 font-montrealbold ">
                    <Link
                        to="/"
                        className={`text-sm ${activeLink === 'work' ? 'text-[#bf0a30]' : 'text-[#666]'} hover:text-black transition-colors`}
                    >
                        INDEX
                    </Link>
                    <Link
                        to="/about"
                        className={`text-sm ${activeLink === 'about' ? 'text-[#bf0a30]' : 'text-[#666]'} hover:text-black transition-colors`}
                    >
                        LEARN
                    </Link>
                    <Link
                        to="/contact"
                        className={`text-sm ${activeLink === 'contact' ? 'text-[#bf0a30]' : 'text-[#666]'} hover:text-black transition-colors`}
                    >
                        CONTACT
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden fomontrealbold text-sm text-[#666]"
                    onClick={toggleMenu}
                >
                    <div className="flex flex-col items-end">
                        <div className={`w-6 h-0.5 bg-[#666] mb-1.5 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-[#666] mb-1.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-[#666] transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden bg-white transition-transform duration-300 ${isMenuOpen ? 'h-auto py-4 border-b border-black/10' : 'h-0 overflow-hidden'}`}>
                <div className="flex flex-col space-y-4 px-8 font-montrealbold">
                    <Link
                        to="/"
                        className={`mobile-menu-item text-sm ${activeLink === 'work' ? 'text-[#bf0a30]' : 'text-[#666]'}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        INDEX
                    </Link>
                    <Link
                        to="/about"
                        className={`mobile-menu-item text-sm ${activeLink === 'about' ? 'text-[#bf0a30]' : 'text-[#666]'}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        LEARN
                    </Link>
                    <Link
                        to="/contact"
                        className={`mobile-menu-item text-sm ${activeLink === 'contact' ? 'text-[#bf0a30]' : 'text-[#666]'}`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        CONTACT
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;