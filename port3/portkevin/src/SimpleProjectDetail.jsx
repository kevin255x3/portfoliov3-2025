// SimpleProjectDetail.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate, useParams } from 'react-router-dom';
import './SimpleProjectDetailStyles.css';

const SimpleProjectDetail = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(0);
    const sectionsRef = useRef(null);

    // Project details mock data - replace with your actual projects data
    const project = {
        id: "01",
        title: "FONTS.LOCAL",
        description: "A digital art gallery that showcases the diverse range of styles and techniques used in Graffiti and Street Art.",
        sections: [
            {
                title: "OVERVIEW",
                content: "A digital art gallery that showcases the diverse range of styles and techniques used in Graffiti and Street Art. This project began as an exploration of typographic expression in urban environments and evolved into a comprehensive digital platform for appreciating street art in its various forms. The site features curated collections from artists around the world, interactive exhibits, and educational resources about the history and cultural significance of street art movements.",
                media: {
                    type: "image",
                    src: "https://images.unsplash.com/photo-1572058685337-e2bae6e36841?q=80&w=2000",
                    alt: "Street art gallery"
                }
            },
            {
                title: "WIREFRAMES",
                content: "The wireframing process focused on creating an intuitive navigation system that would allow users to explore artwork in a nonlinear fashion, similar to how one might experience street art in an urban environment.",
                media: {
                    type: "image",
                    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000",
                    alt: "Project wireframes"
                }
            },
            {
                title: "TECHNICAL DETAILS",
                content: "Built with React and Tailwind CSS, FONTS.LOCAL leverages modern web technologies to deliver a responsive and performant experience. Key technical features include: custom image gallery with infinite scroll, interactive 3D models of street environments, user authentication for saving favorite artworks, and real-time location-based recommendations. The backend is powered by Node.js with Express, connected to a MongoDB database that stores artwork metadata, artist information, and user preferences.",
                media: {
                    type: "image",
                    src: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2000",
                    alt: "Technical implementation"
                }
            },
            {
                title: "DEVELOPMENT PROCESS",
                content: "The development process followed an agile methodology with two-week sprints. Phase 1: Research & Discovery - Conducted interviews with street artists and art enthusiasts, analyzed existing digital art platforms, developed user personas and journey maps. Phase 2: Design & Prototyping - Created high-fidelity mockups, built interactive prototypes, conducted usability testing. Phase 3: Development - Implemented frontend components, developed backend API, created database schemas. Phase 4: Testing & Refinement - Performed cross-browser testing, optimized for mobile devices, conducted performance audits.",
                media: {
                    type: "image",
                    src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2000",
                    alt: "Development workflow"
                }
            },
            {
                title: "FINAL GALLERY",
                content: "The completed project features a minimalist design that puts the focus on the artwork while providing context and educational resources about street art culture and history.",
                media: {
                    type: "video",
                    src: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
                    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000",
                    alt: "Project gallery"
                }
            }
        ]
    };

    // Apply spotlight effect for sections
    useEffect(() => {
        const applySectionsSpotlight = () => {
            if (!sectionsRef.current) return;

            const sectionLinks = sectionsRef.current.querySelectorAll('.section-item');
            const sectionLinksArray = [...sectionLinks];

            sectionLinksArray.forEach((currentLink, index) => {
                const otherLinks = sectionLinksArray.filter(link => link !== currentLink);

                currentLink.addEventListener('mouseenter', () => {
                    setActiveSection(index);
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

        // Apply spotlight effect
        const timer = setTimeout(() => {
            applySectionsSpotlight();
        }, 100);

        // Cleanup
        return () => {
            clearTimeout(timer);

            if (sectionsRef.current) {
                const sectionLinks = sectionsRef.current.querySelectorAll('.section-item');
                sectionLinks.forEach(link => {
                    link.removeEventListener('mouseenter', () => { });
                    link.removeEventListener('mouseleave', () => { });
                });
            }
        };
    }, []);

    // Current active section data
    const currentSection = project.sections[activeSection];

    return (
        <div className="project-container">
            {/* Project Title Column */}
            <div className="project-title-column">
                <h1 className="project-title">{project.title}</h1>
                <p className="project-description">{project.description}</p>
                <div className="back-link">
                    <button onClick={() => navigate('/')} className="back-button">
                        Back to Projects
                    </button>
                </div>
            </div>

            {/* Sections Column */}
            <div className="sections-column" ref={sectionsRef}>
                <div className="section-items">
                    {project.sections.map((section, index) => (
                        <div
                            key={index}
                            className={`section-item spotlight-transition ${index === activeSection ? "active" : ""}`}
                            onMouseEnter={() => setActiveSection(index)}
                        >
                            {section.title}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Column */}
            <div className="project-content-column">
                {/* Media (Image or Video) */}
                <div className="media-container">
                    {currentSection.media.type === 'video' ? (
                        <video
                            src={currentSection.media.src}
                            poster={currentSection.media.poster}
                            className="section-media"
                            controls
                            autoPlay={false}
                            playsInline
                        />
                    ) : (
                        <img
                            src={currentSection.media.src}
                            alt={currentSection.media.alt}
                            className="section-media"
                        />
                    )}
                </div>

                {/* Content and Section Number */}
                <div className="content-footer">
                    <div className="section-content">
                        {currentSection.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimpleProjectDetail;