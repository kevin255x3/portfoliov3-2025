import React, { useState, useEffect, useRef } from 'react';
import InfiniteScroll from './InfiniteScroll';
import Navbar from './Navbar';
import Footer from './Footer';
import './PortfolioStyles.css';
import { Helmet } from 'react-helmet';

// Simplified gallery component with minimal styling and mobile responsiveness
const MinimalGallery = ({ items, isMobile }) => {
    return (
        <div className={`minimal-gallery ${isMobile ? 'minimal-gallery-mobile' : ''}`}>
            <style jsx global>{`
        .minimal-gallery {
          height: 100vh;
          width: 100%;
        }
        
        .minimal-gallery > div {
          border: none !important;
          background: transparent !important;
          height: 100vh !important;
        }
        
        .minimal-gallery > div > div > div > div {
          border: none !important;
          border-radius: 0 !important;
          padding: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          margin: 120px 0 !important;
        }
        
        .minimal-gallery > div > div > div {
          gap: 160px !important;
          padding-top: 80px !important;
          padding-bottom: 80px !important;
        }
        
        .minimal-gallery img {
          object-fit: contain !important;
          max-width: 90% !important;
          max-height: 280px !important;
          width: auto !important;
          height: auto !important;
        }

        /* Mobile-specific gallery styles */
        .minimal-gallery-mobile {
          height: 250px;
        }
        
        .minimal-gallery-mobile > div {
          height: 250px !important;
        }
        
        .minimal-gallery-mobile > div > div > div > div {
          margin: 40px 0 !important;
        }
        
        .minimal-gallery-mobile > div > div > div {
          gap: 80px !important;
          padding-top: 20px !important;
          padding-bottom: 20px !important;
        }
        
        .minimal-gallery-mobile img {
          max-height: 160px !important;
        }
      `}</style>
            <InfiniteScroll
                items={items.map(item => ({
                    content: (
                        <div className="w-full flex items-center justify-center">
                            {item.content}
                        </div>
                    )
                }))}
                width={isMobile ? "95%" : "90%"}
                autoplay={true}
                autoplaySpeed={0.25}
                autoplayDirection="down"
                pauseOnHover={true}
                isTilted={false}
            />
        </div>
    );
};

const About = () => {
    const [activeSection, setActiveSection] = useState("tldr");
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [mobileView, setMobileView] = useState(false);

    // Refs for each section
    const sectionRefs = {
        tldr: useRef(null),
        origin: useRef(null),
        philosophy: useRef(null),
        skills: useRef(null),
        beyond: useRef(null)
    };

    // Check window size to determine mobile view
    useEffect(() => {
        const checkMobileView = () => {
            setMobileView(window.innerWidth < 768);
        };

        checkMobileView();
        window.addEventListener('resize', checkMobileView);
        return () => window.removeEventListener('resize', checkMobileView);
    }, []);

    // Handle section navigation
    const handleNavClick = (section) => {
        setActiveSection(section);

        const sectionEl = sectionRefs[section].current;
        if (sectionEl) {
            sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Gallery images
    const galleryItems = [
        { content: <img src="/img/his1.jpg" alt="Gallery image 1" /> },
        { content: <img src="/img/who1.jpeg" alt="Gallery image 2" /> },
        { content: <img src="/img/his3.JPG" alt="Gallery image 3" /> },
        { content: <img src="/img/who2.jpg" alt="Gallery image 4" /> },
        { content: <img src="/img/principles1.png" alt="Gallery image 5" /> },
        { content: <img src="/img/his2.jpg" alt="Gallery image 6" /> },
        { content: <img src="/img/beyond1.JPG" alt="Gallery image 7" /> },
        { content: <img src="/img/who3.png" alt="Gallery image 8" /> },
    ];

    // About content sections with updated content
    const aboutSections = [
        {
            id: "tldr",
            title: "summary",
            details: [
                {
                    type: "highlight",
                    content: "I design and I code, specializing in web and UI/UX design."
                },
                {
                    type: "paragraph",
                    content: "I'm drawn to both digital experiences and physical products, and I'm constantly refining what design means to me. Technology evolves rapidly, and so do I."
                },
                {
                    type: "highlight",
                    content: "I adapt, stay optimistic, and learn at every level of the process."
                }
            ]
        },
        {
            id: "origin",
            title: "backstory",
            details: [
                {
                    type: "paragraph",
                    content: "My design journey started with comic sketches, experimenting with my mom's camera, and making skits with friends. At heart, I'm still that kid—videogames, films, cartoons, and sports all find their way into my work."
                },
                {
                    type: "paragraph",
                    content: "Growing up Filipino-Canadian gave me a dual perspective that shapes how I approach human-centered design. I understand both community and convenience from different cultural angles."
                },
                {
                    type: "highlight",
                    content: "This sense of play eventually led me to BCIT, where I discovered new tools to build with and found ways to channel that creative energy into digital spaces."
                }
            ]
        },
        {
            id: "philosophy",
            title: "sensitivities",
            details: [
                {
                    type: "subheading",
                    content: "When I design, I focus on five essential qualities:"
                },
                {
                    type: "principle",
                    title: "Functionality",
                    content: "The product should deliver on its promise without creating unnecessary obstacles."
                },
                {
                    type: "principle",
                    title: "Intuition",
                    content: "A good design shouldn't need instructions—the experience should feel natural."
                },
                {
                    type: "principle",
                    title: "Spice",
                    content: "Every product deserves a unique texture or flavor—a pleasant surprise or delightful interaction that makes it memorable."
                },
                {
                    type: "principle",
                    title: "Minimalism",
                    content: "I value this as a tool for directing attention to what matters most."
                },
                {
                    type: "principle",
                    title: "Composition",
                    content: "I rely on strong principles—grid systems and information hierarchy are fundamentals that simply work."
                }
            ]
        },
        {
            id: "skills",
            title: "skillset",
            skillCategories: [
                {
                    title: "Design",
                    skills: ["Rapid Prototyping", "UI Design", "UX Design", "UX Research", "Information Hierarchy", "Grid Layouts"]
                },
                {
                    title: "Development",
                    skills: ["HTML", "CSS", "Javascript", "React", "React Native", "TailwindCSS", "GSAP", "Framer Motion", "Three.js", "Wordpress"]
                },
                {
                    title: "Interactive",
                    skills: ["TouchDesigner"]
                },
                {
                    title: "Media",
                    skills: ["Adobe Premiere Pro", "Adobe After Effects", "Adobe Dimension", "Adobe Photoshop", "Adobe Illustrator", "Adobe Indesign"]
                }
            ]
        },
        {
            id: "beyond",
            title: "hobbies",
            interestCards: [
                {
                    title: "Film & Sports",
                    content: "Basketball debates are my specialty—I'm always ready to discuss who the real GOAT is. I value these moments with friends just as much as the games themselves."
                },
                {
                    title: "Culinary",
                    content: "Four years in food and hospitality taught me to experiment with different cuisines. Consider this an open invitation for dinner at my place."
                },
                {
                    title: "Fashion",
                    content: "While I've moved away from consumer culture (mostly wearing black these days), I'm still passionate about design in clothing. If you're building a collection, I'd love to see your style."
                },
                {
                    title: "Reading",
                    content: "My bookshelves are filled with neuroscience, but I enjoy most genres. Currently reading? I'd be curious to hear what's on your nightstand too."
                }
            ]
        }
    ];

    // Custom render for backstory section to handle special styling
    const renderBackstoryContent = (detail, i) => {
        if (detail.type === "intro") {
            return <p key={i} className="text-sm">{detail.content}</p>;
        } else if (detail.type === "highlight" && i === 2) {
            // Last item with uppercase PLAY
            const modifiedText = detail.content.replace("play", "PLAY");
            return <p key={i} className="text-sm font-medium">{modifiedText}</p>;
        } else if (detail.type === "highlight") {
            return <p key={i} className="text-sm font-medium">{detail.content}</p>;
        } else {
            return <p key={i} className="text-sm text-gray-600">{detail.content}</p>;
        }
    };

    return (
        <>
            <Helmet>
                {/* Basic Metadata */}
                <title>About | Kevin Lazo - Web Developer & Designer</title>
                <meta name="description" content="Learn about Kevin Lazo's background, design philosophy, technical skills, and creative journey as a web developer and designer." />

                {/* Search Engine Optimization */}
                <link rel="canonical" href="https://madebykevinlazo.com/about" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="About | Kevin Lazo - Web Developer & Designer" />
                <meta property="og:description" content="Learn about Kevin Lazo's background, design philosophy, technical skills, and creative journey as a web developer and designer." />
                <meta property="og:image" content="https://madebykevinlazo.com/img/throw.png" />
                <meta property="og:url" content="https://madebykevinlazo.com/about" />

                {/* Twitter */}
                <meta name="twitter:title" content="About | Kevin Lazo - Web Developer & Designer" />
                <meta name="twitter:description" content="Learn about Kevin Lazo's background, design philosophy, technical skills, and creative journey as a web developer and designer." />
                <meta name="twitter:image" content="https://madebykevinlazo.com/img/throw.png" />
            </Helmet>
            <Navbar />

            <div className="min-h-screen bg-white font-montreal pt-20 md:pt-24">
                {/* Mobile Tab Navigation */}
                {mobileView && (
                    <div className="sticky top-16 z-20 bg-white border-b border-gray-100 px-4 mb-6">
                        <div className="flex overflow-x-auto py-2 no-scrollbar">
                            {aboutSections.map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => handleNavClick(section.id)}
                                    className={`flex-shrink-0 text-sm mr-6 py-1 ${activeSection === section.id
                                        ? 'text-black border-b-2 border-black'
                                        : 'text-gray-400'
                                        }`}
                                >
                                    {section.title}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Mobile Gallery Toggle */}
                {mobileView && (
                    <div className="px-4 mb-8">
                        <button
                            onClick={() => setGalleryOpen(!galleryOpen)}
                            className="text-sm flex items-center mb-2 text-gray-500 hover:text-black transition-colors"
                        >
                            {galleryOpen ? 'Hide gallery ↑' : 'View gallery ↓'}
                        </button>

                        {galleryOpen && (
                            <div className="h-64 mb-6">
                                <MinimalGallery items={galleryItems} isMobile={true} />
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-col md:flex-row">
                    {/* Main Content Area - Left Side on desktop, full width on mobile */}
                    <div className="w-full md:w-3/5 px-4 md:px-12 lg:px-16 pb-20 md:pb-24">
                        {/* Header with responsive padding */}
                        <div className="mb-10 md:mb-16">
                            <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">Web Developer & Designer</p>
                            <h1 className="text-2xl uppercase tracking-tight font-normal mb-8 md:mb-12">Kevin Lazo</h1>

                            {/* Desktop Navigation - Text-centric style */}
                            <div className="hidden md:flex space-x-8">
                                {aboutSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => handleNavClick(section.id)}
                                        className={`text-sm uppercase tracking-wide hover:text-black transition-colors ${activeSection === section.id ? 'text-black' : 'text-gray-400'
                                            }`}
                                    >
                                        {section.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content with text-centric layout */}
                        <div className="space-y-12 md:space-y-16">
                            {aboutSections.map((section, index) => (
                                <div
                                    key={section.id}
                                    ref={sectionRefs[section.id]}
                                    className="scroll-mt-32" // Increased scroll margin to account for sticky tabs
                                >
                                    {/* Section header in all caps with more prominence */}
                                    <h3 className="text-xl uppercase tracking-tight font-normal mb-4 md:mb-6">
                                        {section.title}
                                    </h3>

                                    {/* Content with denser text blocks where appropriate */}
                                    <div>
                                        {section.id === "origin" ? (
                                            // Backstory section with regular case and modified capitalization
                                            <div className="space-y-2">
                                                {section.details.map((detail, i) => renderBackstoryContent(detail, i))}
                                            </div>
                                        ) : section.id === "skills" ? (
                                            // Skills section as dense text blocks - single column on mobile
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 md:gap-y-8">
                                                {section.skillCategories.map((category) => (
                                                    <div key={category.title}>
                                                        <h4 className="text-sm uppercase tracking-wide mb-2">{category.title}</h4>
                                                        <div className="space-y-0.5">
                                                            {category.skills.map((skill) => (
                                                                <p key={skill} className="text-sm text-gray-600">{skill}</p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : section.id === "beyond" ? (
                                            // Beyond section with denser text approach
                                            <div className="space-y-6">
                                                {section.interestCards.map((card) => (
                                                    <div key={card.title}>
                                                        <h4 className="text-sm uppercase tracking-wide mb-1">{card.title}</h4>
                                                        <p className="text-sm text-gray-600">{card.content}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : section.id === "philosophy" ? (
                                            // Philosophy with denser text layout
                                            <div className="space-y-4">
                                                {section.details.map((detail, i) => {
                                                    if (detail.type === "principle") {
                                                        return (
                                                            <div key={i} className="space-y-0.5">
                                                                <h4 className="text-sm uppercase tracking-wide">{detail.title}</h4>
                                                                <p className="text-sm text-gray-600">{detail.content}</p>
                                                            </div>
                                                        );
                                                    } else if (detail.type === "subheading") {
                                                        return (
                                                            <p key={i} className="text-sm uppercase tracking-wide mt-3 md:mt-5 mb-2">
                                                                {detail.content}
                                                            </p>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </div>
                                        ) : (
                                            // Regular text with denser spacing
                                            <div className="space-y-2">
                                                {section.details.map((detail, i) => {
                                                    if (detail.type === "intro") {
                                                        return <p key={i} className="text-sm uppercase tracking-wide">{detail.content}</p>;
                                                    } else if (detail.type === "highlight") {
                                                        return <p key={i} className="text-sm uppercase font-medium">{detail.content}</p>;
                                                    } else {
                                                        return <p key={i} className="text-sm text-gray-600">{detail.content}</p>;
                                                    }
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gallery - Right Side on desktop only */}
                    {!mobileView && (
                        <div className="w-full md:w-2/5 h-screen sticky top-0">
                            <MinimalGallery items={galleryItems} isMobile={false} />
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default About;