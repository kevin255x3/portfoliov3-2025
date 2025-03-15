import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Clock, Users, ExternalLink } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Navbar from './Navbar';
import ShinyText from './ShinyText';
import './PortfolioStyles.css';

// TiltedImage component for wireframes and gallery
const TiltedImage = ({ src, alt, caption, heightClass = "aspect-video", onClick }) => {
    const ref = useRef(null);
    const springConfig = { damping: 20, stiffness: 150, mass: 1 };
    const rotateX = useSpring(0, springConfig);
    const rotateY = useSpring(0, springConfig);
    const scale = useSpring(1, springConfig);

    function handleMouseMove(e) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const posX = e.clientX - centerX;
        const posY = e.clientY - centerY;

        // Convert position to rotation (limited range)
        rotateX.set(posY * -0.01);
        rotateY.set(posX * 0.01);
        scale.set(1.02);
    }

    function handleMouseLeave() {
        rotateX.set(0);
        rotateY.set(0);
        scale.set(1);
    }

    return (
        <motion.div
            ref={ref}
            className={`relative mb-6 overflow-hidden [perspective:1000px] ${onClick ? 'cursor-pointer' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                rotateX,
                rotateY,
                scale,
                transformStyle: "preserve-3d"
            }}
        >
            <img src={src} alt={alt} className={`w-full object-cover ${heightClass}`} />
            {caption && (
                <motion.div
                    className="mt-2 text-sm text-[#666] italic font-ming"
                    style={{ transform: "translateZ(20px)" }}
                >
                    {caption}
                </motion.div>
            )}
        </motion.div>
    );
};

// ScrollReveal component for animation on scroll
const ScrollReveal = ({ children, delay = 0, direction = "up" }) => {
    const controls = useRef(null);
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 30 : (direction === "down" ? -30 : 0),
            x: direction === "left" ? 30 : (direction === "right" ? -30 : 0)
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: delay
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

// MouseFollowCursor component
// Fixed MouseFollowCursor component
const MouseFollowCursor = ({ cursorType }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Map cursor type to specific values instead of using useTransform
    const cursorSizeMap = {
        "default": 16,
        "expand": 40,
        "link": 24,
        "text": 40
    };

    const cursorOpacityMap = {
        "default": 0.5,
        "expand": 0.2,
        "link": 0.7,
        "text": 0.2
    };

    const cursorBorderWidthMap = {
        "default": 0,
        "expand": 1,
        "link": 0,
        "text": 0
    };

    return (
        <motion.div
            className="fixed pointer-events-none z-[100] mix-blend-difference hidden lg:block"
            style={{
                x: smoothX,
                y: smoothY,
                width: cursorSizeMap[cursorType] || 16,
                height: cursorSizeMap[cursorType] || 16,
                borderRadius: 100,
                backgroundColor: "white",
                borderWidth: cursorBorderWidthMap[cursorType] || 0,
                borderColor: "white",
                opacity: cursorOpacityMap[cursorType] || 0.5,
                translateX: "-50%",
                translateY: "-50%",
            }}
        />
    );
};

const ProjectDetailsPage = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [mediaIndex, setMediaIndex] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cursorType, setCursorType] = useState('default');
    const [sectionVisibility, setSectionVisibility] = useState({
        overview: false,
        wireframes: false,
        technical: false,
        gallery: false,
        feedback: false
    });

    const navigate = useNavigate();
    const { projectId } = useParams();

    // Refs for animations and scroll tracking
    const sectionNavRef = useRef(null);
    const mainContentRef = useRef(null);
    const sectionRefs = {
        overview: useRef(null),
        wireframes: useRef(null),
        technical: useRef(null),
        gallery: useRef(null),
        feedback: useRef(null)
    };

    // Sample project data
    const project = {
        id: projectId || '01',
        title: 'FONTS.LOCAL',
        description: 'A digital art gallery that showcases the diverse range of styles and techniques used in Graffiti and Street Art.',
        liveUrl: 'https://fonts-local.vercel.app', // Live project URL
        nextProject: {
            id: '02',
            title: 'DOUBLEBACK CONCEPT STORE',
            image: '/img/dbconceptcover.jpg'
        },
        prevProject: {
            id: '06',
            title: '3D ART GALLERY',
            image: '/img/threejscover.jpeg'
        },
        timeline: {
            start: 'January 2024',
            end: 'March 2024',
            duration: '12 weeks'
        },
        client: {
            name: 'Personal Project',
            industry: 'Just for fun!'
        },
        team: [
            { name: 'Kevin Lazo', role: 'Lead Developer, Lead Designer, Quality Assurance Lead' },
            { name: 'Denis Gurcu', role: 'Creative Direction' },
            { name: 'Sam Park', role: 'UI Design' },
            { name: 'Vahan Vartanian', role: 'UI Design' },
            { name: 'Daniel Kolpakov', role: 'Developer' },
        ],
        overview: {
            challenge: 'Creating a platform that preserves the raw energy and cultural significance of street art in a digital format while making it accessible to a wider audience.',
            approach: 'Implementing a grid-based layout with careful attention to typography and negative space to let the art speak for itself. The design prioritizes the artwork while providing context and navigation that feels intuitive yet unobtrusive.',
            outcome: 'A minimalist yet engaging showcase that respects the original context while providing new perspectives. The platform has successfully attracted both street art enthusiasts and newcomers to the art form.'
        },
        wireframes: [
            {
                title: 'Initial Concept',
                image: '/wireframes/fw1.jpg',
                description: 'Early exploration of the gallery grid system and navigation. The focus was on creating a framework that could accommodate various art styles while maintaining visual consistency.'
            },
            {
                title: 'Navigation Design',
                image: '/wireframes/fw2.jpg',
                description: 'Refining the user flow through the application with particular attention to the transition between the gallery view and individual artwork pages.'
            },
            {
                title: 'Mobile Experience',
                image: '/wireframes/fw3.jpg',
                description: 'Adapting the grid system for smaller screens while preserving the spatial relationships that give context to each piece.'
            },
            {
                title: 'Initial Concept',
                image: '/wireframes/fw4.jpg',
                description: 'Early exploration of the gallery grid system and navigation. The focus was on creating a framework that could accommodate various art styles while maintaining visual consistency.'
            },
            {
                title: 'Navigation Design',
                image: '/wireframes/fw5.jpg',
                description: 'Refining the user flow through the application with particular attention to the transition between the gallery view and individual artwork pages.'
            },

        ],
        technical: {
            stack: ['React', 'GSAP', 'TailwindCSS', 'Framer Motion', 'Three.js', 'Figma'],
            challenges: [
                'Optimizing loading performance for high-resolution images and maintaining quality across devices',
                'Creating fluid transitions between gallery views without disrupting the user\'s sense of space',
                'Implementing responsive behaviors that maintain compositional integrity at all viewport sizes',
                'Balancing minimalist aesthetics with necessary functionality and accessibility'
            ],
            solutions: [
                'Implemented lazy loading with priority queuing based on viewport proximity',
                'Developed custom GSAP animations with careful timing and easing functions',
                'Created a modular grid system that adapts to different viewports while preserving proportional relationships',
                'Used subtle micro-interactions to enhance usability without compromising the clean visual language'
            ]
        },
        gallery: [
            { type: 'image', src: '/api/placeholder/1200/800', caption: 'Home view of the digital gallery showcasing the grid layout' },
            { type: 'video', src: '/api/placeholder/1200/800', caption: 'Interaction demonstration focusing on the navigation experience' },
            { type: 'image', src: '/api/placeholder/1200/800', caption: '3D element integration allowing spatial exploration of certain artworks' },
            { type: 'image', src: '/api/placeholder/1200/800', caption: 'Artist profile page highlighting contributor information' },
            { type: 'video', src: '/api/placeholder/1200/800', caption: 'Mobile interface demonstration showing adaptive layout' }
        ],
        feedback: [
            {
                name: 'Emily Chen',
                role: 'Urban Artist',
                comment: 'FONTS.LOCAL perfectly captures the essence of street art while making it accessible to people who might never venture into the neighborhoods where these works exist.'
            },
            {
                name: 'Marcus Johnson',
                role: 'Art Director',
                comment: 'The minimal interface lets the artwork breathe. It\'s rare to see a digital platform that respects the work this much while still providing context and navigation.'
            }
        ]
    };

    // Navigation click handler
    const handleNavClick = (section) => {
        setActiveSection(section);
        setMobileMenuOpen(false);

        // In a real implementation, this would use GSAP to animate scrolling
        const sectionEl = sectionRefs[section].current;
        if (sectionEl) {
            sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Gallery navigation
    const navigateGallery = (direction) => {
        const newIndex = direction === 'next'
            ? (mediaIndex + 1) % project.gallery.length
            : (mediaIndex - 1 + project.gallery.length) % project.gallery.length;

        setMediaIndex(newIndex);
    };

    // Navigation to next/prev project
    const handleProjectNavigation = (projectId) => {
        navigate(`/project/${projectId}`);
    };

    // Update cursor appearance based on hovered elements
    const handleCursorEnter = (type) => {
        setCursorType(type);
    };

    const handleCursorLeave = () => {
        setCursorType('default');
    };

    // Detect active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            const visibleSections = {};

            // Check each section's position
            for (const section in sectionRefs) {
                const element = sectionRefs[section].current;
                if (!element) continue;

                const rect = element.getBoundingClientRect();
                const offsetTop = element.offsetTop;
                const offsetHeight = element.offsetHeight;

                visibleSections[section] = (rect.top < window.innerHeight * 0.5 && rect.bottom > 0);

                if (
                    scrollPosition >= offsetTop &&
                    scrollPosition < offsetTop + offsetHeight
                ) {
                    setActiveSection(section);
                }
            }

            setSectionVisibility(visibleSections);
        };

        window.addEventListener('scroll', handleScroll);
        // Initialize on mount
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white text-black font-sans relative">
                {/* Custom cursor */}
                <MouseFollowCursor cursorType={cursorType} />

                {/* Mobile navigation toggle */}
                <div className="lg:hidden fixed top-0 right-0 z-40 p-4">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="bg-white p-2"
                    >
                        <div className={`w-6 h-0.5 bg-black mb-1.5 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-black mb-1.5 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-black transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                    </button>
                </div>

                {/* Mobile navigation menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="lg:hidden fixed top-14 left-0 right-0 bg-white z-30 shadow-md"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <nav className="p-4 border-b border-black/10">
                                <ul className="flex flex-col gap-4 font-ming">
                                    {Object.keys(sectionRefs).map((section, index) => (
                                        <motion.li
                                            key={section}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <button
                                                onClick={() => handleNavClick(section)}
                                                className={`text-left text-sm uppercase tracking-wide py-2 w-full transition-colors ${activeSection === section
                                                    ? 'text-[#CCFF00] bg-black px-2'
                                                    : 'text-[#666] hover:text-black'
                                                    }`}
                                            >
                                                {section}
                                            </button>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Project Header */}
                <ScrollReveal>
                    <header className="pt-8 lg:pt-12 pb-4 lg:pb-6 border-b border-black/10">
                        <div className="container mx-auto px-4 lg:px-8">
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 mb-4">
                                <div>
                                    <motion.h1
                                        className="text-3xl sm:text-4xl lg:text-5xl font-ming leading-tight"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.22, 1, 0.36, 1]
                                        }}
                                    >
                                        <ShinyText text={project.title} speed={5} className="text-black" />
                                    </motion.h1>
                                    <motion.p
                                        className="text-md mt-2 max-w-2xl font-ming text-[#888] italic"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                    >
                                        {project.description}
                                    </motion.p>
                                </div>

                                <motion.div
                                    className="mt-4 sm:mt-0 sm:ml-6 shrink-0"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <span className="text-3xl font-serif text-[#333] font-light">{project.id}</span>
                                </motion.div>
                            </div>

                            {/* Project metadata */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 font-ming">
                                <ScrollReveal delay={0.2}>
                                    <div className="p-4 border border-gray-100 hover:border-[#CCFF00] transition-colors duration-300">
                                        <div className="flex items-center text-sm text-[#666] mb-2">
                                            <Clock className="w-4 h-4 mr-2" />
                                            <span>Timeline</span>
                                        </div>
                                        <p className="text-sm">{project.timeline.start} — {project.timeline.end}</p>
                                        <p className="text-sm text-[#888]">{project.timeline.duration}</p>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal delay={0.3}>
                                    <div className="p-4 border border-gray-100 hover:border-[#CCFF00] transition-colors duration-300">
                                        <div className="flex items-center text-sm text-[#666] mb-2">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            <span>Client</span>
                                        </div>
                                        <p className="text-sm">{project.client.name}</p>
                                        <p className="text-sm text-[#888]">{project.client.industry}</p>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal delay={0.4}>
                                    <div className="p-4 border border-gray-100 hover:border-[#CCFF00] transition-colors duration-300">
                                        <div className="flex items-center text-sm text-[#666] mb-2">
                                            <Users className="w-4 h-4 mr-2" />
                                            <span>Team</span>
                                        </div>
                                        <div className="text-sm">
                                            {project.team.slice(0, 2).map((member, index) => (
                                                <p key={index} className="truncate">
                                                    {member.name}
                                                </p>
                                            ))}
                                            {project.team.length > 2 && (
                                                <p className="text-[#888]">+{project.team.length - 2} more</p>
                                            )}
                                        </div>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal delay={0.5}>
                                    <div className="p-4 border border-gray-100 hover:border-[#CCFF00] transition-colors duration-300">
                                        <div className="flex items-center text-sm text-[#666] mb-2">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            <span>Live Project</span>
                                        </div>
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm text-black bg-[#CCFF00] px-2 py-1 hover:bg-black hover:text-[#CCFF00] transition-colors duration-300 group"
                                            onMouseEnter={() => handleCursorEnter('expand')}
                                            onMouseLeave={handleCursorLeave}
                                        >
                                            Visit Website
                                            <ExternalLink className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </a>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </header>
                </ScrollReveal>

                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left sidebar navigation - hidden on mobile */}
                        <nav
                            ref={sectionNavRef}
                            className="hidden lg:block w-[210px] px-[30px] pt-[80px] sticky top-0 h-screen"
                        >
                            <ul className="space-y-6 font-ming">
                                {Object.keys(sectionRefs).map((section, index) => (
                                    <motion.li key={section} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + (index * 0.1) }}>
                                        <button
                                            onClick={() => handleNavClick(section)}
                                            onMouseEnter={() => handleCursorEnter('expand')}
                                            onMouseLeave={handleCursorLeave}
                                            className={`text-left text-[14px] font-semibold leading-normal tracking-wide transition-all duration-300 relative
                                                ${activeSection === section
                                                    ? 'text-[#CCFF00] bg-black px-2 py-1'
                                                    : 'text-[#666] hover:text-black'
                                                }`}
                                        >
                                            {section.toUpperCase()}
                                        </button>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Project navigation */}
                            <div className="mt-16 pt-6 border-t border-black/10">
                                <div className="space-y-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <p className="text-xs text-[#888] mb-2 uppercase">Navigate</p>
                                        <button
                                            className="text-left text-[14px] w-full font-ming font-semibold group flex items-center text-[#666] hover:text-black hover:bg-[#CCFF00] p-1 transition-colors"
                                            onMouseEnter={() => handleCursorEnter('expand')}
                                            onMouseLeave={handleCursorLeave}
                                            onClick={() => navigate('/')}
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                                            <div>
                                                <div>ALL PROJECTS</div>
                                            </div>
                                        </button>
                                    </motion.div>

                                    <motion.div
                                        className="relative [perspective:1000px] hover:z-10"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9 }}
                                        whileHover={{ scale: 1.03 }}
                                    >
                                        <button
                                            className="text-left w-full"
                                            onMouseEnter={() => handleCursorEnter('expand')}
                                            onMouseLeave={handleCursorLeave}
                                            onClick={() => handleProjectNavigation(project.prevProject.id)}
                                        >
                                            <div className="overflow-hidden border border-gray-200">
                                                <div className="aspect-[4/3] relative overflow-hidden">
                                                    <img
                                                        src={project.prevProject.image}
                                                        alt={project.prevProject.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                                                        <div className="text-white">
                                                            <p className="text-xs text-[#CCFF00]">← Previous</p>
                                                            <p className="font-ming text-sm">{project.prevProject.title}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </motion.div>

                                    <motion.div
                                        className="relative [perspective:1000px] hover:z-10"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.0 }}
                                        whileHover={{ scale: 1.03 }}
                                    >
                                        <button
                                            className="text-left w-full"
                                            onMouseEnter={() => handleCursorEnter('expand')}
                                            onMouseLeave={handleCursorLeave}
                                            onClick={() => handleProjectNavigation(project.nextProject.id)}
                                        >
                                            <div className="overflow-hidden border border-gray-200">
                                                <div className="aspect-[4/3] relative overflow-hidden">
                                                    <img
                                                        src={project.nextProject.image}
                                                        alt={project.nextProject.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-end p-3">
                                                        <div className="text-white text-right">
                                                            <p className="text-xs text-[#CCFF00]">Next →</p>
                                                            <p className="font-ming text-sm">{project.nextProject.title}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </nav>

                        {/* Main content area */}
                        <main
                            ref={mainContentRef}
                            className="flex-1 px-4 sm:px-8 py-8 lg:py-[30px]"
                        >
                            {/* Overview Section */}
                            <section
                                ref={sectionRefs.overview}
                                className="mb-24 sm:mb-32"
                            >
                                <ScrollReveal>
                                    <h2 className="text-xl sm:text-2xl mb-8 font-ming uppercase tracking-wide">
                                        <span className={`px-2 py-1 transition-colors duration-500 ${sectionVisibility.overview ? 'bg-[#CCFF00]' : 'bg-transparent'}`}>
                                            Overview
                                        </span>
                                    </h2>

                                    <div className="space-y-12 font-ming">
                                        <ScrollReveal delay={0.1}>
                                            <div className="p-6 border-l-4 border-[#CCFF00] bg-gray-50">
                                                <h3 className="text-md uppercase tracking-wide mb-3 text-black">The Challenge</h3>
                                                <p className="text-[#666] leading-relaxed">
                                                    {project.overview.challenge}
                                                </p>
                                            </div>
                                        </ScrollReveal>

                                        <ScrollReveal delay={0.2}>
                                            <div className="p-6 border-l-4 border-[#CCFF00] bg-gray-50">
                                                <h3 className="text-md uppercase tracking-wide mb-3 text-black">Our Approach</h3>
                                                <p className="text-[#666] leading-relaxed">
                                                    {project.overview.approach}
                                                </p>
                                            </div>
                                        </ScrollReveal>

                                        <ScrollReveal delay={0.3}>
                                            <div className="p-6 border-l-4 border-[#CCFF00] bg-gray-50">
                                                <h3 className="text-md uppercase tracking-wide mb-3 text-black">The Outcome</h3>
                                                <p className="text-[#666] leading-relaxed">
                                                    {project.overview.outcome}
                                                </p>
                                            </div>
                                        </ScrollReveal>
                                    </div>
                                </ScrollReveal>
                            </section>

                            {/* Wireframes Section */}
                            <section
                                ref={sectionRefs.wireframes}
                                className="mb-24 sm:mb-32"
                            >
                                <ScrollReveal>
                                    <h2 className="text-xl sm:text-2xl mb-8 font-ming uppercase tracking-wide">
                                        <span className={`px-2 py-1 transition-colors duration-500 ${sectionVisibility.wireframes ? 'bg-[#CCFF00]' : 'bg-transparent'}`}>
                                            Wireframes
                                        </span>
                                    </h2>

                                    <div className="space-y-24">
                                        {project.wireframes.map((wireframe, index) => (
                                            <ScrollReveal key={index} delay={index * 0.1}>
                                                <div
                                                    className="group"
                                                    onMouseEnter={() => handleCursorEnter('expand')}
                                                    onMouseLeave={handleCursorLeave}
                                                >
                                                    <TiltedImage
                                                        src={wireframe.image}
                                                        alt={wireframe.title}
                                                    />

                                                    <h3 className="text-lg font-ming mb-2 group-hover:text-[#CCFF00] group-hover:bg-black px-2 inline-block transition-colors">
                                                        {wireframe.title}
                                                    </h3>
                                                    <p className="text-[#888] font-ming italic max-w-3xl">{wireframe.description}</p>
                                                </div>
                                            </ScrollReveal>
                                        ))}
                                    </div>
                                </ScrollReveal>
                            </section>

                            {/* Technical Process Section */}
                            <section
                                ref={sectionRefs.technical}
                                className="mb-24 sm:mb-32"
                            >
                                <ScrollReveal>
                                    <h2 className="text-xl sm:text-2xl mb-8 font-ming uppercase tracking-wide">
                                        <span className={`px-2 py-1 transition-colors duration-500 ${sectionVisibility.technical ? 'bg-[#CCFF00]' : 'bg-transparent'}`}>
                                            Technical Process
                                        </span>
                                    </h2>

                                    <div className="mb-16">
                                        <h3 className="text-md uppercase tracking-wide mb-4 font-ming text-[#666]">Technology Stack</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {project.technical.stack.map((tech, index) => (
                                                <motion.span
                                                    key={index}
                                                    className="px-3 py-1 border border-[#aaa] text-sm font-ming text-[#666] transition-colors"
                                                    whileHover={{
                                                        scale: 1.05,
                                                        backgroundColor: "#CCFF00",
                                                        borderColor: "#CCFF00",
                                                        color: "#000"
                                                    }}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 + (index * 0.05) }}
                                                    onMouseEnter={() => handleCursorEnter('expand')}
                                                    onMouseLeave={handleCursorLeave}
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        <ScrollReveal>
                                            <div className="bg-gray-50 p-6">
                                                <h3 className="text-md uppercase tracking-wide mb-4 font-ming text-black">Challenges</h3>
                                                <ul className="space-y-3 font-ming">
                                                    {project.technical.challenges.map((challenge, index) => (
                                                        <motion.li
                                                            key={index}
                                                            className="flex items-start text-[#666] group"
                                                            whileHover={{ x: 5 }}
                                                            onMouseEnter={() => handleCursorEnter('expand')}
                                                            onMouseLeave={handleCursorLeave}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.2 + (index * 0.1) }}
                                                        >
                                                            <span className="bg-[#CCFF00] text-black mr-3 font-ming px-1 opacity-0 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                                                            <span className="group-hover:text-black transition-colors">
                                                                {challenge}
                                                            </span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </ScrollReveal>

                                        <ScrollReveal delay={0.2}>
                                            <div className="bg-gray-50 p-6">
                                                <h3 className="text-md uppercase tracking-wide mb-4 font-ming text-black">Solutions</h3>
                                                <ul className="space-y-3 font-ming">
                                                    {project.technical.solutions.map((solution, index) => (
                                                        <motion.li
                                                            key={index}
                                                            className="flex items-start text-[#666] group"
                                                            whileHover={{ x: 5 }}
                                                            onMouseEnter={() => handleCursorEnter('expand')}
                                                            onMouseLeave={handleCursorLeave}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.2 + (index * 0.1) }}
                                                        >
                                                            <span className="bg-[#CCFF00] text-black mr-3 font-ming px-1 opacity-0 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                                                            <span className="group-hover:text-black transition-colors">
                                                                {solution}
                                                            </span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </ScrollReveal>
                                    </div>
                                </ScrollReveal>
                            </section>

                            {/* Gallery Section */}
                            <section
                                ref={sectionRefs.gallery}
                                className="mb-24 sm:mb-32"
                            >
                                <ScrollReveal>
                                    <h2 className="text-xl sm:text-2xl mb-8 font-ming uppercase tracking-wide">
                                        <span className={`px-2 py-1 transition-colors duration-500 ${sectionVisibility.gallery ? 'bg-[#CCFF00]' : 'bg-transparent'}`}>
                                            Media Gallery
                                        </span>
                                    </h2>

                                    <div className="relative" onMouseEnter={() => handleCursorEnter('expand')} onMouseLeave={handleCursorLeave}>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={mediaIndex}
                                                className="relative aspect-video bg-gray-100 overflow-hidden"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                {project.gallery[mediaIndex].type === 'video' ? (
                                                    <video
                                                        src={project.gallery[mediaIndex].src}
                                                        className="w-full h-full object-cover"
                                                        controls
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline
                                                    />
                                                ) : (
                                                    <img
                                                        src={project.gallery[mediaIndex].src}
                                                        alt={project.gallery[mediaIndex].caption}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}

                                                <motion.div
                                                    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent"
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    <p className="text-white font-ming italic">
                                                        {project.gallery[mediaIndex].caption}
                                                    </p>
                                                </motion.div>
                                            </motion.div>
                                        </AnimatePresence>

                                        {/* Floating navigation controls */}
                                        <div className="absolute -bottom-6 right-4 flex gap-3">
                                            <motion.button
                                                whileHover={{ scale: 1.1, backgroundColor: "#CCFF00", color: "#000" }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-12 h-12 bg-black text-white flex items-center justify-center shadow-lg"
                                                onClick={() => navigateGallery('prev')}
                                            >
                                                ←
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1, backgroundColor: "#CCFF00", color: "#000" }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-12 h-12 bg-black text-white flex items-center justify-center shadow-lg"
                                                onClick={() => navigateGallery('next')}
                                            >
                                                →
                                            </motion.button>
                                        </div>

                                        <div className="flex gap-2 mt-16 overflow-x-auto pb-2">
                                            {project.gallery.map((item, index) => (
                                                <motion.button
                                                    key={index}
                                                    onClick={() => setMediaIndex(index)}
                                                    className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden border-2 
                                                        ${index === mediaIndex ? 'border-[#CCFF00]' : 'border-transparent opacity-60 hover:opacity-100'} 
                                                        transition-all duration-300`}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {item.type === 'video' ? (
                                                        <video
                                                            src={item.src}
                                                            className="w-full h-full object-cover"
                                                            muted
                                                        />
                                                    ) : (
                                                        <img
                                                            src={item.src}
                                                            alt=""
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </section>

                            {/* Feedback Section */}
                            <section
                                ref={sectionRefs.feedback}
                                className="mb-20"
                            >
                                <ScrollReveal>
                                    <h2 className="text-xl sm:text-2xl mb-8 font-ming uppercase tracking-wide">
                                        <span className={`px-2 py-1 transition-colors duration-500 ${sectionVisibility.feedback ? 'bg-[#CCFF00]' : 'bg-transparent'}`}>
                                            Client Feedback
                                        </span>
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {project.feedback.map((item, index) => (
                                            <ScrollReveal key={index} delay={index * 0.2}>
                                                <motion.div
                                                    className="border border-[#aaa] p-6 relative overflow-hidden group"
                                                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                                    onMouseEnter={() => handleCursorEnter('expand')}
                                                    onMouseLeave={handleCursorLeave}
                                                >
                                                    <div className="relative z-10">
                                                        <blockquote className="text-md font-ming italic mb-6 text-[#666] group-hover:text-black transition-colors">"{item.comment}"</blockquote>
                                                        <div>
                                                            <p className="font-ming">{item.name}</p>
                                                            <p className="text-[#888] text-sm font-ming">{item.role}</p>
                                                        </div>
                                                    </div>
                                                    <motion.div
                                                        className="absolute inset-0 bg-[#CCFF00]/5"
                                                        whileHover={{ opacity: 1 }}
                                                        initial={{ opacity: 0 }}
                                                    />
                                                </motion.div>
                                            </ScrollReveal>
                                        ))}
                                    </div>
                                </ScrollReveal>
                            </section>

                            {/* Mobile project navigation - visible only on mobile */}
                            <div className="lg:hidden border-t border-[#aaa]/30 pt-8">
                                <div className="flex flex-col gap-4 font-ming">
                                    <motion.button
                                        onClick={() => navigate('/')}
                                        className="text-left text-sm group flex items-center text-[#666] bg-[#CCFF00]/10 p-2 hover:bg-[#CCFF00]"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                                        <div>
                                            <div className="text-[#888] text-xs">Back to</div>
                                            <div>PROJECTS</div>
                                        </div>
                                    </motion.button>

                                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                                        <motion.button
                                            onClick={() => handleProjectNavigation(project.prevProject.id)}
                                            className="text-left text-sm group flex items-center relative overflow-hidden"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="aspect-[4/3] w-full sm:w-40 relative overflow-hidden">
                                                <img
                                                    src={project.prevProject.image}
                                                    alt={project.prevProject.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
                                                    <div className="text-white">
                                                        <div className="text-[#CCFF00] text-xs">← Previous</div>
                                                        <div className="text.sm">{project.prevProject.title}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.button>

                                        <motion.button
                                            onClick={() => handleProjectNavigation(project.nextProject.id)}
                                            className="text-right text-sm group flex flex-col-reverse sm:flex-row items-end relative overflow-hidden"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="aspect-[4/3] w-full sm:w-40 relative overflow-hidden">
                                                <img
                                                    src={project.nextProject.image}
                                                    alt={project.nextProject.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-end p-2">
                                                    <div className="text-white text-right">
                                                        <div className="text-[#CCFF00] text-xs">Next →</div>
                                                        <div className="text.sm">{project.nextProject.title}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetailsPage;