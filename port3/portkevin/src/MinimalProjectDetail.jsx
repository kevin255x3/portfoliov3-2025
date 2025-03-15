// MinimalProjectDetail.jsx - With robust navigation
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate, useParams } from 'react-router-dom';
import './MinimalDetailStyles.css';

const MinimalProjectDetail = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef({});
    const sectionsRef = useRef(null);
    const isScrollingRef = useRef(false);

    // Sample project data - replace with actual data
    const projects = [
        {
            id: "01",
            title: "FONTS.LOCAL",
            projectUrl: "https://fonts-local.com",
            description: "A digital art gallery that showcases the diverse range of styles and techniques used in Graffiti and Street Art.",
            sections: [
                {
                    id: "overview",
                    title: "OVERVIEW",
                    content: "A digital art gallery that showcases the diverse range of styles and techniques used in Graffiti and Street Art. This project began as an exploration of typographic expression in urban environments and evolved into a comprehensive digital platform for appreciating street art in its various forms. The site features curated collections from artists around the world, interactive exhibits, and educational resources about the history and cultural significance of street art movements."
                },
                {
                    id: "wireframes",
                    title: "WIREFRAMES",
                    content: "The wireframing process focused on creating an intuitive navigation system that would allow users to explore artwork in a nonlinear fashion, similar to how one might experience street art in an urban environment.",
                    images: [
                        {
                            src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000",
                            alt: "Navigation wireframe",
                            caption: "Navigation system wireframe showing nonlinear exploration"
                        },
                        {
                            src: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2000",
                            alt: "Homepage wireframe",
                            caption: "Homepage wireframe design with main navigation elements"
                        }
                    ]
                },
                {
                    id: "technical",
                    title: "TECHNICAL DETAILS",
                    content: "Built with React and Tailwind CSS, FONTS.LOCAL leverages modern web technologies to deliver a responsive and performant experience. Key technical features include: custom image gallery with infinite scroll, interactive 3D models of street environments, user authentication for saving favorite artworks, and real-time location-based recommendations. The backend is powered by Node.js with Express, connected to a MongoDB database that stores artwork metadata, artist information, and user preferences."
                },
                {
                    id: "process",
                    title: "TIMELINE PROCESS",
                    content: "The development process followed an agile methodology with two-week sprints. Phase 1: Research & Discovery - Conducted interviews with street artists and art enthusiasts, analyzed existing digital art platforms, developed user personas and journey maps. Phase 2: Design & Prototyping - Created high-fidelity mockups, built interactive prototypes, conducted usability testing. Phase 3: Development - Implemented frontend components, developed backend API, created database schemas. Phase 4: Testing & Refinement - Performed cross-browser testing, optimized for mobile devices, conducted performance audits."
                },
                {
                    id: "gallery",
                    title: "FINAL GALLERY",
                    content: "The completed project features a minimalist design that puts the focus on the artwork while providing context and educational resources about street art culture and history.",
                    gallery: [
                        {
                            type: "image",
                            src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000",
                            alt: "Gallery image 1",
                            caption: "Homepage view showing featured artworks"
                        },
                        {
                            type: "video",
                            src: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
                            poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000",
                            alt: "Gallery video 1",
                            caption: "Interactive 3D environment demo"
                        }
                    ]
                }
            ]
        }
    ];

    // Find the current project
    const currentProject = projects.find(project => project.id === projectId) || projects[0];

    // Set body style for scrolling
    useEffect(() => {
        document.body.style.overflow = 'auto';
        return () => {
            document.body.style.overflow = 'hidden';
        };
    }, []);

    // Create refs for each section by ID for more reliable access
    useEffect(() => {
        const newRefs = {};
        currentProject.sections.forEach((section, index) => {
            newRefs[section.id] = React.createRef();
        });
        sectionRefs.current = newRefs;
    }, [currentProject.sections]);

    // Handle manual scroll events without interfering with click navigation
    useEffect(() => {
        const handleScroll = () => {
            // Skip if currently navigating via click
            if (isScrollingRef.current) return;

            const scrollPosition = window.pageYOffset + 120;

            // Find which section is currently visible
            for (let i = 0; i < currentProject.sections.length; i++) {
                const sectionId = currentProject.sections[i].id;
                const el = sectionRefs.current[sectionId]?.current;

                if (!el) continue;

                const rect = el.getBoundingClientRect();
                const sectionTop = rect.top + window.pageYOffset - 150;
                const sectionBottom = sectionTop + rect.height;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    setActiveSection(i);
                    break;
                }
            }
        };

        // Throttle scroll events for better performance
        let timeout;
        const throttledScroll = () => {
            if (timeout) return;

            timeout = setTimeout(() => {
                handleScroll();
                timeout = null;
            }, 100);
        };

        window.addEventListener('scroll', throttledScroll);
        return () => {
            window.removeEventListener('scroll', throttledScroll);
            clearTimeout(timeout);
        };
    }, [currentProject.sections]);

    // Scroll to section with debounce to prevent rapid clicks
    const scrollToSection = (index) => {
        // Don't do anything if navigation is in progress
        if (isScrollingRef.current) return;

        // Get the section ID
        const sectionId = currentProject.sections[index].id;
        const sectionRef = sectionRefs.current[sectionId];

        if (!sectionRef || !sectionRef.current) return;

        // Mark that we're navigating
        isScrollingRef.current = true;
        setActiveSection(index);

        // Get element position with offset
        const yOffset = -100;
        const element = sectionRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        // Perform smooth scrolling
        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });

        // Clear the navigation flag after animation completes
        setTimeout(() => {
            isScrollingRef.current = false;
        }, 1000); // Adjust this to match your scroll duration
    };

    // Apply spotlight effect for section links
    useEffect(() => {
        const applySpotlightEffect = () => {
            if (!sectionsRef.current) return;

            const sectionLinks = sectionsRef.current.querySelectorAll('.section-title');
            const sectionLinksArray = [...sectionLinks];

            sectionLinksArray.forEach((currentLink, index) => {
                const otherLinks = sectionLinksArray.filter(link => link !== currentLink);

                currentLink.addEventListener('mouseenter', () => {
                    gsap.to(otherLinks, {
                        opacity: 0.2,
                        duration: 0.3,
                        ease: 'power1.out'
                    });
                });

                currentLink.addEventListener('mouseleave', () => {
                    gsap.to(otherLinks, {
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power1.out'
                    });
                });
            });
        };

        const timer = setTimeout(() => {
            applySpotlightEffect();
        }, 100);

        return () => {
            clearTimeout(timer);

            if (sectionsRef.current) {
                const sectionLinks = sectionsRef.current.querySelectorAll('.section-title');
                sectionLinks.forEach(link => {
                    link.removeEventListener('mouseenter', () => { });
                    link.removeEventListener('mouseleave', () => { });
                });
            }
        };
    }, []);

    // Render media - keep it simple
    const renderMedia = (section) => {
        // Text-only sections
        if (section.id === "overview" || section.id === "technical" || section.id === "process") {
            return null;
        }

        // Gallery section
        if (section.id === "gallery" && section.gallery) {
            return (
                <div className="media-gallery">
                    {section.gallery.map((item, index) => (
                        <div key={`gallery-${index}`} className="gallery-item">
                            {item.type === 'video' ? (
                                <div className="media-container">
                                    <video
                                        controls
                                        poster={item.poster}
                                        className="section-media"
                                    >
                                        <source src={item.src} type="video/mp4" />
                                        Your browser does not support video playback.
                                    </video>
                                    {item.caption && (
                                        <div className="caption-container">
                                            <p className="media-caption">{item.caption}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="media-container">
                                    <img
                                        src={item.src}
                                        alt={item.alt || `Gallery item ${index + 1}`}
                                        className="section-media"
                                    />
                                    {item.caption && (
                                        <div className="caption-container">
                                            <p className="media-caption">{item.caption}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        // Wireframes section
        if (section.id === "wireframes" && section.images) {
            return (
                <div className="media-gallery">
                    {section.images.map((image, index) => (
                        <div key={`image-${index}`} className="gallery-item">
                            <div className="media-container">
                                <img
                                    src={image.src}
                                    alt={image.alt || `Image ${index + 1}`}
                                    className="section-media"
                                />
                                {image.caption && (
                                    <div className="caption-container">
                                        <p className="media-caption">{image.caption}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        return null;
    };

    return (
        <div className="project-container">
            {/* Left column - Navigation */}
            <div className="sections-column" ref={sectionsRef}>
                <h1 className="project-title">{currentProject.title}</h1>

                <div className="section-items">
                    {currentProject.sections.map((section, index) => (
                        <div
                            key={index}
                            className={`section-title ${index === activeSection ? "active" : ""}`}
                            onClick={() => scrollToSection(index)}
                        >
                            {section.title}
                        </div>
                    ))}

                    <div
                        className="section-title view-project-link"
                        onClick={() => window.open(currentProject.projectUrl, '_blank')}
                    >
                        VIEW THE PROJECT
                    </div>

                    <div
                        className="section-title back-link"
                        onClick={() => navigate('/')}
                    >
                        BACK TO PROJECTS
                    </div>
                </div>
            </div>

            {/* Right column - Content */}
            <div className="project-content">
                {currentProject.sections.map((section, index) => (
                    <section
                        key={index}
                        className="content-section"
                        ref={sectionRefs.current[section.id]}
                        id={section.id}
                    >
                        {renderMedia(section) ? (
                            <div className="media-wrapper">
                                {renderMedia(section)}
                            </div>
                        ) : null}

                        <div className="content-footer">
                            <div className="section-caption">
                                {section.content}
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default MinimalProjectDetail;