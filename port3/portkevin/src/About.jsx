import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import './PortfolioStyles.css';
import CircularGallery from './CircularGallery';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import * as THREE from 'three';

// Tilted Card Component
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

const About = () => {
    // State management
    const [activeProduct, setActiveProduct] = useState('tldr');
    const [mobileView, setMobileView] = useState(window.innerWidth < 768);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState('M');
    const [cartItems, setCartItems] = useState([]);
    const [cookieAccepted, setCookieAccepted] = useState(false);
    const [showProductGrid, setShowProductGrid] = useState(true);
    const [cartOpen, setCartOpen] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const [showcaseMode, setShowcaseMode] = useState(false);
    const [animating, setAnimating] = useState(false);
    const productDetailRef = useRef(null);

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

    // Add to cart functionality
    const addToCart = () => {
        const newItem = {
            ...products[activeProduct],
            size: selectedSize,
            quantity: 1
        };

        // Check if product already exists in cart
        const existingItemIndex = cartItems.findIndex(item => item.id === newItem.id);

        if (existingItemIndex >= 0) {
            // Update quantity if item exists
            const updatedCart = [...cartItems];
            updatedCart[existingItemIndex].quantity += 1;
            setCartItems(updatedCart);
        } else {
            // Add new item if it doesn't exist
            setCartItems([...cartItems, newItem]);
        }

        // Animate notification
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    // Toggle cart open/closed
    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    // View product from cart
    const viewProductFromCart = (productKey) => {
        setActiveProduct(productKey);
        setShowProductGrid(false);
        setCartOpen(false);
    };

    // Products (sections of information)
    const products = {
        tldr: {
            id: "KL-2401",
            key: "tldr",
            title: "tldr package",
            price: "$0.00",
            salePrice: "FREE",
            onSale: true,
            description: "For the reader on the go.",
            details: [
                "Hey my name is Kevin",
                "I design and I code. I do everything in between.",
                "My specialty is Web Design and UI/UX Design.",
                "I am open to holistic design practices and enjoy online experiences and tangible products equally.",
                "I am figuring out what design means to me, and I learn the current industry software.",
                "Technology changes and so can I",
                "I am adaptable, optimistic, and a student at every level."
            ],
            color: "DIGITAL",
            inStock: true,
            rating: 5.0,
            reviewCount: 12,
            images: [
                "/img/who1.jpeg",
                "/img/who2.jpg",
                "/img/who3.png"
            ],
            related: ["origin", "skills"]
        },
        origin: {
            id: "KL-2402",
            key: "origin",
            title: "while(growing){learn()}",
            price: "$0.00",
            salePrice: "FREE",
            onSale: true,
            description: "My orgins. Maybe you are wondering how I ended up here.",
            details: [
                "I'm a kid still. I enjoy videogames, film, cartoons and sports. They have all crept their way into my designs and influence me.",
                "My earliest design took form as comic sketches, visual storytelling with my mother's camera, skits, and lunch room freestyles. I developed my ability to solve problems through play.",
                "I grew up Filipino Canadian. Being a first generation immigrant gave me dual perspective and affects my approach to human centered design. I know what a community feels like, and I know what convience feels like. Equipped with a double culture upbringing - I believe I am unique in that sense. My X Factor.",
                "My sense of play and passion for creating led me to BCIT. I found new toys to play with and learned how to build cool things with them. Like an artist having more colors to paint with. A musician with a new instrument."

            ],
            color: "DIGITAL",
            inStock: true,
            rating: 4.9,
            reviewCount: 8,
            images: [
                "/img/his1.jpg",
                "/img/his2.jpg",
                "/img/his3.JPG"
            ],
            related: ["tldr", "philosophy"]
        },
        philosophy: {
            id: "KL-2403",
            key: "philosophy",
            title: "!important Principles",
            price: "$0.00",
            salePrice: "FREE",
            onSale: true,
            description: "My current values and dogma in design.",
            details: [
                "Minimalism can be a great tool to preserve attention on essential elements. I try to use it intelligently and intentionally.",
                "Composition can make or break your design I believe. I rely on grid systems, and information hierarchy. Basics that work.",
                "As a designer I concentrate on 3 constant characteristics.",
                "Functionality - The product is designed to deliver on the promise without additional challenges. I will not try to confuse you.",
                "Intuition - The product should not require instructions. The flow should feel natural, things work as expected and a continual flow between seperate sections is present.",
                "Spice - The product should have a unique feeling/texture/flavor. A pleasant surprise, a delightful interaction, a memorable experience.",
                "I respect design fundamentals while encouraging creativity."
            ],
            color: "DIGITAL",
            inStock: true,
            rating: 4.7,
            reviewCount: 6,
            images: [
                "/img/principles1.png",
                "/img/principles2.png",
                "/img/placeholder-2.jpg"
            ],
            related: ["origin", "skills"]
        },
        skills: {
            id: "KL-2404",
            key: "skills",
            title: "404: Skills Not Found (Just Kidding!)",
            price: "$0.00",
            salePrice: "FREE",
            onSale: true,
            description: "My Skillset. Digital - Physical and all that is between.",
            details: [
                "Design - Rapid Prototyping, UI Design, UX Design, UX Research, Information Hierarchy, Grid Layouts ",
                "Development - HTML, CSS, Javascript, React, React Native, TailwindCSS, GSAP, Framer Motion, Three.js, Wordpress",
                "Interactive - TouchDesigner",
                "Media - Adobe Premiere Pro, Adobe After Effects, Adobe Dimension, Adobe Photoshop, Adobe Illustrator, Adobe Indesign"
            ],
            color: "DIGITAL",
            inStock: true,
            rating: 4.8,
            reviewCount: 10,
            images: [
                "/img/placeholder-4.jpg",
                "/img/placeholder-1.jpg",
                "/img/placeholder-2.jpg"
            ],
            related: ["tldr", "philosophy"]
        },
        beyond: {
            id: "KL-2405",
            key: "beyond",
            title: "beyond design",
            price: "$0.00",
            salePrice: "FREE",
            onSale: true,
            description: "My life. What else I do with my time.",
            details: [
                "I enjoy watching movies, playing basketball and hanging out with friends.",
                "I have long rooted interest in sports and would love to debate who your basketball GOAT is.",
                "I have four years of experience in food and hospitality and experiment with different cuisines - dinner at my place.",
                "I am passionate about fashion - but have grown out of consumer culture. Nowadays I wear only black and just window shop. Would love to see your style if you are actively collecting.",
                "I read. A lot about neuroscience, but I enjoy most genres. Would love to hear what you're currently reading.",
                "Enjoy the rest of your day",
            ],
            color: "DIGITAL",
            inStock: true,
            rating: 4.9,
            reviewCount: 7,
            images: [
                "/img/beyond1.JPG",
                "/img/beyond2.JPG",
                "/img/beyond4.JPG"
            ],
            related: ["philosophy", "skills"]
        }
    };

    // Prepare items for CircularGallery with links to product pages
    const galleryItems = Object.values(products).map(product => ({
        image: product.images[0],
        text: product.title,
        onClick: () => handleProductChange(product.key)
    }));

    // Handle product selection change
    const handleProductChange = (productKey) => {
        setAnimating(true);
        setTimeout(() => {
            setActiveProduct(productKey);
            setActiveImage(0);
            setShowProductGrid(false);
            setAnimating(false);

            // Scroll to product detail section
            if (productDetailRef.current && !showProductGrid) {
                productDetailRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);

        if (mobileView) {
            setMobileMenuOpen(false);
        }
    };

    // Handle showcase mode toggle
    const toggleShowcaseMode = () => {
        setShowcaseMode(!showcaseMode);
    };

    // Handle cookie acceptance
    const handleCookieAccept = () => {
        setCookieAccepted(true);
    };

    // Go back to product grid
    const backToGrid = () => {
        setShowProductGrid(true);
        setShowcaseMode(false);
    };

    // Current product
    const currentProduct = products[activeProduct];

    return (
        <div className="min-h-screen bg-white font-ming pt-24">
            {/* Top Banner */}
            <motion.div
                className="bg-[#CCFF00] text-black text-center py-2 text-sm font-ming tracking-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                FREE ACCESS TO ALL INFORMATION • LIMITED TIME OFFER
            </motion.div>

            {/* Main Navigation */}
            <Navbar />

            {/* Cart Icon */}
            <div className="fixed top-24 right-4 z-40">
                <div className="relative">
                    <motion.button
                        className="p-2 bg-white shadow-sm"
                        onClick={toggleCart}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </motion.button>
                    {cartItems.length > 0 && (
                        <motion.div
                            className="absolute -top-1 -right-1 bg-[#CCFF00] text-black w-5 h-5 flex items-center justify-center text-xs font-bold"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                            {cartItems.length}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Showcase Mode Toggle - REMOVED */}

            {/* Cart Drawer */}
            <AnimatePresence>
                {cartOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black bg-opacity-50"
                            onClick={toggleCart}
                        ></div>

                        {/* Cart Panel */}
                        <motion.div
                            className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl overflow-y-auto"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-lg font-ming uppercase">Your Interests ({cartItems.length})</h2>
                                <button onClick={toggleCart} className="text-gray-500 hover:text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {cartItems.length === 0 ? (
                                <div className="p-8 text-center">
                                    <p className="text-gray-500 mb-4">Your interest list is empty</p>
                                    <motion.button
                                        onClick={toggleCart}
                                        className="bg-black text-white px-4 py-2 text-sm uppercase"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Continue Browsing
                                    </motion.button>
                                </div>
                            ) : (
                                <div>
                                    <div className="divide-y divide-gray-200">
                                        {cartItems.map(item => (
                                            <motion.div
                                                key={item.id}
                                                className="p-4 flex"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="w-20 h-20 bg-gray-100 flex items-center justify-center mr-4 overflow-hidden">
                                                    {item.images && item.images.length > 0 ? (
                                                        <img
                                                            src={item.images[0]}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-xl font-bold text-gray-400">{item.id}</span>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <h3 className="font-ming">{item.title}</h3>
                                                        <motion.button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-gray-400 hover:text-black"
                                                            whileHover={{ scale: 1.2 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </motion.button>
                                                    </div>
                                                    <div className="mt-1 text-sm text-gray-500">
                                                        Size: {item.size} | Type: {item.color}
                                                    </div>
                                                    <div className="mt-1 text-sm">{item.salePrice}</div>
                                                    <motion.button
                                                        onClick={() => viewProductFromCart(item.key)}
                                                        className="mt-2 text-xs underline text-gray-500 hover:text-black"
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        View Details
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="p-4 border-t border-gray-200">
                                        <div className="flex justify-between mb-4">
                                            <span>Subtotal</span>
                                            <span>FREE</span>
                                        </div>
                                        <motion.button
                                            className="w-full bg-black text-white py-3 uppercase font-ming"
                                            whileHover={{ backgroundColor: "#333" }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Checkout
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add to Cart Notification */}
            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        className="fixed top-20 right-4 bg-[#CCFF00] text-black p-3 shadow-md z-50 rounded-md"
                        initial={{ opacity: 0, y: -50, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", damping: 15 }}
                    >
                        Item added to your interests!
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Toggle - REMOVED */}

            {/* Mobile Navigation Menu - REMOVED */}

            <div className="container mx-auto px-4 py-8 pt-20">
                {showProductGrid ? (
                    // Product Grid or Gallery View
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-2xl font-ming mb-8 uppercase tracking-wider">About Me Collection</h1>

                        <div className="relative h-96 md:h-[32rem] mb-12 border border-gray-200">
                            <CircularGallery
                                items={galleryItems}
                                bend={3}
                                textColor="#000000"
                                borderRadius={0.05}
                                font="bold 24px 'Ming', sans-serif"
                            />

                            <div className="hidden md:block absolute bottom-4 left-0 right-0 text-center">
                                <div className="flex justify-center gap-4">
                                    {Object.entries(products).slice(0, 5).map(([key, product]) => (
                                        <motion.button
                                            key={key}
                                            onClick={() => handleProductChange(key)}
                                            className="bg-black text-white px-4 py-2 text-xs uppercase"
                                            whileHover={{ scale: 1.05, backgroundColor: "#333" }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {product.title}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {Object.entries(products).map(([key, product]) => (
                                <motion.div
                                    key={key}
                                    className="border border-gray-200 group cursor-pointer"
                                    onClick={() => handleProductChange(key)}
                                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <div className="aspect-square bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition duration-200 overflow-hidden">
                                        {product.images && product.images.length > 0 ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <span className="text-3xl font-bold text-gray-400">{product.id}</span>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-ming text-sm uppercase group-hover:text-[#CCFF00] group-hover:bg-black px-1 transition-colors duration-200 inline-block">{product.title}</h3>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-sm">{product.salePrice}</p>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} stroke="currentColor" className="w-3 h-3 text-yellow-400">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={i < Math.floor(product.rating) ? 0 : 1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    // Product Detail View
                    <div>
                        {/* Mobile Back Button - Only visible on mobile and in detail view */}
                        {mobileView && (
                            <motion.button
                                onClick={backToGrid}
                                className="w-full bg-black text-white py-2 mb-6 text-sm uppercase"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                Back to Products
                            </motion.button>
                        )}

                        {/* Breadcrumbs Navigation */}
                        <motion.div
                            className="text-xs mb-6 font-ming tracking-tight"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                        >
                            <button onClick={backToGrid} className="text-gray-500 hover:text-black">PRODUCTS</button>
                            <span className="mx-2">/</span>
                            <span>{currentProduct.title}</span>
                        </motion.div>

                        {/* Standard Product Detail View with animations */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProduct}
                                className="flex flex-col md:flex-row"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                ref={productDetailRef}
                            >
                                {/* Left Sidebar - Navigation (Desktop Only) */}
                                {!mobileView && (
                                    <motion.div
                                        className="w-64 pr-8"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2, duration: 0.4 }}
                                    >
                                        <div className="sticky top-24">
                                            <h2 className="font-ming text-lg mb-6 uppercase font-bold">KEVIN LAZO</h2>

                                            <div className="mb-8">
                                                <h3 className="text-sm uppercase mb-4 font-bold border-b border-gray-200 pb-2">SHOP INFO</h3>
                                                <ul className="space-y-3">
                                                    {Object.entries(products).map(([key, product]) => (
                                                        <motion.li
                                                            key={key}
                                                            whileHover={{ x: 3 }}
                                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                        >
                                                            <button
                                                                onClick={() => handleProductChange(key)}
                                                                className={`text-left text-sm uppercase w-full transition-all duration-150 ${activeProduct === key ? 'font-bold text-black' : 'text-gray-700 hover:text-black'
                                                                    }`}
                                                            >
                                                                {product.title}
                                                            </button>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <motion.div
                                                className="mt-12 pt-6 border-t border-gray-200"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4, duration: 0.4 }}
                                            >
                                                <p className="text-gray-500 uppercase text-xs">Kevin Lazo</p>
                                                <p className="text-gray-500 uppercase text-xs">Web Developer & Designer</p>
                                                <p className="text-gray-500 uppercase text-xs">2024</p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Main Content - Product Display */}
                                <div className="flex-1">
                                    <div className="md:grid md:grid-cols-2 md:gap-12">
                                        {/* Product Images */}
                                        <motion.div
                                            className="mb-8 md:mb-0"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {/* Main Image */}
                                            <motion.div
                                                className="aspect-square bg-gray-100 flex items-center justify-center mb-4 overflow-hidden relative cursor-pointer"
                                                whileHover={{ scale: 1.02 }}
                                                onClick={toggleShowcaseMode}
                                            >
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={activeImage}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="w-full h-full"
                                                    >
                                                        {currentProduct.images && currentProduct.images.length > 0 ? (
                                                            <img
                                                                src={currentProduct.images[activeImage]}
                                                                alt={`${currentProduct.title} - Image ${activeImage + 1}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                                <span className="text-6xl font-bold text-gray-400">{currentProduct.id}</span>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                </AnimatePresence>

                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300">
                                                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                                                        <motion.div
                                                            className="bg-white p-2 rounded-full"
                                                            whileHover={{ scale: 1.1 }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                                            </svg>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Thumbnail Gallery */}
                                            <div className="grid grid-cols-3 gap-2">
                                                {currentProduct.images.map((image, index) => (
                                                    <motion.button
                                                        key={index}
                                                        className={`aspect-square bg-gray-100 ${activeImage === index ? 'ring-2 ring-black' : ''}`}
                                                        onClick={() => setActiveImage(index)}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <img
                                                            src={image}
                                                            alt={`Thumbnail ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>

                                        {/* Product Info */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.5 }}
                                        >
                                            <div className="text-gray-500 uppercase text-xs mb-2 tracking-tight">{`REF: ${currentProduct.id}`}</div>
                                            <motion.h1
                                                className="text-2xl md:text-3xl font-ming mb-2"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3, duration: 0.4 }}
                                            >
                                                {currentProduct.title}
                                            </motion.h1>

                                            {/* Rating */}
                                            <div className="flex items-center mb-4">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <motion.svg
                                                            key={i}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill={i < Math.floor(currentProduct.rating) ? "currentColor" : "none"}
                                                            stroke="currentColor"
                                                            className="w-4 h-4 text-yellow-400"
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: 0.3 + (i * 0.1), duration: 0.3 }}
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={i < Math.floor(currentProduct.rating) ? 0 : 1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                        </motion.svg>
                                                    ))}
                                                </div>
                                                <span className="ml-2 text-xs text-gray-500">{currentProduct.reviewCount} reviews</span>
                                            </div>

                                            {/* Price */}
                                            <motion.div
                                                className="mb-6"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4, duration: 0.4 }}
                                            >
                                                {currentProduct.onSale ? (
                                                    <div className="flex items-center">
                                                        <span className="text-xl font-bold mr-2">{currentProduct.salePrice}</span>
                                                        <span className="text-gray-500 line-through">{currentProduct.price}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xl">{currentProduct.price}</span>
                                                )}
                                            </motion.div>

                                            <motion.p
                                                className="text-gray-700 mb-6"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5, duration: 0.4 }}
                                            >
                                                {currentProduct.description}
                                            </motion.p>

                                            {/* Size Selector */}
                                            <motion.div
                                                className="mb-6"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6, duration: 0.4 }}
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <div className="font-ming text-xs uppercase tracking-tight">SELECT SIZE</div>
                                                    <a href="#" className="text-xs text-gray-500 underline">Size Guide</a>
                                                </div>
                                                <div className="flex space-x-2">
                                                    {['XS', 'S', 'M', 'L', 'XL'].map((size, index) => (
                                                        <motion.button
                                                            key={size}
                                                            className={`w-10 h-10 flex items-center justify-center border ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-700'
                                                                }`}
                                                            onClick={() => setSelectedSize(size)}
                                                            whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                                                            whileTap={{ y: 0, boxShadow: "none" }}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.6 + (index * 0.05), duration: 0.3 }}
                                                        >
                                                            {size}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </motion.div>

                                            {/* Type Selector */}
                                            <motion.div
                                                className="mb-6"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.7, duration: 0.4 }}
                                            >
                                                <div className="font-ming text-xs uppercase tracking-tight mb-2">SELECT TYPE</div>
                                                <motion.div
                                                    className="border border-gray-300 inline-block px-4 py-2 text-sm"
                                                    whileHover={{ backgroundColor: "#f8f8f8" }}
                                                >
                                                    {currentProduct.color}
                                                </motion.div>
                                            </motion.div>

                                            {/* Availability & Shipping */}
                                            <motion.div
                                                className="mb-6 space-y-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.8, duration: 0.4 }}
                                            >
                                                <div className="flex items-center text-xs">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 text-green-500">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>In stock</span>
                                                </div>
                                                <div className="flex items-center text-xs">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                                    </svg>
                                                    <span>Free and instant access</span>
                                                </div>
                                            </motion.div>

                                            {/* Add to Cart Button */}
                                            <motion.button
                                                onClick={addToCart}
                                                className="w-full bg-black text-white py-3 uppercase font-ming hover:bg-gray-800 transition duration-200 text-sm tracking-wider"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.9, duration: 0.4 }}
                                            >
                                                Add to Interests
                                            </motion.button>

                                            {/* Wishlist Button */}
                                            <motion.button
                                                className="w-full border border-gray-300 py-3 uppercase font-ming mt-3 hover:bg-gray-50 transition duration-200 text-sm tracking-wider"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 1, duration: 0.4 }}
                                            >
                                                Save for Later
                                            </motion.button>
                                        </motion.div>
                                    </div>

                                    {/* Product Details Tabs */}
                                    <motion.div
                                        className="mt-16"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8, duration: 0.5 }}
                                    >
                                        <div className="border-b border-gray-200">
                                            <div className="inline-block border-b-2 border-black py-2 px-4 font-ming uppercase text-xs tracking-wider">
                                                Product Details
                                            </div>
                                        </div>

                                        <motion.div
                                            className="py-6"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1, duration: 0.4 }}
                                        >
                                            <ul className="space-y-3 text-gray-700">
                                                {currentProduct.details.map((detail, index) => (
                                                    <motion.li
                                                        key={index}
                                                        className="font-ming text-sm"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 1 + (index * 0.1), duration: 0.3 }}
                                                    >
                                                        {detail}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </motion.div>

                                    {/* Care & Shipping Info */}
                                    <motion.div
                                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.1, duration: 0.5 }}
                                    >
                                        <div>
                                            <h3 className="font-ming uppercase text-xs mb-3 font-bold tracking-wider">Shipping</h3>
                                            <p className="text-gray-700 text-xs">Free and instant access. No waiting required!</p>
                                        </div>
                                        <div>
                                            <h3 className="font-ming uppercase text-xs mb-3 font-bold tracking-wider">Returns</h3>
                                            <p className="text-gray-700 text-xs">Not applicable. All information is yours to keep.</p>
                                        </div>
                                        <div>
                                            <h3 className="font-ming uppercase text-xs mb-3 font-bold tracking-wider">Help</h3>
                                            <p className="text-gray-700 text-xs">Questions? Contact Kevin at example@email.com</p>
                                        </div>
                                    </motion.div>

                                    {/* You May Also Like */}
                                    <motion.div
                                        className="mt-16 pt-8 border-t border-gray-200"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.2, duration: 0.5 }}
                                    >
                                        <h2 className="text-lg font-ming uppercase mb-8 tracking-wider">You May Also Like</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {currentProduct.related.map((relatedKey, index) => (
                                                <motion.div
                                                    key={relatedKey}
                                                    className="group"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 1.3 + (index * 0.1), duration: 0.3 }}
                                                >
                                                    <TiltedCard
                                                        imageSrc={products[relatedKey].images[0]}
                                                        altText={products[relatedKey].title}
                                                        captionText={products[relatedKey].title}
                                                        containerHeight="280px"
                                                        containerWidth="100%"
                                                        imageWidth="100%"
                                                        imageHeight="240px"
                                                        scaleOnHover={1.08}
                                                        rotateAmplitude={10}
                                                        showTooltip={false}
                                                        onClick={() => handleProductChange(relatedKey)}
                                                        displayOverlayContent={true}
                                                        overlayContent={
                                                            <div className="w-full h-full flex flex-col justify-end p-4">
                                                                <div className="bg-black bg-opacity-70 p-3 rounded-lg text-white">
                                                                    <h3 className="font-ming text-sm">{products[relatedKey].title}</h3>
                                                                    <p className="text-xs text-[#CCFF00]">{products[relatedKey].salePrice}</p>
                                                                </div>
                                                            </div>
                                                        }
                                                    />
                                                    <div className="mt-2">
                                                        <h3 className="font-ming text-sm">{products[relatedKey].title}</h3>
                                                        <div className="flex justify-between items-center">
                                                            <p className="text-xs text-gray-500">{products[relatedKey].salePrice}</p>
                                                            <div className="flex">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < Math.floor(products[relatedKey].rating) ? "currentColor" : "none"} stroke="currentColor" className="w-3 h-3 text-yellow-400">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={i < Math.floor(products[relatedKey].rating) ? 0 : 1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                                    </svg>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Custom About Me Newsletter */}
                                    <motion.div
                                        className="mt-16 pt-8 border-t border-gray-200"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.3, duration: 0.5 }}
                                    >
                                        <div className="bg-[#CCFF00] p-6 md:p-8">
                                            <div className="text-center">
                                                <h2 className="font-ming text-lg uppercase mb-3 tracking-wider">Download My Resume</h2>
                                                <p className="text-sm mb-6 max-w-md mx-auto">Get my complete professional information package including portfolio, case studies, and contact details.</p>

                                                <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-3">
                                                    <motion.button
                                                        className="bg-black text-white px-6 py-3 uppercase font-ming text-xs tracking-wider"
                                                        whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Download Free Package
                                                    </motion.button>
                                                </div>

                                                <p className="text-xs mt-4 text-gray-700">By downloading, you'll automatically be subscribed to my newsletter</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Cookies Banner - Bottom */}
            <AnimatePresence>
                {!cookieAccepted && (
                    <motion.div
                        className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between z-40"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", damping: 20 }}
                    >
                        <div className="text-sm mb-3 sm:mb-0">
                            I USE CREATIVITY ON THIS WEBSITE
                        </div>
                        <div className="flex space-x-3">
                            <motion.button
                                className="text-xs uppercase px-4 py-2 border border-white hover:bg-white hover:text-gray-800 transition duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Learn More
                            </motion.button>
                            <motion.button
                                onClick={handleCookieAccept}
                                className="text-xs uppercase px-4 py-2 bg-white text-gray-800 hover:bg-opacity-90 transition duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Accept
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default About;