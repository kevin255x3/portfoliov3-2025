import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Navbar from './Navbar';
import InfiniteScroll from './InfiniteScroll';
import ShinyText from './ShinyText';
import './PortfolioStyles.css';

// TiltedCard component - borrowed from About page for dimensional consistency
const TiltedCard = ({
    imageSrc,
    altText = "Tilted card image",
    captionText = "",
    containerHeight = "300px",
    containerWidth = "100%",
    imageHeight = "300px",
    imageWidth = "300px",
    scaleOnHover = 1.1,
    rotateAmplitude = 14,
    showMobileWarning = false,
    showTooltip = true,
    overlayContent = null,
    displayOverlayContent = false,
    onClick = () => { },
}) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springValues = {
        damping: 30,
        stiffness: 100,
        mass: 2,
    };
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(1, springValues);
    const opacity = useSpring(0);
    const rotateFigcaption = useSpring(0, {
        stiffness: 350,
        damping: 30,
        mass: 1,
    });
    const [lastY, setLastY] = useState(0);

    function handleMouse(e) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
        rotateX.set(rotationX);
        rotateY.set(rotationY);
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
        const velocityY = offsetY - lastY;
        rotateFigcaption.set(-velocityY * 0.6);
        setLastY(offsetY);
    }

    function handleMouseEnter() {
        scale.set(scaleOnHover);
        opacity.set(1);
    }

    function handleMouseLeave() {
        opacity.set(0);
        scale.set(1);
        rotateX.set(0);
        rotateY.set(0);
        rotateFigcaption.set(0);
    }

    return (
        <figure
            ref={ref}
            className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center cursor-pointer"
            style={{
                height: containerHeight,
                width: containerWidth,
            }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {showMobileWarning && (
                <div className="absolute top-4 text-center text-sm block sm:hidden">
                    This effect is not optimized for mobile. Check on desktop.
                </div>
            )}
            <motion.div
                className="relative [transform-style:preserve-3d]"
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    rotateX,
                    rotateY,
                    scale,
                }}
            >
                <motion.img
                    src={imageSrc}
                    alt={altText}
                    className="absolute top-0 left-0 object-cover will-change-transform [transform:translateZ(0)]"
                    style={{
                        width: imageWidth,
                        height: imageHeight,
                    }}
                />
                {displayOverlayContent && overlayContent && (
                    <motion.div
                        className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]"
                    >
                        {overlayContent}
                    </motion.div>
                )}
            </motion.div>
            {showTooltip && (
                <motion.figcaption
                    className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
                    style={{
                        x,
                        y,
                        opacity,
                        rotate: rotateFigcaption,
                    }}
                >
                    {captionText}
                </motion.figcaption>
            )}
        </figure>
    );
};

const Contact = () => {
    // Original state variables
    const [currentDate] = useState(new Date());
    const [hoverItem, setHoverItem] = useState(null);
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [mobileView, setMobileView] = useState(false);
    const [receiptVisible, setReceiptVisible] = useState(false);
    const receiptRef = useRef(null);

    // Tab state
    const [activeTab, setActiveTab] = useState('contact'); // 'contact', 'process', 'faq'
    const [activeProcessStep, setActiveProcessStep] = useState(0);

    // Ref for container
    const containerRef = useRef(null);

    // Generate a random receipt number
    const receiptNumber = `KL-${Math.floor(10000 + Math.random() * 90000)}`;

    // Check window size for responsive design
    useEffect(() => {
        const checkMobileView = () => {
            setMobileView(window.innerWidth < 768);
        };

        // Initial check
        checkMobileView();

        // Listen for resize events
        window.addEventListener('resize', checkMobileView);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobileView);
    }, []);

    // Simulate receipt printing after page load
    useEffect(() => {
        // Add custom CSS for thermal printer effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes print {
                0% { clip-path: inset(0 0 100% 0); }
                100% { clip-path: inset(0 0 0 0); }
            }
            
            .receipt-paper {
                position: relative;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            
            .receipt-paper::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: repeating-linear-gradient(
                    0deg,
                    rgba(0, 0, 0, 0.03) 0px,
                    rgba(0, 0, 0, 0.03) 1px,
                    transparent 1px,
                    transparent 2px
                );
                pointer-events: none;
                z-index: 1;
            }
            
            .receipt-paper::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(ellipse at top left, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%),
                            radial-gradient(ellipse at bottom right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
                pointer-events: none;
                z-index: 1;
            }
            
            .thermal-line {
                position: relative;
                animation: print 1.5s linear;
            }
        `;
        document.head.appendChild(style);

        const timer = setTimeout(() => {
            setLoadingComplete(true);
            setTimeout(() => {
                setReceiptVisible(true);
            }, 500);
        }, 800);

        return () => {
            document.head.removeChild(style);
            clearTimeout(timer);
        };
    }, []);

    // Format the date for the receipt
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Contact items for the receipt
    const contactItems = [
        {
            id: 'EMAIL-001',
            title: 'Professional Email',
            price: 'FREE',
            value: 'contact@kevinlazo.com',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            id: 'RESUME-001',
            title: 'Resume Download',
            price: 'FREE',
            value: 'Download PDF',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            id: 'LINKEDIN-001',
            title: 'LinkedIn Profile',
            price: 'FREE',
            value: '/in/kevinlazo',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
            )
        },
        {
            id: 'GITHUB-001',
            title: 'GitHub Repository',
            price: 'FREE',
            value: '/kevinlazo',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            )
        },
        {
            id: 'INSTA-001',
            title: 'Instagram',
            price: 'FREE',
            value: '@kevinlazo',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            )
        }
    ];

    // Work process steps
    const workProcessSteps = [
        {
            title: "Initial Conversation",
            description: "We'll discuss your project goals, requirements, timeline, and budget to understand your needs fully.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            )
        },
        {
            title: "Proposal & Agreement",
            description: "Based on our conversation, I'll provide a detailed proposal with scope, timeline, and pricing for your review.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            title: "Research & Planning",
            description: "I'll conduct research, create wireframes, and develop a strategic plan for your project implementation.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            )
        },
        {
            title: "Design & Development",
            description: "I'll create the visual design and build out your project with regular check-ins to ensure it meets your expectations.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            )
        },
        {
            title: "Testing & Refinement",
            description: "Your project will undergo thorough testing and refinement to ensure it works perfectly and matches your vision.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: "Launch & Support",
            description: "After launch, I provide support to ensure everything runs smoothly and help with any necessary adjustments.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            )
        },
    ];

    // FAQ items
    const faqItems = [
        {
            question: 'What services do you offer?',
            answer: 'I specialize in web development, UI/UX design, and creative digital solutions. My services include website design, web application development, interface design, and digital branding.'
        },
        {
            question: 'What is your project process like?',
            answer: 'My process typically includes initial consultation, research and planning, design concepts, development, testing, and launch. I maintain clear communication throughout to ensure your vision is achieved.'
        },
        {
            question: 'How long does a typical project take?',
            answer: 'Project timelines vary based on scope and complexity. A basic website might take 2-4 weeks, while more complex web applications can take 2-3 months or more.'
        },
        {
            question: 'Do you offer ongoing maintenance?',
            answer: 'Yes, I offer website maintenance packages to keep your site updated, secure, and running smoothly after launch.'
        },
        {
            question: 'What is your pricing structure?',
            answer: 'I offer both project-based and hourly pricing depending on your needs. Each quote is customized based on project requirements, timeline, and complexity.'
        }
    ];

    // Items for the infinite scroll component
    const scrollItems = [
        { content: "👋 Say Hello" },
        { content: "📧 Send an Email" },
        { content: "🤝 Let's Collaborate" },
        { content: "💼 Work Together" },
        { content: "🚀 Start a Project" },
        { content: "💡 Share an Idea" },
        { content: "📱 Get in Touch" },
        { content: "🔍 Learn More" }
    ];

    return (
        <div className="min-h-screen bg-white font-ming pt-24" ref={containerRef}>
            {/* Top Banner */}
            <motion.div
                className="bg-[#CCFF00] text-black text-center py-2 text-sm font-ming tracking-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <ShinyText text="FREE ACCESS TO ALL CONTACT METHODS • NO PURCHASE NECESSARY" speed={10} className="text-black font-semibold" />
            </motion.div>

            {/* Main Navigation */}
            <Navbar />

            {/* Main Content Container with Split Layout on Desktop */}
            <div className="container mx-auto px-2 sm:px-4 py-8 pt-20">
                {/* Tab Navigation - Similar to Portfolio page structure */}
                {!mobileView && (
                    <div className="flex border-b border-gray-700 mb-8">
                        <motion.button
                            className={`py-2 px-6 font-ming text-sm uppercase tracking-wider relative ${activeTab === 'contact' ? 'text-[#CCFF00]' : 'text-black'}`}
                            onClick={() => setActiveTab('contact')}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Contact Methods
                            {activeTab === 'contact' && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CCFF00]"
                                    layoutId="activeTabIndicator"
                                />
                            )}
                        </motion.button>
                        <motion.button
                            className={`py-2 px-6 font-ming text-sm uppercase tracking-wider relative ${activeTab === 'process' ? 'text-[#CCFF00]' : 'text-black'}`}
                            onClick={() => setActiveTab('process')}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Work Process
                            {activeTab === 'process' && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CCFF00]"
                                    layoutId="activeTabIndicator"
                                />
                            )}
                        </motion.button>
                        <motion.button
                            className={`py-2 px-6 font-ming text-sm uppercase tracking-wider relative ${activeTab === 'faq' ? 'text-[#CCFF00]' : 'text-black'}`}
                            onClick={() => setActiveTab('faq')}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            FAQ
                            {activeTab === 'faq' && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CCFF00]"
                                    layoutId="activeTabIndicator"
                                />
                            )}
                        </motion.button>
                    </div>
                )}

                {/* Mobile Tab Selection */}
                {mobileView && (
                    <div className="mb-6">
                        <select
                            className="w-full p-2 bg-[#CCFF00] text-black font-ming uppercase text-sm"
                            value={activeTab}
                            onChange={(e) => setActiveTab(e.target.value)}
                        >
                            <option value="contact">Contact Methods</option>
                            <option value="process">Work Process</option>
                            <option value="faq">FAQ</option>
                        </select>
                    </div>
                )}

                {/* Split Layout Container */}
                <div className={`flex flex-col ${!mobileView ? 'md:flex-row gap-8' : ''}`}>
                    {/* Main Content Area */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'contact' && (
                            <motion.div
                                key="contact"
                                className={`${!mobileView ? 'md:w-2/3' : 'w-full'}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Loading Indicator */}
                                <AnimatePresence>
                                    {!loadingComplete && (
                                        <motion.div
                                            className="flex flex-col items-center justify-center h-64 text-gray-800"
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="relative w-20 h-20">
                                                <AnimatePresence>
                                                    {loadingComplete && (
                                                        <motion.div
                                                            className="absolute -top-1 -right-1 w-32 h-32 rotate-[25deg]"
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: 3.0, type: "spring", damping: 12 }}
                                                        >
                                                            <div className="w-full h-full border-l-2 border-dashed border-gray-300"></div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence><motion.div
                                                    className="absolute top-0 left-0 w-full h-full border-t-2 border-[#CCFF00] rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                            </div>
                                            <motion.p
                                                className="mt-4 text-sm"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                Printing receipt...
                                            </motion.p>
                                            {/* Added thermal printer sound effect */}
                                            {!loadingComplete && <audio src="https://assets.mixkit.co/sfx/preview/mixkit-fast-small-sweep-transition-166.mp3" autoPlay />}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Receipt Paper */}
                                <AnimatePresence>
                                    {receiptVisible && (
                                        <motion.div
                                            className="bg-white border border-gray-200 shadow-xl relative overflow-hidden receipt-paper"
                                            ref={receiptRef}
                                            initial={{ opacity: 0, y: -50, height: 0 }}
                                            animate={{ opacity: 1, y: 0, height: "auto" }}
                                            transition={{ duration: 0.8, type: "spring", damping: 15 }}
                                            style={{
                                                backgroundImage: `
                                                    linear-gradient(rgba(255, 255, 255, 0.8) 0.5px, transparent 0.5px), 
                                                    linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
                                                `,
                                                backgroundSize: '100% 2px, 4px 100%'
                                            }}
                                        >
                                            {/* Digital Stamp */}
                                            <motion.div
                                                className="absolute right-8 bottom-48 rotate-[20deg] z-10 opacity-90"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 0.9 }}
                                                transition={{ delay: 2.7, type: "spring", damping: 10 }}
                                            >
                                                <div className="border-4 border-[#ff5252] rounded-lg p-2 w-24 h-24 flex items-center justify-center">
                                                    <ShinyText
                                                        text="APPROVED"
                                                        speed={5}
                                                        className="text-[#ff5252] font-extrabold text-xl rotate-[-5deg]"
                                                    />
                                                </div>
                                            </motion.div>

                                            {/* Perforated Top */}
                                            <div className="w-full flex justify-between items-center py-1 px-4 border-b border-dashed border-gray-300">
                                                {[...Array(15)].map((_, i) => (
                                                    <div key={i} className="w-4 h-2 bg-gray-200"></div>
                                                ))}
                                            </div>

                                            <div className="p-3 sm:p-6 md:p-8">
                                                {/* Receipt Header */}
                                                <motion.div
                                                    className="text-center border-b border-dashed border-gray-300 pb-6 mb-6"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.3, duration: 0.5 }}
                                                >
                                                    <motion.h1
                                                        className="text-2xl font-ming uppercase tracking-wider mb-1"
                                                        initial={{ y: -20 }}
                                                        animate={{ y: 0 }}
                                                        transition={{ delay: 0.4, type: "spring" }}
                                                    >
                                                        <ShinyText text="Kevin Lazo" speed={7} className="text-black" />
                                                    </motion.h1>
                                                    <motion.p
                                                        className="text-gray-500 text-sm mb-2"
                                                        initial={{ y: -20 }}
                                                        animate={{ y: 0 }}
                                                        transition={{ delay: 0.5, type: "spring" }}
                                                    >
                                                        Web Developer & Designer
                                                    </motion.p>
                                                    <motion.p
                                                        className="text-xs text-gray-500"
                                                        initial={{ y: -20 }}
                                                        animate={{ y: 0 }}
                                                        transition={{ delay: 0.6, type: "spring" }}
                                                    >
                                                        <ShinyText text="CONTACT RECEIPT" speed={8} className="text-gray-800 font-bold" />
                                                    </motion.p>
                                                    <motion.div
                                                        className="flex justify-between text-xs text-gray-500 mt-4"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.7 }}
                                                    >
                                                        <span>Date: {formatDate(currentDate)}</span>
                                                        <span>Time: {formatTime(currentDate)}</span>
                                                    </motion.div>
                                                    <motion.div
                                                        className="flex justify-between text-xs text-gray-500 mt-1"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.8 }}
                                                    >
                                                        <span>Receipt #: {receiptNumber}</span>
                                                        <span>Customer: Valued Visitor</span>
                                                    </motion.div>
                                                </motion.div>

                                                {/* Receipt Items */}
                                                <motion.div
                                                    className="mb-6"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.9 }}
                                                >
                                                    <div className="flex justify-between text-xs uppercase font-bold border-b border-gray-200 pb-2 mb-4">
                                                        <span className="w-1/12">QTY</span>
                                                        <span className="w-2/12">SKU</span>
                                                        <span className="w-5/12">ITEM</span>
                                                        <span className="w-4/12 text-right">CONTACT INFO</span>
                                                    </div>

                                                    {/* Connection items with shiny effect when hovered */}
                                                    {contactItems.map((item, index) => (
                                                        <motion.div
                                                            key={index}
                                                            className={`flex justify-between text-sm py-3 border-b border-dotted border-gray-200 ${hoverItem === index ? 'bg-gray-50' : ''}`}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.9 + (index * 0.1) }}
                                                            onMouseEnter={() => setHoverItem(index)}
                                                            onMouseLeave={() => setHoverItem(null)}
                                                            whileHover={{ backgroundColor: "rgba(204, 255, 0, 0.1)" }}
                                                        >
                                                            <span className="w-1/12">1</span>
                                                            <span className="w-2/12 text-gray-500 text-xs">{item.id}</span>
                                                            <span className="w-5/12 font-ming flex items-center">
                                                                {hoverItem === index && (
                                                                    <motion.span
                                                                        initial={{ opacity: 0, scale: 0 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        transition={{ duration: 0.2 }}
                                                                    >
                                                                        {item.icon}
                                                                    </motion.span>
                                                                )}
                                                                {hoverItem === index ?
                                                                    <ShinyText text={item.title} speed={4} className="text-black" /> :
                                                                    item.title
                                                                }
                                                            </span>
                                                            <span className="w-4/12 text-right">
                                                                {item.id === 'RESUME-001' ? (
                                                                    <motion.a
                                                                        href="#"
                                                                        className="text-black underline hover:text-[#CCFF00] hover:bg-black px-1 transition-colors duration-150"
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                    >
                                                                        {item.value}
                                                                    </motion.a>
                                                                ) : item.id.includes('LINKEDIN') || item.id.includes('GITHUB') || item.id.includes('INSTA') ? (
                                                                    <motion.a
                                                                        href="#"
                                                                        className="text-black hover:text-[#CCFF00] hover:bg-black px-1 transition-colors duration-150"
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                    >
                                                                        {item.value}
                                                                    </motion.a>
                                                                ) : (
                                                                    <span>{item.value}</span>
                                                                )}
                                                            </span>
                                                        </motion.div>
                                                    ))}
                                                </motion.div>

                                                {/* Receipt Totals */}
                                                <motion.div
                                                    className="border-t border-dashed border-gray-300 pt-4 pb-6"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 1.4 }}
                                                >
                                                    <div className="flex justify-between mb-2">
                                                        <span className="text-sm">Subtotal:</span>
                                                        <span className="text-sm">$0.00</span>
                                                    </div>
                                                    <div className="flex justify-between mb-2">
                                                        <span className="text-sm">Tax:</span>
                                                        <span className="text-sm">$0.00</span>
                                                    </div>
                                                    <motion.div
                                                        className="flex justify-between font-bold"
                                                        initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                                                        animate={{ backgroundColor: ["rgba(0,0,0,0)", "rgba(204, 255, 0, 0.2)", "rgba(0,0,0,0)"] }}
                                                        transition={{ delay: 1.6, duration: 2, times: [0, 0.5, 1] }}
                                                    >
                                                        <span>TOTAL:</span>
                                                        <span><ShinyText text="FREE" speed={3} className="text-black font-bold text-lg" /></span>
                                                    </motion.div>
                                                    <div className="text-center mt-6 text-xs text-gray-500">
                                                        * All contact methods are provided at no cost.
                                                    </div>
                                                </motion.div>

                                                {/* Infinite Scroll Section */}
                                                <motion.div
                                                    className="border-t border-dashed border-gray-300 pt-6 mt-6"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 1.8 }}
                                                >
                                                    <h2 className="font-ming text-lg uppercase mb-4 tracking-wider text-center">Connect with Me</h2>

                                                    <div className="h-24 mb-6">
                                                        <InfiniteScroll
                                                            items={scrollItems}
                                                            autoplay={true}
                                                            autoplaySpeed={0.5}
                                                            pauseOnHover={true}
                                                            itemMinHeight={60}
                                                            negativeMargin="-0.25em"
                                                            width="100%"
                                                        />
                                                    </div>
                                                </motion.div>

                                                {/* Receipt Footer */}
                                                <motion.div
                                                    className="border-t border-dashed border-gray-300 pt-6 mt-6 text-center"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 2.2 }}
                                                >
                                                    <p className="text-sm mb-2"><ShinyText text="THANK YOU FOR YOUR INTEREST" speed={6} className="text-black font-ming" /></p>
                                                    <p className="text-xs text-gray-500 mb-2">LOOKING FORWARD TO WORKING TOGETHER</p>
                                                    <div className="flex justify-center space-x-2 mt-4">
                                                        {/* Social Icons */}
                                                        <motion.a
                                                            href="#"
                                                            className="p-2 bg-gray-100 hover:bg-[#CCFF00] transition-colors duration-200"
                                                            whileHover={{ y: -2, backgroundColor: "#CCFF00" }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                                            </svg>
                                                        </motion.a>
                                                        <motion.a
                                                            href="#"
                                                            className="p-2 bg-gray-100 hover:bg-[#CCFF00] transition-colors duration-200"
                                                            whileHover={{ y: -2, backgroundColor: "#CCFF00" }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                            </svg>
                                                        </motion.a>
                                                        <motion.a
                                                            href="#"
                                                            className="p-2 bg-gray-100 hover:bg-[#CCFF00] transition-colors duration-200"
                                                            whileHover={{ y: -2, backgroundColor: "#CCFF00" }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                            </svg>
                                                        </motion.a>
                                                        <motion.a
                                                            href="#"
                                                            className="p-2 bg-gray-100 hover:bg-[#CCFF00] transition-colors duration-200"
                                                            whileHover={{ y: -2, backgroundColor: "#CCFF00" }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                                            </svg>
                                                        </motion.a>
                                                    </div>

                                                    {/* Barcode - Just for visual effect */}
                                                    <motion.div
                                                        className="mt-6 flex justify-center"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 2.4 }}
                                                    >
                                                        <div className="h-12 w-48 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAAkAAAABCAMAAAC5K7JUAAAAA1BMVEUAAACnej3aAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==')]">
                                                        </div>
                                                    </motion.div>
                                                    <motion.p
                                                        className="text-xs text-gray-400 mt-2"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 2.5 }}
                                                    >
                                                        {receiptNumber}
                                                    </motion.p>
                                                </motion.div>
                                            </div>

                                            {/* Perforated Bottom */}
                                            <div className="w-full flex justify-between items-center py-1 px-4 border-t border-dashed border-gray-300">
                                                {[...Array(15)].map((_, i) => (
                                                    <div key={i} className="w-4 h-2 bg-gray-200"></div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}

                        {activeTab === 'process' && (
                            <motion.div
                                key="process"
                                className={`${!mobileView ? 'md:w-2/3' : 'w-full'}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="bg-white p-6 shadow-xl">
                                    <h2 className="text-2xl font-ming uppercase tracking-wider mb-6">My Work Process</h2>

                                    {/* Process timeline with square icons */}
                                    <div className="relative space-y-8 pl-10 before:absolute before:top-2 before:bottom-0 before:left-4 before:w-0.5 before:bg-gray-200">
                                        {workProcessSteps.map((step, index) => (
                                            <motion.div
                                                key={index}
                                                className="relative"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                                whileHover={{ x: 5 }}
                                                onMouseEnter={() => setActiveProcessStep(index)}
                                            >
                                                <div className={`absolute top-0 left-[-30px] flex items-center justify-center w-8 h-8 z-10 ${activeProcessStep === index ? 'bg-[#CCFF00]' : 'bg-white border border-gray-200'}`}>
                                                    {step.icon}
                                                </div>

                                                <div className={`p-4 ${activeProcessStep === index ? 'bg-gray-50' : ''}`}>
                                                    <h3 className="text-lg font-ming mb-2">{step.title}</h3>
                                                    <p className="text-gray-600">{step.description}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="mt-8 p-6 bg-gray-50 border-l-4 border-[#CCFF00]">
                                        <h3 className="font-ming text-lg mb-2">Ready to start a project?</h3>
                                        <p className="text-gray-600 mb-4">Feel free to reach out directly and we can discuss your ideas and requirements.</p>
                                        <motion.a
                                            href="mailto:contact@kevinlazo.com"
                                            className="inline-block bg-black text-white py-2 px-6 font-ming text-sm uppercase"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Email Me
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'faq' && (
                            <motion.div
                                key="faq"
                                className={`${!mobileView ? 'md:w-2/3' : 'w-full'}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="bg-white p-6 shadow-xl">
                                    <h2 className="text-2xl font-ming uppercase tracking-wider mb-8">Frequently Asked Questions</h2>

                                    <div className="space-y-6">
                                        {faqItems.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                className="border-b border-gray-200 pb-6"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                                whileHover={{ x: 5 }}
                                            >
                                                <h3 className="text-lg font-ming mb-2">{item.question}</h3>
                                                <p className="text-gray-600">{item.answer}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <motion.div
                                        className="mt-8 p-6 bg-gray-50 border-l-4 border-[#CCFF00]"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6, duration: 0.4 }}
                                    >
                                        <h3 className="font-ming text-lg mb-2">Have another question?</h3>
                                        <p className="text-gray-600 mb-4">Feel free to reach out directly and I'll get back to you as soon as possible.</p>
                                        <motion.a
                                            href="mailto:contact@kevinlazo.com"
                                            className="inline-block bg-black text-white py-2 px-6 font-ming text-sm uppercase"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Contact Me
                                        </motion.a>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Right Column - Similar to About page sidebar */}
                    {!mobileView && (
                        <div className="md:w-1/3">
                            {/* Profile Card with 3D Tilt Effect */}
                            <motion.div
                                className="mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                            >
                                <TiltedCard
                                    imageSrc="/img/who1.jpeg"
                                    altText="Kevin Lazo Profile"
                                    captionText="Kevin Lazo - Web Developer & Designer"
                                    containerHeight="320px"
                                    containerWidth="100%"
                                    imageWidth="100%"
                                    imageHeight="320px"
                                    scaleOnHover={1.04}
                                    rotateAmplitude={7}
                                    showTooltip={true}
                                    displayOverlayContent={true}
                                    overlayContent={
                                        <div className="w-full h-full flex flex-col justify-end p-4">
                                            <div className="bg-black bg-opacity-70 p-3 text-white">
                                                <h2 className="font-ming text-lg">Kevin Lazo</h2>
                                                <p className="text-sm text-[#CCFF00]">Web Developer & Designer</p>
                                            </div>
                                        </div>
                                    }
                                />
                            </motion.div>

                            {/* Navigation Sidebar */}
                            <motion.div
                                className="bg-white p-6 shadow-md mb-8 sticky top-24"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                            >
                                <h3 className="font-ming text-lg uppercase mb-4">Quick Navigation</h3>
                                <ul className="space-y-3">
                                    <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <button
                                            onClick={() => setActiveTab('contact')}
                                            className={`text-left w-full py-2 border-b border-gray-100 ${activeTab === 'contact' ? 'text-[#CCFF00] bg-black px-2' : 'text-gray-700'}`}
                                        >
                                            Contact Methods
                                        </button>
                                    </motion.li>
                                    <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <button
                                            onClick={() => setActiveTab('process')}
                                            className={`text-left w-full py-2 border-b border-gray-100 ${activeTab === 'process' ? 'text-[#CCFF00] bg-black px-2' : 'text-gray-700'}`}
                                        >
                                            Work Process
                                        </button>
                                    </motion.li>
                                    <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <button
                                            onClick={() => setActiveTab('faq')}
                                            className={`text-left w-full py-2 border-b border-gray-100 ${activeTab === 'faq' ? 'text-[#CCFF00] bg-black px-2' : 'text-gray-700'}`}
                                        >
                                            FAQ
                                        </button>
                                    </motion.li>
                                </ul>
                            </motion.div>

                            {/* Call to Action Box */}
                            <motion.div
                                className="bg-[#CCFF00] p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                            >
                                <h3 className="font-ming text-lg uppercase mb-3">Get In Touch</h3>
                                <p className="mb-4 text-sm">Looking forward to connecting and bringing your ideas to life.</p>
                                <motion.a
                                    href="mailto:contact@kevinlazo.com"
                                    className="inline-block w-full bg-black text-white py-3 text-center font-ming text-sm uppercase"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Email Me Directly
                                </motion.a>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;